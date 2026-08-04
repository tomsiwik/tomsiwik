import { Link } from '@tanstack/react-router';
import { ArrowRightIcon } from 'lucide-react';

import { BlogCover } from '@/components/blog/blog-cover';
import type { BlogPost } from '@/lib/blog';
import { cn } from '@/lib/utils';

function ReadArticleOverlay({ compact = false }: { compact?: boolean }) {
  return (
    <>
      <div className="pointer-events-none absolute inset-0 bg-foreground/0 transition-colors duration-200 group-hover:bg-foreground/20 group-focus-visible:bg-foreground/20" />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
        <span className={`inline-flex items-center gap-2 rounded-full border bg-background/90 font-medium shadow-xs backdrop-blur ${compact ? 'px-3 py-1.5 text-xs' : 'px-4 py-2 text-sm'}`}>
          Read article <ArrowRightIcon className={compact ? 'size-3' : 'size-4'} />
        </span>
      </div>
    </>
  );
}

function PostDate({ date, accented = false }: { date: string; accented?: boolean }) {
  return (
    <time
      dateTime={date}
      className={cn(
        'font-sans text-[0.6875rem] font-normal tracking-normal text-muted-foreground/50',
        accented && 'text-xs font-semibold tracking-[0.08em] text-hatch-cta',
      )}
    >
      {new Date(date).toLocaleDateString('en', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        timeZone: 'UTC',
      })}
    </time>
  );
}

export function PostCard({ post, variant = 'default', boxed = false }: { post: BlogPost; variant?: 'default' | 'compact'; boxed?: boolean }) {
  if (variant === 'compact') {
    return (
      <article className="min-w-0">
        <Link
          to="/blog/$slug"
          params={{ slug: post.slug }}
          className={cn(
            'group flex min-w-0 justify-between gap-6 focus-visible:outline-none max-sm:flex-col',
            boxed && 'rounded-[18px] bg-muted/30 p-6 transition-colors hover:bg-muted/50 focus-visible:bg-muted/50 sm:p-7',
          )}
        >
          <div className="relative h-50 overflow-hidden rounded-lg sm:size-30 sm:shrink-0">
            <BlogCover title={post.title} coverImage={post.cover} className="absolute inset-0 size-full rounded-lg border transition-transform duration-300 group-hover:scale-[1.02] group-focus-visible:scale-[1.02]" />
            <ReadArticleOverlay compact />
          </div>
          <div className="flex min-w-0 flex-1 flex-col justify-center gap-3.5">
            <h3 className="line-clamp-2 text-base font-medium">{post.title}</h3>
            <PostDate date={post.date} accented={boxed} />
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
        className={cn(
          'group flex h-full min-w-0 flex-col focus-visible:outline-none',
          boxed && 'rounded-[18px] bg-muted/30 p-6 transition-colors hover:bg-muted/50 focus-visible:bg-muted/50 sm:p-7',
        )}
      >
        <div className="relative overflow-hidden rounded-lg">
          <BlogCover title={post.title} description={post.description} coverImage={post.cover} className="h-65 rounded-lg border transition-transform duration-300 group-hover:scale-[1.02] group-focus-visible:scale-[1.02]" />
          <ReadArticleOverlay />
        </div>
        <div className="mt-6 flex min-w-0 flex-1 flex-col">
          <h3 className="mb-2 line-clamp-2 text-xl font-medium">{post.title}</h3>
          {post.description ? <p className="line-clamp-2 text-base text-muted-foreground">{post.description}</p> : null}
          <div className="mt-3"><PostDate date={post.date} accented={boxed} /></div>
        </div>
      </Link>
    </article>
  );
}
