import { createFileRoute } from '@tanstack/react-router';
import { RssIcon } from 'lucide-react';

import { PostCard } from '@/components/blog/post-card';
import { loadPosts } from '@/lib/blog.functions';
import { withBasePath } from '@/lib/paths';

export const Route = createFileRoute('/blog/')({
  loader: () => loadPosts(),
  head: () => ({
    meta: [
      { title: 'Blog | Tom Siwik' },
      { name: 'description', content: 'Notes, experiments, and projects by Tom Siwik.' },
    ],
    links: [
      { rel: 'canonical', href: 'https://tomhacks.com/blog' },
      {
        rel: 'alternate',
        type: 'application/rss+xml',
        href: 'https://tomhacks.com/blog/feed.xml',
      },
    ],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  const posts = Route.useLoaderData();

  return (
    <main className="container space-y-10 py-8 md:py-16">
      <section>
        <div className="mx-auto max-w-3xl space-y-4 text-center">
          <h1 className="text-3xl leading-tight font-bold sm:text-4xl">Blog</h1>
          <p className="text-muted-foreground text-xl">
            Notes and thoughts about development, design, AI, and every day struggles to create something.
          </p>
        </div>
      </section>

      <section>
        <div className="grid items-start gap-4 md:grid-cols-2">
          {posts.slice(0, 1).map((post) => <PostCard key={post.path} post={post} />)}
          <div className="grid content-start gap-4 sm:max-md:grid-cols-2">
            {posts.slice(1, 4).map((post) => <PostCard key={post.path} post={post} variant="compact" />)}
          </div>
        </div>
      </section>

      {posts.length > 4 ? (
        <section className="space-y-16 border-t pt-16">
          <div className="space-y-2.5">
            <div className="font-jersey text-sm font-semibold tracking-[0.28em] text-[var(--hatch-cta)]">THOUGHTS</div>
            <div className="flex justify-between gap-4 max-md:flex-col">
              <h2 className="text-2xl font-semibold sm:text-3xl lg:text-4xl">More notes from the workbench</h2>
              <p className="max-w-xl text-lg text-muted-foreground">Practical observations, working examples, and lessons gathered while making things for the web.</p>
            </div>
          </div>
          <div className="h-px bg-border" />
          <div className="grid gap-6 sm:grid-cols-2">
            {posts.slice(4).map((post) => <PostCard key={post.path} post={post} />)}
          </div>
        </section>
      ) : null}

      <section className="flex flex-col items-center gap-6 py-8 text-center">
        <RssIcon className="size-12" aria-hidden="true" />
        <h2 className="max-w-md text-2xl font-semibold sm:text-3xl lg:text-4xl">Using a feed reader?</h2>
        <a href={withBasePath('/blog/feed.xml')} className="max-w-full overflow-x-auto font-mono text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground">tomhacks.com/blog/feed.xml</a>
      </section>
    </main>
  );
}
