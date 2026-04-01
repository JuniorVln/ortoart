import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..', '..');

const siteOrigin = 'https://synthorix.framer.website';
const startUrl = `${siteOrigin}/`;
const firecrawlDir = path.join(projectRoot, '.firecrawl');
const firecrawlMapPath = path.join(firecrawlDir, 'synthorix-map.json');
const outputRoot = path.join(projectRoot, 'downloads', 'synthorix');
const pagesDir = path.join(outputRoot, 'pages');
const assetsDir = path.join(outputRoot, 'assets');
const firecrawlArchiveDir = path.join(outputRoot, 'firecrawl');
const manifestPath = path.join(outputRoot, 'manifest.json');
const readmePath = path.join(outputRoot, 'README.txt');

const pageResults = new Map();
const assetResults = new Map();
const assetTasks = new Map();
const failures = [];

const userAgent = 'Mozilla/5.0 (compatible; ApifyLocalMirror/1.0; +https://apify.com)';

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

async function main() {
  await fs.mkdir(outputRoot, { recursive: true });
  await fs.mkdir(pagesDir, { recursive: true });
  await fs.mkdir(assetsDir, { recursive: true });
  await fs.mkdir(firecrawlArchiveDir, { recursive: true });

  const pageUrls = await loadPageUrls();
  console.log(`Preparing local mirror for ${pageUrls.length} page(s).`);

  const pageStates = await Promise.all(pageUrls.map((url) => fetchPage(url)));
  const directAssets = new Set();

  for (const pageState of pageStates) {
    for (const assetRef of pageState.assetRefs) {
      directAssets.add(assetRef.resolved);
    }
  }

  await Promise.all([...directAssets].map((assetUrl) => ensureAssetDownloaded(assetUrl)));

  for (const pageState of pageStates) {
    await writePage(pageState);
  }

  await copyFirecrawlArtifacts();
  await writeManifest(pageStates);
  await writeReadme(pageStates);

  console.log(
    `Mirror complete: ${pageStates.length} pages, ${assetResults.size} assets, ${failures.length} failure(s).`,
  );
}

async function loadPageUrls() {
  const urls = new Set([startUrl, `${siteOrigin}/terms-and-condition`, `${siteOrigin}/404`]);

  try {
    const raw = await fs.readFile(firecrawlMapPath, 'utf8');
    const parsed = JSON.parse(raw);
    for (const item of parsed?.data?.links ?? []) {
      if (!item?.url) {
        continue;
      }
      const normalized = normalizePageUrl(item.url);
      if (normalized) {
        urls.add(normalized);
      }
    }
  } catch (error) {
    failures.push({
      stage: 'firecrawl-map',
      url: firecrawlMapPath,
      error: error.message,
    });
  }

  return [...urls];
}

async function fetchPage(url) {
  console.log(`Fetching page: ${url}`);
  const response = await fetch(url, {
    headers: {
      'user-agent': userAgent,
    },
  });

  if (!response.ok && response.status !== 404) {
    throw new Error(`Failed to fetch page ${url}: ${response.status} ${response.statusText}`);
  }

  const html = await response.text();
  const pageRefs = extractPageRefs(html, url);
  const assetRefs = extractAssetRefs(html, url);
  const localPath = getLocalPagePath(url);
  const state = {
    url,
    html,
    localPath,
    status: response.status,
    pageRefs,
    assetRefs,
  };

  pageResults.set(url, {
    url,
    localPath,
  });

  return state;
}

async function writePage(pageState) {
  let html = pageState.html;

  const pageRefs = [...pageState.pageRefs].sort((left, right) => {
    return right.original.length - left.original.length;
  });

  for (const pageRef of pageRefs) {
    const replacement = getLocalPageHref(pageRef, pageState.localPath, pageState.url);
    if (!replacement) {
      continue;
    }
    html = replaceAllLiteral(html, pageRef.original, replacement);
  }

  const assetRefs = [...pageState.assetRefs].sort((left, right) => {
    return right.original.length - left.original.length;
  });

  for (const assetRef of assetRefs) {
    const assetResult = assetResults.get(assetRef.resolved);
    if (!assetResult?.localPath) {
      continue;
    }
    const replacement = toWebPath(path.relative(path.dirname(pageState.localPath), assetResult.localPath));
    html = replaceAllLiteral(html, assetRef.original, replacement);
  }

  await fs.mkdir(path.dirname(pageState.localPath), { recursive: true });
  await fs.writeFile(pageState.localPath, html, 'utf8');
}

