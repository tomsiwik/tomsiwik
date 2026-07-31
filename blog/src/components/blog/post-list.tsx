import { Link } from '@tanstack/react-router';
import { CalendarIcon, TagIcon, UserIcon } from 'lucide-react';

import { BlogCover } from '@/components/blog/blog-cover';
import { Button } from '@/components/ui/button';
import type { BlogPost } from '@/lib/blog';
import { taxonomySlug } from '@/lib/blog';

export function PostList({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) {
    return <p className="text-muted-foreground py-12">No posts yet.</p>;
  }

  return (
    <div className="grid gap-6">
      {posts.map((post) => (
        <article key={post.path} className="flex flex-col gap-5 rounded-xl border bg-card p-5 shadow-xs transition-colors hover:border-foreground/20 md:flex-row md:items-center">
          <div className="shrink-0 md:w-48">
            <Link to="/blog/$slug" params={{ slug: post.slug }} className="relative block aspect-video overflow-hidden rounded-lg">
              <BlogCover title={post.title} coverImage={post.cover} className="absolute inset-0 size-full" />
            </Link>
          </div>
          <div className="flex flex-1 flex-col">
            <div className="mb-2 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1"><CalendarIcon className="size-4" /><time dateTime={post.date}>{new Date(post.date).toLocaleDateString('en', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' })}</time></span>
              <span className="flex items-center gap-1"><UserIcon className="size-4" />{post.author}</span>
              <Link to="/blog/categories/$slug" params={{ slug: taxonomySlug(post.category) }} className="hover:text-primary">{post.category}</Link>
            </div>
            <h2 className="mb-2 text-xl font-medium sm:text-2xl">
              <Link to="/blog/$slug" params={{ slug: post.slug }} className="hover:text-primary">{post.title}</Link>
            </h2>
            {post.description ? <p className="mb-3 line-clamp-2 text-muted-foreground">{post.description}</p> : null}
            <div className="mt-auto flex flex-wrap items-end justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => <Link key={tag} to="/blog/tags/$slug" params={{ slug: taxonomySlug(tag) }} className="inline-flex items-center gap-1 rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground hover:bg-secondary/80"><TagIcon className="size-3" />{tag}</Link>)}
              </div>
              <Button variant="outline" size="sm" asChild><Link to="/blog/$slug" params={{ slug: post.slug }}>Read more</Link></Button>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
