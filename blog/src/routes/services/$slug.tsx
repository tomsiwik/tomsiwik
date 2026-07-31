import { createFileRoute, notFound } from '@tanstack/react-router';

import HatchCta from '@/components/sections/hatch-cta';
import HatchSelectedProjects from '@/components/sections/hatch-selected-projects';
import HatchServiceDetail from '@/components/sections/hatch-service-detail-hero';
import HatchWhatsIncluded from '@/components/sections/hatch-whats-included';
import { loadServicePage } from '@/lib/content.functions';

export const Route = createFileRoute('/services/$slug')({
  loader: async ({ params }) => {
    const data = await loadServicePage({ data: params.slug });
    if (!data.service) throw notFound();
    return { projects: data.projects, service: data.service };
  },
  component: ServiceDetailPage,
});

function ServiceDetailPage() {
  const { projects, service } = Route.useLoaderData();

  return (
    <>
      <HatchServiceDetail
        title={service.title}
        description={service.description}
        price={service.price}
        priceMeta={service.priceMeta}
        primaryCtaLabel={service.primaryCtaLabel}
        primaryCtaHref={service.primaryCtaHref}
        secondaryCtaLabel={service.secondaryCtaLabel}
        secondaryCtaHref={service.secondaryCtaHref}
      />
      <HatchWhatsIncluded hideHeader />
      <HatchSelectedProjects projects={projects} limit={3} hideHeader />
      <HatchCta />
    </>
  );
}
