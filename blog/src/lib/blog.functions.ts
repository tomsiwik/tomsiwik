import { notFound } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import { staticFunctionMiddleware } from '@tanstack/start-static-server-functions';

import {
  blogSource,
  getBlogCategories,
  getBlogPosts,
  getBlogTags,
  taxonomySlug,
} from '@/lib/blog';

export const loadPosts = createServerFn({ method: 'GET' })
  .middleware([staticFunctionMiddleware])
  .handler(() => getBlogPosts());

export const loadPost = createServerFn({ method: 'GET' })
  .validator((slug: string) => slug)
  .middleware([staticFunctionMiddleware])
  .handler(({ data: slug }) => {
    const page = blogSource.getPage(slug.split('/'));
    if (!page) throw notFound();

    return {
      author: page.data.author,
      category: page.data.category,
      cover: page.data.cover,
      date: page.data.date,
      description: page.data.description,
      path: page.path,
      related: getBlogPosts()
        .filter((post) => post.path !== page.path)
        .slice(0, 2),
      tags: page.data.tags,
      title: page.data.title,
    };
  });

export const loadCategories = createServerFn({ method: 'GET' })
  .middleware([staticFunctionMiddleware])
  .handler(() => getBlogCategories());

export const loadCategory = createServerFn({ method: 'GET' })
  .validator((slug: string) => slug)
  .middleware([staticFunctionMiddleware])
  .handler(({ data: slug }) => {
    const category = getBlogCategories().find((item) => item.slug === slug);
    if (!category) throw notFound();
    return {
      category,
      posts: getBlogPosts().filter((post) => taxonomySlug(post.category) === slug),
    };
  });

export const loadTags = createServerFn({ method: 'GET' })
  .middleware([staticFunctionMiddleware])
  .handler(() => getBlogTags());

export const loadTag = createServerFn({ method: 'GET' })
  .validator((slug: string) => slug)
  .middleware([staticFunctionMiddleware])
  .handler(({ data: slug }) => {
    const tag = getBlogTags().find((item) => item.slug === slug);
    if (!tag) throw notFound();
    return {
      posts: getBlogPosts().filter((post) =>
        post.tags.some((title) => taxonomySlug(title) === slug),
      ),
      tag,
    };
  });
