'use client';

import { ArrowRight } from 'lucide-react';
import Image from '@/components/image';
import Link from '@/components/link';
import * as React from 'react';

import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { TextReveal } from '@/components/ui/text-reveal';

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
                hoverText="& Vibecoder"
                className="font-display absolute left-full -bottom-[0.15em] z-10 -rotate-3 font-semibold"
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
            {' - my work speaks for itself:'}
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
          <div className="mt-7 flex items-start justify-start sm:mt-8">
            <div className="bg-muted text-muted-foreground flex min-h-10 items-center gap-3 rounded-full py-1 pr-5 pl-2 text-sm">
              <Avatar className="bg-muted relative size-7 border-2 border-white">
                <Image src="/images/brand/tom-siwik.jpg" alt="Tom Siwik" fill sizes="28px" className="object-cover" priority />
              </Avatar>
              <span className="leading-snug">
                Current project epicat.com
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