function ensureAssetDownloaded(assetUrl) {
  if (!assetTasks.has(assetUrl)) {
    assetTasks.set(assetUrl, downloadAsset(assetUrl));
  }
  return assetTasks.get(assetUrl);
}

async function downloadAsset(assetUrl) {
  if (assetResults.has(assetUrl)) {
    return assetResults.get(assetUrl);
  }

  console.log(`Downloading asset: ${assetUrl}`);

  try {
    const response = await fetch(assetUrl, {
      headers: {
        'user-agent': userAgent,
      },
    });

    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }

    const contentType = response.headers.get('content-type') ?? '';
    const localPath = getLocalAssetPath(assetUrl, contentType);
    await fs.mkdir(path.dirname(localPath), { recursive: true });

    let buffer = Buffer.from(await response.arrayBuffer());

    if (isCssAsset(localPath, contentType)) {
      let cssText = buffer.toString('utf8');
      const cssRefs = extractCssAssetRefs(cssText, assetUrl);
      await Promise.all(cssRefs.map((ref) => ensureAssetDownloaded(ref.resolved)));
      for (const cssRef of cssRefs) {
        const nestedAsset = assetResults.get(cssRef.resolved);
        if (!nestedAsset?.localPath) {
          continue;
        }
        const replacement = toWebPath(path.relative(path.dirname(localPath), nestedAsset.localPath));
        cssText = replaceAllLiteral(cssText, cssRef.original, replacement);
      }
      buffer = Buffer.from(cssText, 'utf8');
    }

    await fs.writeFile(localPath, buffer);

    const result = {
      url: assetUrl,
      localPath,
      contentType,
    };

    assetResults.set(assetUrl, result);
    return result;
  } catch (error) {
    failures.push({
      stage: 'asset-download',
      url: assetUrl,
      error: error.message,
    });
    assetResults.set(assetUrl, {
      url: assetUrl,
      localPath: null,
      error: error.message,
    });
    return assetResults.get(assetUrl);
  }
}

