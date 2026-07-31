import { createFileRoute } from '@tanstack/react-router';

import HatchCta from '@/components/sections/hatch-cta';
import HatchHero from '@/components/sections/hatch-hero';
import HatchPricing from '@/components/sections/hatch-pricing';
import HatchSelectedProjects from '@/components/sections/hatch-selected-projects';
import HatchWhatICanDo from '@/components/sections/hatch-what-i-can-do';
import { loadProjects } from '@/lib/content.functions';

export const Route = createFileRoute('/')({
  loader: () => loadProjects(),
  component: Home,
});

function Home() {
  const projects = Route.useLoaderData();

  return (
    <>
      <HatchHero />
      <HatchSelectedProjects projects={projects} limit={6} hideHeader />
      <HatchWhatICanDo hideHeader />
      <HatchPricing hideHeader />
      <HatchCta />
    </>
  );
}
