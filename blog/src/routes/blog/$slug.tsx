import { createFileRoute, Link } from '@tanstack/react-router';
import { DocsBody } from 'fumadocs-ui/layouts/docs/page';
import { ArrowLeftIcon, ChevronRightIcon, TextIcon } from 'lucide-react';
import { Suspense, use } from 'react';

import { BlogCover } from '@/components/blog/blog-cover';
import { PostCard } from '@/components/blog/post-card';
import { AuthorCard } from '@/components/registry/author-card';
import { Button } from '@/components/ui/button';
import { useMDXComponents } from '@/components/mdx';
import { blog } from '@/lib/blog';
import { loadPost } from '@/lib/blog.functions';
import { withBasePath } from '@/lib/paths';

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
  author,
  cover,
  description,
  path,
  related,
  title,
}: Awaited<ReturnType<typeof loadPost>>) {
  const page = blog.getPage(path);
  if (!page) throw new Error(`Unknown blog page: ${path}`);

  const { toc } = use(page.load());
  const MDX = page.body;

  return (
    <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 md:px-6 md:py-16">
      <nav aria-label="Breadcrumb" className="flex min-w-0 items-center gap-2 text-sm text-muted-foreground">
        <Link to="/" className="hover:text-foreground">Home</Link>
        <ChevronRightIcon className="size-4 shrink-0" />
        <Link to="/blog" className="hover:text-foreground">Blog</Link>
        <ChevronRightIcon className="size-4 shrink-0" />
        <span className="truncate text-foreground">{title}</span>
      </nav>

      <div className="mt-10 grid grid-cols-1 gap-16 lg:grid-cols-12">
        <article className="min-w-0 lg:col-span-8">
          <header className="space-y-6">
            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">{title}</h1>
            {description ? (
              <p className="font-display text-xl leading-8 font-semibold text-muted-foreground">{description}</p>
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

        <aside className="hidden space-y-10 lg:sticky lg:top-20 lg:col-span-4 lg:block lg:self-start">
          <AuthorCard name={author} role="Author · tomhacks.com" avatarUrl={withBasePath('/images/brand/tom-siwik.jpg')} website="https://tomhacks.com" />
          {toc.length > 0 ? (
            <nav aria-label="Table of contents">
              <h2 className="inline-flex items-center gap-1.5 text-sm text-muted-foreground"><TextIcon className="size-4" />Table of contents</h2>
              <div className="relative mt-4 flex flex-col">
                <div className="absolute inset-y-0 left-0 w-px bg-border" />
                {toc.map((item) => (
                  <a
                    key={item.url}
                    href={item.url}
                    className="relative py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                    style={{ paddingInlineStart: item.depth <= 2 ? 12 : item.depth === 3 ? 24 : 32 }}
                  >
                    {item.title}
                  </a>
                ))}
              </div>
            </nav>
          ) : null}
        </aside>
      </div>

      {related.length > 0 ? (
        <section className="mt-24 space-y-12">
          <div className="space-y-2.5">
            <span className="inline-flex rounded-full border-black bg-black px-2.5 py-0.5 text-xs font-semibold text-white">Keep reading</span>
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
