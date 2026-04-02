import type { Metadata } from "next";
import BlogPageSections from "@/components/sections/BlogPageSections";
import { getAllBlogPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Conteúdo e conhecimento sobre coluna vertebral, medicina esportiva e ortopedia. Blog OrtoArt.",
};

export default function BlogPage() {
  const posts = getAllBlogPosts().map((post) => ({
    slug: post.slug,
    title: post.title,
    category: post.category,
    coverImage: post.coverImage,
    coverAlt: post.coverAlt,
    excerpt: post.excerpt,
    dateLabel: post.dateLabel,
    readingTime: post.readingTime,
  }));

  return <BlogPageSections posts={posts} />;
}
