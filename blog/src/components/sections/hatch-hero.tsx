'use client';

import { ArrowRight } from 'lucide-react';
import Image from '@/components/image';
import Link from '@/components/link';
import * as React from 'react';

import { CompanyLogoMarquee } from '@/components/company-logo-marquee';
import { Button } from '@/components/ui/button';
import { TextReveal } from '@/components/ui/text-reveal';

const AVATARS = [
  '/images/avatars/avatar-6.webp',
  '/images/avatars/avatar-1.webp',
  '/images/avatars/avatar-2.webp',
  '/images/avatars/avatar-3.webp',
  '/images/avatars/avatar-4.webp',
  '/images/avatars/avatar-5.webp',
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
              <span>
                I&apos;ve made awesome{' '}
                <a
                  href="https://www.linkedin.com/in/tomas-sivicki/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground decoration-border font-bold underline decoration-dotted underline-offset-4"
                >
                  connections with people
                </a>
                {' '}everywhere
              </span>
            </div>
          </div>

          <CompanyLogoMarquee className="mt-7" />
        </div>
      </div>
    </section>
  );
}
