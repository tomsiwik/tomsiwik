'use client';

import { ArrowRight } from 'lucide-react';
import Image from '@/components/image';
import Link from '@/components/link';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { TextReveal } from '@/components/ui/text-reveal';

const AVATARS = [
  '/images/avatars/avatar-1.webp',
  '/images/avatars/avatar-2.webp',
  '/images/avatars/avatar-3.webp',
  '/images/avatars/avatar-4.webp',
];

const LOGOS = [
  { src: '/images/logos/bmw.webp', alt: 'BMW Group', width: 123, height: 18 },
  { src: '/images/logos/porsche.webp', alt: 'Porsche', width: 180, height: 12 },
  { src: '/images/logos/volvo.webp', alt: 'Volvo', width: 126, height: 20 },
  { src: '/images/logos/software-ag.webp', alt: 'Software AG', width: 113, height: 20 },
  { src: '/images/logos/santander.webp', alt: 'Santander', width: 99, height: 20 },
  {
    src: '/images/logos/british-airways.webp',
    alt: 'British Airways',
    width: 128,
    height: 20,
  },
];

type HatchHeroProps = {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  primaryCtaHref?: string;
  primaryCtaLabel?: string;
  secondaryCtaHref?: string;
  secondaryCtaLabel?: string;
};

export default function HatchHero({
  primaryCtaHref = '/contact',
  primaryCtaLabel = 'Working on',
  secondaryCtaHref = '/contact',
  secondaryCtaLabel = 'Shipped',
}: HatchHeroProps) {
  return (
    <section className="bg-background relative overflow-hidden">
      <div className="relative pt-16 pb-10 sm:pt-20 sm:pb-12 lg:pt-24 lg:pb-14">
        <div className="container text-start">
          <h1 className="font-display text-4xl leading-[1.06] font-medium text-balance sm:text-5xl lg:text-6xl lg:leading-[1.05]">
            I write about my journey
            <br />
            as a{' '}
            <span className="relative inline-block">
              developer
              <TextReveal
                as="span"
                text="& AI Engineer"
                hoverText="$ Vibecoder"
                textClassName="font-display-mono font-bold"
                hoverTextClassName="font-pixel font-normal"
                fontSize="3.25rem"
                className="font-display absolute left-full -bottom-[0.15em] z-10 font-semibold"
                style={{ transform: 'rotate(-2deg)' }}
                color="var(--primary)"
              />
            </span>
          </h1>
          <p className="font-text text-muted-foreground mt-6 text-base leading-[140%]">
            Freelanced as a{' '}
            <span className="text-foreground decoration-border font-medium underline decoration-dotted underline-offset-4">
              Senior Developer
            </span>
            {', helped startups, banks and the automotive industry craft sophisticated '}
            <span className="text-foreground decoration-border font-medium underline decoration-dotted underline-offset-4">
              platforms and software
            </span>
            {'.'}
            <br />
            {'Check it out:'}
          </p>
          <div className="mt-10 flex flex-col items-stretch justify-start gap-3 sm:flex-row sm:items-center sm:gap-4">
            <Button
              asChild
              variant="hatch"
              className="w-full min-w-0 sm:w-auto sm:min-w-[160px]"
              aria-label={primaryCtaLabel}
            >
              <Link href={primaryCtaHref}>
                {primaryCtaLabel}
                <ArrowRight className="ml-0.5" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="hover:bg-muted w-full min-w-0 sm:w-auto sm:min-w-[160px]"
            >
              <Link href={secondaryCtaHref}>{secondaryCtaLabel}</Link>
            </Button>
          </div>
          <div className="mt-16 flex max-w-full">
            <div className="bg-muted text-muted-foreground flex max-w-full flex-wrap items-center gap-3 rounded-full px-3 py-2 text-sm sm:px-4">
              <div className="flex shrink-0 -space-x-2">
                {AVATARS.map((src, index) => (
                  <div
                    key={src}
                    className="bg-muted relative h-7 w-7 overflow-hidden rounded-full"
                  >
                    <Image
                      src={src}
                      alt=""
                      fill
                      sizes="28px"
                      className="object-cover"
                      priority={index < 2}
                    />
                  </div>
                ))}
              </div>
              <span>The work that’s trusted by teams and founders</span>
            </div>
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-x-2 gap-y-4 sm:gap-x-8">
            {LOGOS.map((logo) => (
              <span
                key={logo.src}
                className="group inline-flex h-10 cursor-default items-center justify-center px-1.5"
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={logo.width}
                  height={logo.height}
                  className="object-contain grayscale opacity-65 transition-opacity duration-200 ease-out group-hover:opacity-90 dark:invert"
                />
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
