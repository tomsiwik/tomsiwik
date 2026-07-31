import { createFileRoute, Link } from '@tanstack/react-router';
import { RssIcon } from 'lucide-react';

import { PostCard } from '@/components/blog/post-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
    <main className="mx-auto w-full max-w-7xl space-y-10 px-4 py-8 md:px-6 md:py-16">
      <section>
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
          <h1 className="text-3xl leading-tight font-bold sm:text-4xl">Ideas for better digital products</h1>
          <p className="text-xl text-muted-foreground">Notes on design, development, accessibility, and the small details that make software feel considered.</p>
          <form className="w-full max-w-sm gap-3 pt-1 max-sm:space-y-2 sm:flex" onSubmit={(event) => event.preventDefault()}>
            <Input type="email" aria-label="Email address" placeholder="you@example.com" />
            <Button type="submit" className="max-sm:w-full">Subscribe</Button>
          </form>
          <nav className="flex flex-wrap justify-center gap-4 pt-2 text-sm" aria-label="Blog">
            <Link to="/blog/posts" className="underline underline-offset-4">All posts</Link>
            <Link to="/blog/categories" className="underline underline-offset-4">Categories</Link>
            <Link to="/blog/tags" className="underline underline-offset-4">Tags</Link>
          </nav>
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
            <Badge className="border-black bg-black text-white">Thoughts</Badge>
            <div className="flex justify-between gap-4 max-md:flex-col">
              <h2 className="text-2xl font-semibold sm:text-3xl lg:text-4xl">More notes from the workbench</h2>
              <p className="max-w-xl text-lg text-muted-foreground">Practical observations, working examples, and lessons gathered while making things for the web.</p>
            </div>
          </div>
          <div className="h-px bg-border" />
          <div className="grid gap-6 sm:grid-cols-2">
            {posts.slice(4).map((post) => <PostCard key={post.path} post={post} />)}
          </div>
          <div className="flex justify-end"><Button variant="outline" asChild><Link to="/blog/posts">All posts</Link></Button></div>
        </section>
      ) : null}

      <section className="flex flex-col items-center gap-6 py-8 text-center">
        <RssIcon className="size-12" aria-hidden="true" />
        <h2 className="max-w-md text-2xl font-semibold sm:text-3xl lg:text-4xl">Follow new writing in your feed reader</h2>
        <a href={withBasePath('/blog/feed.xml')} className="max-w-full overflow-x-auto font-mono text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground">tomhacks.com/blog/feed.xml</a>
      </section>
    </main>
  );
}
