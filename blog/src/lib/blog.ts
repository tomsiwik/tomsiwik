import { loader } from 'fumadocs-core/source';
import { pageSchema } from 'fumadocs-core/source/schema';
import { defineDocs } from 'fumadocs-mdx/macro';
import { z } from 'zod';

const blogPageSchema = pageSchema.extend({
  date: z.string(),
  author: z.string().default('Tom Siwik'),
  category: z.string().default('Notes'),
  tags: z.array(z.string()).default([]),
  cover: z.string().optional(),
});

export const blog = defineDocs({
  dir: 'content/blog',
  docs: {
    async: true,
    schema: blogPageSchema,
  },
});

export const blogSource = loader({
  source: blog.toFumadocsSource(),
  baseUrl: '/blog',
});

export function getBlogPosts() {
  return blogSource
    .getPages()
    .map((page) => ({
      author: page.data.author,
      category: page.data.category,
      cover: page.data.cover,
      date: page.data.date,
      description: page.data.description,
      path: page.path,
      slug: page.slugs.join('/'),
      tags: page.data.tags,
      title: page.data.title,
      url: page.url,
    }))
    .sort((a, b) => b.date.localeCompare(a.date));
}

export type BlogPost = ReturnType<typeof getBlogPosts>[number];

export function taxonomySlug(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export function getBlogCategories() {
  const categories = new Map<string, { count: number; slug: string; title: string }>();

  for (const post of getBlogPosts()) {
    const slug = taxonomySlug(post.category);
    const category = categories.get(slug);
    categories.set(slug, {
      count: (category?.count ?? 0) + 1,
      slug,
      title: post.category,
    });
  }

  return [...categories.values()].sort((a, b) => b.count - a.count || a.title.localeCompare(b.title));
}

export function getBlogTags() {
  const tags = new Map<string, { count: number; slug: string; title: string }>();

  for (const post of getBlogPosts()) {
    for (const title of post.tags) {
      const slug = taxonomySlug(title);
      const tag = tags.get(slug);
      tags.set(slug, {
        count: (tag?.count ?? 0) + 1,
        slug,
        title,
      });
    }
  }

  return [...tags.values()].sort((a, b) => b.count - a.count || a.title.localeCompare(b.title));
}
