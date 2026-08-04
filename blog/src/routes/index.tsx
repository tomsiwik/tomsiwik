import { createFileRoute } from '@tanstack/react-router';

import { PostCard } from '@/components/blog/post-card';
import HatchCta from '@/components/sections/hatch-cta';
import HatchHero from '@/components/sections/hatch-hero';
import HatchSelectedProjects from '@/components/sections/hatch-selected-projects';
import { HatchSectionHeader } from '@/components/sections/hatch-section-header';
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
      <HatchSelectedProjects
        projects={projects}
        limit={6}
        title="What I've worked on"
        description=""
      />
      <HatchWhatICanDo
        title="What I'm currently working on"
        description=""
      />
      <section className="bg-background">
        <div className="section-padding container">
          <HatchSectionHeader title="What I'm writing about" />
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:mt-10">
            {posts.slice(0, 2).map((post) => (
              <PostCard key={post.path} post={post} boxed />
            ))}
          </div>
        </div>
      </section>
      <HatchCta
        title="Want to read more?"
        titleClassName="text-3xl sm:text-4xl lg:text-5xl"
        ctaHref="/blog"
        ctaLabel="Read the blog"
      />
    </>
  );
}
