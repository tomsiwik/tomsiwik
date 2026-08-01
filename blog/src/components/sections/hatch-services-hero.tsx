'use client';

import { Check } from 'lucide-react';
import Image from '@/components/image';

import { cn } from '@/lib/utils';

type Project = {
  href: string;
  title: string;
  description: string;
  features: string[];
  iconSrc: string;
  invertInDark?: boolean;
};

const PROJECTS: Project[] = [
  {
    href: 'https://epicat.com',
    title: 'epicat.com',
    iconSrc: '/images/projects/epicat.svg',
    description: 'No-code agentic team builder.',
    features: ['AI agent teams', 'A2A protocol', 'Cloudflare Workers', 'TypeScript'],
    invertInDark: true,
  },
  {
    href: 'https://papercat.app',
    title: 'papercat.app',
    iconSrc: '/images/projects/papercat.svg',
    description: 'Make your work environment great again.',
    features: ['Remote team games', 'Ice breakers', 'Team activities', 'Browser-based'],
    invertInDark: true,
  },
  {
    href: 'https://dojocho.ai',
    title: 'dojocho.ai',
    iconSrc: '/images/projects/dojocho.svg',
    description: 'Installable coding practices (katas).',
    features: ['AI pairing', 'Coding katas', 'Installable packs', 'MIT licensed'],
  },
  {
    href: 'https://godmode.so',
    title: 'godmode.so',
    iconSrc: '/images/projects/godmode.svg',
    description: 'Agentic sandboxed Swiss army knife.',
    features: ['Command line', 'MCP', 'OpenAPI', 'MIT licensed'],
    invertInDark: true,
  },
  {
    href: 'https://nerdbooks.net',
    title: 'nerdbooks.net',
    iconSrc: '/images/projects/nerdbooks.svg',
    description: "Find the books you didn't know you needed.",
    features: ['Book discovery', 'Independent project', 'Open source', 'Beta'],
    invertInDark: true,
  },
];

function ProjectCard({ project }: { project: Project }) {
  return (
    <a
      href={project.href}
      target="_blank"
      rel="noreferrer"
      className={cn(
        'group flex flex-col rounded-2xl px-2 py-6 text-left outline-none sm:px-4 sm:py-8',
        'hover:bg-muted/50 transition-colors',
        'focus-visible:ring-ring focus-visible:ring-offset-background focus-visible:ring-2 focus-visible:ring-offset-2',
      )}
    >
      <div className="mb-5 flex items-center justify-start">
        <div
          className={cn(
            'inline-flex size-20 shrink-0 items-center justify-center rounded-full',
            'border-border bg-background border p-2 shadow-xs',
            'transition-colors',
          )}
          aria-hidden
        >
          <Image
            src={project.iconSrc}
            alt=""
            width={48}
            height={48}
            className={cn(
              'size-11 object-contain',
              project.invertInDark && 'dark:invert',
            )}
          />
        </div>
      </div>
      <h3 className="font-body text-xl font-semibold tracking-tight">
        {project.title}
      </h3>
      <p className="text-muted-foreground mt-3 text-sm leading-[1.6]">
        {project.description}
      </p>
      <ul className="mt-6 w-full space-y-3">
        {project.features.map((feature) => (
          <li
            key={feature}
            className="text-muted-foreground flex items-start gap-2.5 text-sm"
          >
            <Check className="text-hatch-cta mt-0.5 size-4 shrink-0" />
            <span className="min-w-0 leading-snug">{feature}</span>
          </li>
        ))}
      </ul>
    </a>
  );
}

export default function ServicesHero() {
  return (
    <section className="bg-background relative">
      <div className="section-padding relative container">
        <div className="mx-auto flex w-full flex-col items-start text-start">
          <h1 className="font-display text-3xl leading-[1.1] sm:text-4xl lg:text-5xl">
            Open-source projects
            <br />
            we&apos;re working on.
          </h1>
          <p className="text-muted-foreground mt-4 max-w-2xl text-base leading-[1.6]">
            Tools, experiments, and products we&apos;re building in the open.
          </p>
        </div>
        <div className="mx-auto mt-14 grid w-full items-stretch gap-6 sm:grid-cols-2 lg:mt-16">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