function extractPageRefs(html, baseUrl) {
  const refs = [];
  const seen = new Set();

  collectRegexMatches(html, /<a\b[^>]*\bhref=(["'])(.*?)\1/gi, (rawValue) => {
    const original = rawValue.trim();
    const decoded = decodeHtmlEntities(original);
    if (shouldIgnoreUrl(decoded)) {
      return;
    }

    const resolved = resolvePageHref(decoded, baseUrl);
    if (!resolved) {
      return;
    }

    const key = `${original}::${resolved.pageUrl}::${resolved.hash}`;
    if (seen.has(key)) {
      return;
    }
    seen.add(key);
    refs.push({ original, resolved: resolved.pageUrl, hash: resolved.hash });
  });

  return refs;
}

function extractAssetRefs(html, baseUrl) {
  const refs = [];
  const seen = new Set();

  const addRef = (rawValue) => {
    const original = rawValue.trim();
    const decoded = decodeHtmlEntities(original);
    const resolved = normalizeAssetUrl(decoded, baseUrl);
    if (!resolved) {
      return;
    }
    const key = `${original}::${resolved}`;
    if (seen.has(key)) {
      return;
    }
    seen.add(key);
    refs.push({ original, resolved });
  };

  collectRegexMatches(
    html,
    /<(?:img|script|source|video|audio|track|iframe|embed)\b[^>]*\b(?:src|poster)=(["'])(.*?)\1/gi,
    addRef,
  );
  collectRegexMatches(
    html,
    /<link\b[^>]*\bhref=(["'])(.*?)\1/gi,
    addRef,
  );
  collectRegexMatches(html, /\bsrcset=(["'])(.*?)\1/gi, (rawValue) => {
    for (const candidate of rawValue.split(',')) {
      const [urlCandidate] = candidate.trim().split(/\s+/);
      if (urlCandidate) {
        addRef(urlCandidate);
      }
    }
  });
  collectRegexMatches(html, /url\(([^)]+)\)/gi, (rawValue) => {
    const cleaned = rawValue.replace(/^['"]|['"]$/g, '').trim();
    addRef(cleaned);
  });

  return refs;
}

function extractCssAssetRefs(cssText, baseUrl) {
  const refs = [];
  const seen = new Set();

  collectRegexMatches(cssText, /url\(([^)]+)\)/gi, (rawValue) => {
    const original = rawValue.replace(/^['"]|['"]$/g, '').trim();
    const resolved = normalizeAssetUrl(decodeHtmlEntities(original), baseUrl);
    if (!resolved) {
      return;
    }
    const key = `${original}::${resolved}`;
    if (seen.has(key)) {
      return;
    }
    seen.add(key);
    refs.push({ original, resolved });
  });

  return refs;
}

function collectRegexMatches(text, regex, callback) {
  let match;
  while ((match = regex.exec(text)) !== null) {
    const value = match[2] ?? match[1];
    if (value) {
      callback(value);
    }
  }
}

function normalizePageUrl(input, baseUrl = startUrl) {
  const resolved = resolvePageHref(input, baseUrl);
  return resolved?.pageUrl ?? null;
}

function resolvePageHref(input, baseUrl = startUrl) {
  if (shouldIgnoreUrl(input)) {
    return null;
  }

  try {
    const resolved = new URL(input, baseUrl);
    if (resolved.origin !== siteOrigin) {
      return null;
    }
    if (looksLikeAssetPath(resolved.pathname)) {
      return null;
    }
    const hash = resolved.hash ? resolved.hash.slice(1) : '';
    resolved.hash = '';
    if (resolved.pathname !== '/' && resolved.pathname.endsWith('/')) {
      resolved.pathname = resolved.pathname.replace(/\/+$/, '');
    }
    return {
      pageUrl: resolved.toString(),
      hash,
    };
  } catch {
    return null;
  }
}

function normalizeAssetUrl(input, baseUrl) {
  if (shouldIgnoreUrl(input)) {
    return null;
  }

  try {
    const resolved = new URL(input, baseUrl);
    if (!/^https?:$/.test(resolved.protocol)) {
      return null;
    }
    if (resolved.origin === siteOrigin && !looksLikeAssetPath(resolved.pathname)) {
      return null;
    }
    if (resolved.pathname === '/' && !resolved.search) {
      return null;
    }
    resolved.hash = '';
    return resolved.toString();
  } catch {
    return null;
  }
}

function looksLikeAssetPath(pathname) {
  return /\.[a-z0-9]{2,8}$/i.test(pathname);
}

function shouldIgnoreUrl(value) {
  return (
    !value ||
    value.startsWith('#') ||
    value.startsWith('mailto:') ||
    value.startsWith('tel:') ||
    value.startsWith('javascript:') ||
    value.startsWith('data:')
  );
}

function getLocalPagePath(pageUrl) {
  const url = new URL(pageUrl);
  const parts = url.pathname
    .split('/')
    .filter(Boolean)
    .map((part) => sanitizePathSegment(safeDecodeURIComponent(part)));

  let fileName = parts.length > 0 ? parts.join(path.sep) : 'index';
  if (url.search) {
    fileName += `__q_${shortHash(url.search)}`;
  }
  return path.join(pagesDir, `${fileName}.html`);
}

function getLocalPageHref(pageRef, fromFile, currentPageUrl) {
  const targetFile = getLocalPagePath(pageRef.resolved);
  const currentFile = getLocalPagePath(currentPageUrl);
  const hashSuffix = pageRef.hash ? `#${pageRef.hash}` : '';
  if (targetFile === currentFile && hashSuffix) {
    return hashSuffix;
  }
  const relative = toWebPath(path.relative(path.dirname(fromFile), targetFile));
  return `${relative || path.basename(targetFile)}${hashSuffix}`;
}

function getLocalAssetPath(assetUrl, contentType) {
  const url = new URL(assetUrl);
  const host = sanitizePathSegment(url.hostname);
  const rawParts = url.pathname.split('/').filter(Boolean);
  const parts = rawParts.map((part) => sanitizePathSegment(safeDecodeURIComponent(part)));
  let fileName = parts.length > 0 ? parts.pop() : 'index';
  const inferredExt = inferExtension(fileName, contentType);
  if (path.extname(fileName) === '') {
    fileName += inferredExt;
  }
  if (url.search) {
    const currentExt = path.extname(fileName);
    const baseName = currentExt ? fileName.slice(0, -currentExt.length) : fileName;
    fileName = `${baseName}__q_${shortHash(url.search)}${currentExt}`;
  }
  return path.join(assetsDir, host, ...parts, fileName);
}

function inferExtension(fileName, contentType) {
  const currentExt = path.extname(fileName);
  if (currentExt) {
    return currentExt;
  }

  const contentTypeMap = {
    'application/javascript': '.js',
    'application/json': '.json',
    'font/otf': '.otf',
    'font/ttf': '.ttf',
    'font/woff': '.woff',
    'font/woff2': '.woff2',
    'image/avif': '.avif',
    'image/gif': '.gif',
    'image/jpeg': '.jpg',
    'image/png': '.png',
    'image/svg+xml': '.svg',
    'image/webp': '.webp',
    'text/css': '.css',
    'text/html': '.html',
    'text/javascript': '.js',
    'text/plain': '.txt',
    'video/mp4': '.mp4',
    'video/webm': '.webm',
  };

  for (const [type, extension] of Object.entries(contentTypeMap)) {
    if (contentType.includes(type)) {
      return extension;
    }
  }

  return '.bin';
}

function isCssAsset(localPath, contentType) {
  return contentType.includes('text/css') || localPath.endsWith('.css');
}

async function copyFirecrawlArtifacts() {
  const entries = await fs.readdir(firecrawlDir, { withFileTypes: true }).catch(() => []);
  for (const entry of entries) {
    if (!entry.isFile()) {
      continue;
    }
    if (!entry.name.startsWith('synthorix-')) {
      continue;
    }
    const source = path.join(firecrawlDir, entry.name);
    const target = path.join(firecrawlArchiveDir, entry.name);
    await fs.copyFile(source, target);
  }
}

async function writeManifest(pageStates) {
  const manifest = {
    generatedAt: new Date().toISOString(),
    sourceSite: startUrl,
    pages: pageStates.map((pageState) => ({
      url: pageState.url,
      localPath: path.relative(projectRoot, pageState.localPath),
      pageLinks: pageState.pageRefs.length,
      assetLinks: pageState.assetRefs.length,
    })),
    assets: [...assetResults.values()].map((asset) => ({
      url: asset.url,
      localPath: asset.localPath ? path.relative(projectRoot, asset.localPath) : null,
      contentType: asset.contentType ?? null,
      error: asset.error ?? null,
    })),
    failures,
  };

  await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2), 'utf8');
}

async function writeReadme(pageStates) {
  const lines = [
    'Synthorix local download',
    '',
    `Source: ${startUrl}`,
    `Generated at: ${new Date().toISOString()}`,
    '',
    'Contents:',
    '- pages/: local HTML mirror',
    '- assets/: downloaded CSS, JS, images, fonts, and other referenced files',
    '- firecrawl/: Firecrawl archives for the mapped pages',
    '- manifest.json: URL-to-file mapping and failure log',
    '',
    'Saved pages:',
    ...pageStates.map((pageState) => `- ${path.relative(projectRoot, pageState.localPath)} <- ${pageState.url}`),
  ];

  if (failures.length > 0) {
    lines.push('', 'Failures:');
    lines.push(...failures.map((failure) => `- [${failure.stage}] ${failure.url} :: ${failure.error}`));
  }

  await fs.writeFile(readmePath, `${lines.join('\n')}\n`, 'utf8');
}

function replaceAllLiteral(text, searchValue, replaceValue) {
  return text.split(searchValue).join(replaceValue);
}

function decodeHtmlEntities(value) {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

function sanitizePathSegment(value) {
  const sanitized = value.replace(/[<>:"/\\|?*\x00-\x1f]/g, '_').trim();
  return sanitized === '' ? 'index' : sanitized;
}

function safeDecodeURIComponent(value) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function shortHash(value) {
  return crypto.createHash('sha1').update(value).digest('hex').slice(0, 10);
}

function toWebPath(value) {
  return value.replace(/\\/g, '/');
}
