import { createFileRoute, Link } from '@tanstack/react-router';
import { Tag } from 'lucide-react';

import { loadTags } from '@/lib/blog.functions';

export const Route = createFileRoute('/blog/tags/')({
  loader: () => loadTags(),
  head: () => ({
    meta: [
      { title: 'Blog tags | Tom Siwik' },
      { name: 'description', content: 'Browse blog posts by tag.' },
    ],
  }),
  component: TagsPage,
});

function TagsPage() {
  const tags = Route.useLoaderData();

  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-16">
      <header className="border-b pb-8">
        <h1 className="text-4xl font-semibold tracking-tight">Tags</h1>
        <p className="text-muted-foreground mt-2">Browse posts by tag.</p>
      </header>
      <div className="mt-8 flex flex-wrap gap-3">
        {tags.map((tag) => (
          <Link
            key={tag.slug}
            to="/blog/tags/$slug"
            params={{ slug: tag.slug }}
            className="bg-secondary/50 hover:bg-accent inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors"
          >
            <Tag className="size-4" />
            {tag.title}
            <span className="text-muted-foreground text-xs">{tag.count}</span>
          </Link>
        ))}
      </div>
    </main>
  );
}
