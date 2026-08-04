import { Link } from '@tanstack/react-router';
import { ArrowRightIcon, TagIcon, UserIcon } from 'lucide-react';

import { BlogCover } from '@/components/blog/blog-cover';
import type { BlogPost } from '@/lib/blog';

export function PostList({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) {
    return <p className="text-muted-foreground py-12">No posts yet.</p>;
  }

  return (
    <div className="grid gap-6">
      {posts.map((post) => (
        <article key={post.path}>
          <Link
            to="/blog/$slug"
            params={{ slug: post.slug }}
            className="group flex flex-col gap-5 rounded-xl border bg-card p-5 shadow-xs transition-colors hover:border-foreground/30 focus-visible:border-foreground/30 focus-visible:outline-none md:flex-row md:items-center"
          >
            <div className="relative aspect-video shrink-0 overflow-hidden rounded-lg md:w-48">
              <BlogCover title={post.title} coverImage={post.cover} className="absolute inset-0 size-full" />
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
                <span className="inline-flex items-center gap-2 rounded-full border bg-background/90 px-3 py-1.5 text-xs font-medium shadow-xs backdrop-blur">
                  Read article <ArrowRightIcon className="size-3" />
                </span>
              </div>
            </div>
            <div className="flex flex-1 flex-col">
              <div className="mb-2 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><UserIcon className="size-4" />{post.author}</span>
                <span>{post.category}</span>
              </div>
              <h2 className="mb-2 text-xl font-medium sm:text-2xl">{post.title}</h2>
              {post.description ? <p className="mb-3 line-clamp-2 text-muted-foreground">{post.description}</p> : null}
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => <span key={tag} className="inline-flex items-center gap-1 rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground"><TagIcon className="size-3" />{tag}</span>)}
              </div>
            </div>
          </Link>
        </article>
      ))}
    </div>
  );
}
