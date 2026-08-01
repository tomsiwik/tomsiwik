import { createFileRoute } from '@tanstack/react-router';

import HatchCta from '@/components/sections/hatch-cta';
import HatchWorkIndex from '@/components/sections/hatch-work-index';
import { loadProjects } from '@/lib/content.functions';

export const Route = createFileRoute('/work/')({
  loader: () => loadProjects(),
  component: WorkPage,
});

function WorkPage() {
  const projects = Route.useLoaderData();

  return (
    <main className="bg-background">
      <HatchWorkIndex projects={projects} initialCount={6} pageSize={6} />
      <HatchCta
        title="LinkedIn CV"
        ctaHref="https://www.linkedin.com/in/tomas-sivicki/"
        ctaLabel="LinkedIn"
      />
    </main>
  );
}
