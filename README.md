# OrtoArt

Site institucional da OrtoArt Materiais Cirurgicos Ltda. em Next.js 16 com React 19.

## Estrutura

- `src/`: aplicacao principal do site da OrtoArt
- `temp-static-site/`: scripts de deploy FTP e artefatos da migracao para site estatico
- `downloads/synthorix/`: mirror local do site de referencia usado como base visual e estrutural
- `planejamento/`: escopo e estrutura das paginas
- `old/`: conteudo extraido do site antigo para migracao
- `Branding/`: materiais de marca
- `tools/`: scripts de apoio, incluindo o gerador do mirror

## Comandos

Execute tudo a partir da raiz do projeto:

```bash
npm run dev
npm run build
npm run lint
```

O app sobe em `http://localhost:3000`.

## Referencia clonada

Para visualizar o mirror estatico do site-base localmente:

```bash
python -m http.server 4173 --bind 127.0.0.1 --directory downloads/synthorix
```

Depois abra:

`http://127.0.0.1:4173/pages/index.html`

## Publicacao

O site e exportado como HTML estatico (`output: "export"` em `next.config.ts`) e publicado em dois ambientes:

| Ambiente | URL | Como atualiza |
|----------|-----|---------------|
| **Producao** | https://ortoart.com.br | Deploy manual via FTP |
| **Preview** | https://ortoart.vercel.app | Vercel conectada ao GitHub (`JuniorVln/ortoart`) |

Codigo-fonte: https://github.com/JuniorVln/ortoart

### Deploy em producao (FTP)

Requisitos: credenciais FTP da hospedagem do dominio (nao ficam no repositorio).

1. Gere o build estatico na raiz do projeto:

```bash
npm run build
```

Isso cria a pasta `out/` (ignorada pelo Git).

2. (Opcional) Ajuste links internos para compatibilidade com Apache/LiteSpeed na hospedagem — a home passa a apontar para `/index.php`:

```powershell
.\temp-static-site\rewrite-static-links.ps1 -OutDir out
```

3. Envie os arquivos por FTP:

```powershell
.\temp-static-site\deploy-static.ps1 `
  -FtpHost "ftp.seu-host.com.br" `
  -Username "usuario" `
  -Password "senha" `
  -LocalRoot "out"
```

O script faz backup do `index.html` atual no servidor (`index.html.backup-YYYYMMDD-HHmmss`) antes de substituir.

4. Se necessario, publique o `.htaccess` estatico no servidor (conteudo em `temp-static-site/.htaccess.static`):

```
DirectoryIndex index.html index.php
```

### Preview na Vercel

A Vercel esta ligada ao repositorio GitHub. Push na branch conectada dispara build automatico em https://ortoart.vercel.app.

Nao ha `vercel.json` no projeto; a configuracao fica no painel da Vercel. A pasta `.vercel` e local e esta no `.gitignore`.

### Scripts auxiliares (`temp-static-site/`)

| Script | Uso |
|--------|-----|
| `deploy-static.ps1` | Upload da pasta `out/` via FTP |
| `rewrite-static-links.ps1` | Reescreve links do export estatico para a hospedagem |
| `archive-legacy-ftp.ps1` | Migracao unica: move arquivos do WordPress antigo para `old_website/` no FTP |

### Observacoes sobre o CMS

Rotas de admin (`/admin`) e API (`/api`) exigem servidor Node.js e **nao** entram no export estatico de producao. O site publico em `ortoart.com.br` e 100% estatico.

## Observacoes

- O app Next.js agora vive na raiz do repositorio; a pasta `site/` foi removida da estrutura ativa.
- O mirror baixado fica separado em `downloads/synthorix` para servir como referencia durante a implementacao.
- A pasta `temp-static-site/` guarda artefatos e scripts do processo de migracao WordPress → Next.js estatico; os scripts de deploy podem ser usados a partir da raiz conforme descrito acima.
