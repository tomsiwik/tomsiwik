import { createFileRoute } from '@tanstack/react-router';

import { PostCard } from '@/components/blog/post-card';
import HatchCta from '@/components/sections/hatch-cta';
import HatchHero from '@/components/sections/hatch-hero';
import HatchSelectedProjects from '@/components/sections/hatch-selected-projects';
import HatchWhatICanDo from '@/components/sections/hatch-what-i-can-do';
import { loadPosts } from '@/lib/blog.functions';
import { loadProjects } from '@/lib/content.functions';

export const Route = createFileRoute('/')({
  loader: async () => {
    const [projects, posts] = await Promise.all([loadProjects(), loadPosts()]);
    return { posts, projects };
  },
  component: Home,
});

function Home() {
  const { posts, projects } = Route.useLoaderData();

  return (
    <>
      <HatchHero />
      <HatchSelectedProjects projects={projects} limit={6} hideHeader />
      <HatchWhatICanDo hideHeader />
      <section className="bg-background">
        <div className="section-padding container">
          <div className="grid gap-6 sm:grid-cols-2">
            {posts.slice(0, 2).map((post) => (
              <PostCard key={post.path} post={post} />
            ))}
          </div>
        </div>
      </section>
      <HatchCta />
    </>
  );
}
