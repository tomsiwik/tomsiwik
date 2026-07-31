import { createFileRoute, Link } from '@tanstack/react-router';
import { FolderOpen } from 'lucide-react';

import { loadCategories } from '@/lib/blog.functions';

export const Route = createFileRoute('/blog/categories/')({
  loader: () => loadCategories(),
  head: () => ({
    meta: [
      { title: 'Blog categories | Tom Siwik' },
      { name: 'description', content: 'Browse blog posts by category.' },
    ],
  }),
  component: CategoriesPage,
});

function CategoriesPage() {
  const categories = Route.useLoaderData();

  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-16">
      <header className="border-b pb-8">
        <h1 className="text-4xl font-semibold tracking-tight">Categories</h1>
        <p className="text-muted-foreground mt-2">Browse posts by category.</p>
      </header>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <Link
            key={category.slug}
            to="/blog/categories/$slug"
            params={{ slug: category.slug }}
            className="hover:bg-accent flex items-center gap-4 rounded-xl border p-6 transition-colors"
          >
            <FolderOpen className="size-6" />
            <span>
              <strong className="block">{category.title}</strong>
              <span className="text-muted-foreground text-sm">{category.count} posts</span>
            </span>
          </Link>
        ))}
      </div>
    </main>
  );
}
