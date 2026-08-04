import { createFileRoute } from '@tanstack/react-router';

import HatchCta from '@/components/sections/hatch-cta';
import ServicesHero from '@/components/sections/hatch-services-hero';

export const Route = createFileRoute('/projects/')({
  component: ProjectsPage,
});

function ProjectsPage() {
  return (
    <>
      <ServicesHero />
      <HatchCta />
    </>
  );
}
