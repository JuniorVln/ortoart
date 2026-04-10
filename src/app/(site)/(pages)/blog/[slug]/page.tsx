import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogArticleSections from "@/components/sections/BlogArticleSections";
import {
  getAllBlogPosts,
  getBlogPostBySlug,
  getRelatedBlogPosts,
} from "@/lib/blog";

export const dynamic = "force-dynamic";

// During build, if no posts exist in DB, fallback to empty array
// Posts will be generated on-demand during runtime
export async function generateStaticParams() {
  try {
    const { getAllBlogPosts } = await import("@/lib/blog");
    return getAllBlogPosts().map((post) => ({
      slug: post.slug,
    }));
  } catch {
    return [];
  }
}

export async function generateMetadata(
  props: PageProps<"/blog/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Artigo não encontrado",
      description: "O artigo solicitado não foi encontrado no Blog OrtoArt.",
    };
  }

  return {
    title: `${post.title} | Blog OrtoArt`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
    },
  };
}

export default async function BlogArticlePage(
  props: PageProps<"/blog/[slug]">
) {
  const { slug } = await props.params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedBlogPosts(slug);

  return <BlogArticleSections post={post} relatedPosts={relatedPosts} />;
}
