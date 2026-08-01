import { Link } from '@tanstack/react-router';

import { BlogCover } from '@/components/blog/blog-cover';
import { Button } from '@/components/ui/button';
import type { BlogPost } from '@/lib/blog';

function PostDate({ date }: { date: string }) {
  return (
    <time dateTime={date} className="font-jersey text-sm font-semibold tracking-[0.28em] text-muted-foreground">
      {new Date(date).toLocaleDateString('en', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        timeZone: 'UTC',
      })}
    </time>
  );
}

export function PostCard({ post, variant = 'default' }: { post: BlogPost; variant?: 'default' | 'compact' }) {
  if (variant === 'compact') {
    return (
      <article className="min-w-0 rounded-xl bg-card px-6 py-5 shadow-xs ring-1 ring-foreground/10">
        <div className="flex justify-between gap-6 max-sm:flex-col">
          <Link to="/blog/$slug" params={{ slug: post.slug }} className="block overflow-hidden rounded-lg sm:shrink-0">
            <BlogCover title={post.title} coverImage={post.cover} className="h-50 rounded-lg border-0 sm:size-30" />
          </Link>
          <div className="flex min-w-0 flex-1 flex-col justify-center gap-3.5">
            <h3 className="line-clamp-2 text-base font-medium">
              <Link to="/blog/$slug" params={{ slug: post.slug }} className="hover:text-primary">{post.title}</Link>
            </h3>
            <div className="text-sm text-muted-foreground">
              <PostDate date={post.date} />
            </div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="flex h-full min-w-0 flex-col gap-6 rounded-xl bg-card p-6 shadow-xs ring-1 ring-foreground/10">
      <Link to="/blog/$slug" params={{ slug: post.slug }} className="block overflow-hidden rounded-lg">
        <BlogCover title={post.title} description={post.description} coverImage={post.cover} className="h-65 rounded-lg border-0" />
      </Link>
      <div className="flex min-w-0 flex-1 flex-col">
        <h3 className="mb-2 line-clamp-2 text-xl font-medium">
          <Link to="/blog/$slug" params={{ slug: post.slug }} className="hover:text-primary">{post.title}</Link>
        </h3>
        {post.description ? <p className="mb-5 line-clamp-2 text-base text-muted-foreground">{post.description}</p> : null}
        <div className="mt-auto flex items-center justify-between gap-3">
          <div className="text-sm text-muted-foreground">
            <PostDate date={post.date} />
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link to="/blog/$slug" params={{ slug: post.slug }}>Read more</Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
