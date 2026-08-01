import { createFileRoute, Link } from '@tanstack/react-router';
import { DocsBody } from 'fumadocs-ui/layouts/docs/page';
import { ArrowLeftIcon, ChevronRightIcon } from 'lucide-react';
import { Suspense, use } from 'react';

import { BlogCover } from '@/components/blog/blog-cover';
import { PostCard } from '@/components/blog/post-card';
import { Button } from '@/components/ui/button';
import { useMDXComponents } from '@/components/mdx';
import { blog } from '@/lib/blog';
import { loadPost } from '@/lib/blog.functions';

export const Route = createFileRoute('/blog/$slug')({
  loader: async ({ params }) => {
    const data = await loadPost({ data: params.slug });
    await blog.getPage(data.path)?.preload();
    return data;
  },
  head: ({ loaderData, params }) => ({
    meta: [
      { title: `${loaderData?.title ?? params.slug} | Tom Siwik` },
      ...(loaderData?.description
        ? [{ name: 'description', content: loaderData.description }]
        : []),
      { property: 'og:type', content: 'article' },
      { property: 'og:title', content: loaderData?.title ?? params.slug },
      {
        property: 'og:url',
        content: `https://tomhacks.com/blog/${params.slug}`,
      },
      { name: 'author', content: loaderData?.author ?? 'Tom Siwik' },
      ...(loaderData?.tags.length
        ? [{ name: 'keywords', content: loaderData.tags.join(', ') }]
        : []),
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:title', content: loaderData?.title ?? params.slug },
    ],
    links: [
      {
        rel: 'canonical',
        href: `https://tomhacks.com/blog/${params.slug}`,
      },
      {
        rel: 'alternate',
        type: 'application/rss+xml',
        href: 'https://tomhacks.com/blog/feed.xml',
      },
    ],
  }),
  component: BlogPost,
});

function BlogPost() {
  const post = Route.useLoaderData();

  return (
    <Suspense>
      <PostContent {...post} />
    </Suspense>
  );
}

function PostContent({
  cover,
  description,
  path,
  related,
  title,
}: Awaited<ReturnType<typeof loadPost>>) {
  const page = blog.getPage(path);
  if (!page) throw new Error(`Unknown blog page: ${path}`);

  use(page.load());
  const MDX = page.body;

  return (
    <main className="container flex-1 py-8 md:py-16">
      <nav aria-label="Breadcrumb" className="flex min-w-0 items-center gap-2 text-sm text-muted-foreground">
        <Link to="/" className="hover:text-foreground">Home</Link>
        <ChevronRightIcon className="size-4 shrink-0" />
        <Link to="/blog" className="hover:text-foreground">Blog</Link>
        <ChevronRightIcon className="size-4 shrink-0" />
        <span className="truncate text-foreground">{title}</span>
      </nav>

      <article className="mt-10 min-w-0">
        <header className="space-y-6">
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">{title}</h1>
          {description ? (
            <p className="font-sans text-xl leading-8 font-semibold text-muted-foreground">{description}</p>
          ) : null}
        </header>

        <BlogCover title={title} description={description} coverImage={cover} className="mt-10 rounded-xl border" />

        <DocsBody className="article-prose prose-headings:text-foreground prose-h2:mt-10 prose-h2:text-2xl prose-h2:font-semibold prose-h3:mt-6 prose-h3:text-xl prose-h3:font-medium prose-h4:mt-6 prose-h4:text-base prose-h4:font-medium prose-p:mt-3 prose-p:text-base prose-p:leading-7 prose-p:text-muted-foreground prose-strong:text-foreground prose-a:text-foreground prose-code:text-foreground prose-blockquote:text-muted-foreground prose-ul:mt-6 prose-ol:mt-6 prose-li:mt-3 prose-li:text-muted-foreground prose-pre:my-6 prose-pre:rounded-[4px] prose-pre:bg-muted mt-16 max-w-none min-w-0 text-foreground [&_a]:break-words [&_code]:break-words [&_pre]:max-w-full [&_pre]:overflow-x-auto">
          <MDX components={useMDXComponents()} />
        </DocsBody>

        <div className="mt-16">
          <Button variant="outline" asChild><Link to="/blog/posts" className="flex items-center gap-2"><ArrowLeftIcon className="size-4" />Back to posts</Link></Button>
        </div>
      </article>

      {related.length > 0 ? (
        <section className="mt-24 space-y-12">
          <div className="space-y-2.5">
            <span className="font-jersey text-sm font-semibold tracking-[0.28em] text-[var(--hatch-cta)]">Keep reading</span>
            <div className="flex justify-between gap-4 max-md:flex-col">
              <h2 className="text-2xl font-semibold sm:text-3xl lg:text-4xl">More writing</h2>
              <p className="max-w-xl text-lg text-muted-foreground">Two more notes about making useful, resilient products for the web.</p>
            </div>
          </div>
          <div className="grid gap-12 sm:grid-cols-2">
            {related.map((post) => <PostCard key={post.path} post={post} />)}
          </div>
        </section>
      ) : null}
    </main>
  );
}
