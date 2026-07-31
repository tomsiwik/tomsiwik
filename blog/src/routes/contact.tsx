import { createFileRoute } from '@tanstack/react-router';

import HatchContact from '@/components/sections/hatch-contact';
import HatchCta from '@/components/sections/hatch-cta';

export const Route = createFileRoute('/contact')({
  component: ContactPage,
});

function ContactPage() {
  return (
    <>
      <HatchContact />
      <HatchCta />
    </>
  );
}
