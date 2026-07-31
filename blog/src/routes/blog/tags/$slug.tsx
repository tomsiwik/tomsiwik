import { createFileRoute } from '@tanstack/react-router';

import { PostList } from '@/components/blog/post-list';
import { loadTag } from '@/lib/blog.functions';

export const Route = createFileRoute('/blog/tags/$slug')({
  loader: ({ params }) => loadTag({ data: params.slug }),
  head: ({ loaderData, params }) => ({
    meta: [{ title: `${loaderData?.tag.title ?? params.slug} | Tom Siwik` }],
  }),
  component: TagPage,
});

function TagPage() {
  const { posts, tag } = Route.useLoaderData();

  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-16">
      <header className="border-b pb-8">
        <p className="text-muted-foreground text-sm uppercase tracking-widest">Tag</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">{tag.title}</h1>
        <p className="text-muted-foreground mt-2">{posts.length} posts</p>
      </header>
      <div className="mt-8">
        <PostList posts={posts} />
      </div>
    </main>
  );
}
