import { Link } from '@tanstack/react-router';
import { ArrowRightIcon } from 'lucide-react';

import { BlogCover } from '@/components/blog/blog-cover';
import type { BlogPost } from '@/lib/blog';

function ReadArticleOverlay({ compact = false }: { compact?: boolean }) {
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
      <span className={`inline-flex items-center gap-2 rounded-full border bg-background/90 font-medium shadow-xs backdrop-blur ${compact ? 'px-3 py-1.5 text-xs' : 'px-4 py-2 text-sm'}`}>
        Read article <ArrowRightIcon className={compact ? 'size-3' : 'size-4'} />
      </span>
    </div>
  );
}

export function PostCard({ post, variant = 'default' }: { post: BlogPost; variant?: 'default' | 'compact' }) {
  if (variant === 'compact') {
    return (
      <article className="min-w-0">
        <Link
          to="/blog/$slug"
          params={{ slug: post.slug }}
          className="group flex min-w-0 justify-between gap-6 rounded-xl border bg-card px-6 py-5 shadow-xs transition-colors hover:border-foreground/30 focus-visible:border-foreground/30 focus-visible:outline-none max-sm:flex-col"
        >
          <div className="relative h-50 overflow-hidden rounded-lg sm:size-30 sm:shrink-0">
            <BlogCover title={post.title} coverImage={post.cover} className="absolute inset-0 size-full rounded-lg border-0" />
            <ReadArticleOverlay compact />
          </div>
          <div className="flex min-w-0 flex-1 flex-col justify-center gap-3.5">
            <h3 className="line-clamp-2 text-base font-medium">{post.title}</h3>
          </div>
        </Link>
      </article>
    );
  }

  return (
    <article className="h-full min-w-0">
      <Link
        to="/blog/$slug"
        params={{ slug: post.slug }}
        className="group flex h-full min-w-0 flex-col gap-6 rounded-xl border bg-card p-6 shadow-xs transition-colors hover:border-foreground/30 focus-visible:border-foreground/30 focus-visible:outline-none"
      >
        <div className="relative overflow-hidden rounded-lg">
          <BlogCover title={post.title} description={post.description} coverImage={post.cover} className="h-65 rounded-lg border-0" />
          <ReadArticleOverlay />
        </div>
        <div className="flex min-w-0 flex-1 flex-col">
          <h3 className="mb-2 line-clamp-2 text-xl font-medium">{post.title}</h3>
          {post.description ? <p className="line-clamp-2 text-base text-muted-foreground">{post.description}</p> : null}
        </div>
      </Link>
    </article>
  );
}
