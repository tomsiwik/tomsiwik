import { createFileRoute } from '@tanstack/react-router';

import { PostList } from '@/components/blog/post-list';
import { loadCategory } from '@/lib/blog.functions';

export const Route = createFileRoute('/blog/categories/$slug')({
  loader: ({ params }) => loadCategory({ data: params.slug }),
  head: ({ loaderData, params }) => ({
    meta: [{ title: `${loaderData?.category.title ?? params.slug} | Tom Siwik` }],
  }),
  component: CategoryPage,
});

function CategoryPage() {
  const { category, posts } = Route.useLoaderData();

  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-16">
      <header className="border-b pb-8">
        <p className="text-muted-foreground text-sm uppercase tracking-widest">Category</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">{category.title}</h1>
        <p className="text-muted-foreground mt-2">{posts.length} posts</p>
      </header>
      <div className="mt-8">
        <PostList posts={posts} />
      </div>
    </main>
  );
}
