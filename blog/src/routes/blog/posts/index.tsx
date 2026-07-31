import { createFileRoute } from '@tanstack/react-router';

import { PostList } from '@/components/blog/post-list';
import { loadPosts } from '@/lib/blog.functions';

export const Route = createFileRoute('/blog/posts/')({
  loader: () => loadPosts(),
  head: () => ({
    meta: [
      { title: 'All posts | Tom Siwik' },
      { name: 'description', content: 'All notes, experiments, and projects by Tom Siwik.' },
    ],
    links: [{ rel: 'canonical', href: 'https://tomhacks.com/blog/posts' }],
  }),
  component: PostsPage,
});

function PostsPage() {
  const posts = Route.useLoaderData();

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 md:px-6 md:py-16">
      <header className="border-b pb-8">
        <h1 className="text-4xl font-bold">All posts</h1>
        <p className="text-muted-foreground mt-2">{posts.length} posts</p>
      </header>
      <div className="mt-8">
        <PostList posts={posts} />
      </div>
    </main>
  );
}
