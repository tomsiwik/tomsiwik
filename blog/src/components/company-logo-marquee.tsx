import Image from '@/components/image';

import { cn } from '@/lib/utils';

const LOGOS: Array<{
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}> = [
  {
    src: '/images/logos/bmw-group.webp',
    alt: 'BMW Group',
    width: 150,
    height: 18,
  },
  {
    src: '/images/logos/porsche-wordmark.webp',
    alt: 'Porsche',
    width: 165,
    height: 11,
  },
  { src: '/images/logos/volvo.webp', alt: 'Volvo', width: 126, height: 20 },
  {
    src: '/images/logos/software-ag.webp',
    alt: 'Software AG',
    width: 136,
    height: 24,
  },
  {
    src: '/images/logos/santander.webp',
    alt: 'Santander',
    width: 125,
    height: 25,
  },
  {
    src: '/images/logos/british-airways.webp',
    alt: 'British Airways',
    width: 141,
    height: 22,
    className: '-translate-y-0.5',
  },
  {
    src: '/images/logos/commerzbank.webp',
    alt: 'Commerzbank',
    width: 147,
    height: 18,
  },
];

type CompanyLogoMarqueeProps = {
  className?: string;
};

export function CompanyLogoMarquee({ className }: CompanyLogoMarqueeProps) {
  return (
    <div
      className={cn(
        'group relative flex w-full overflow-hidden [--duration:28s] [--gap:2.5rem] gap-[var(--gap)]',
        className,
      )}
    >
      {[0, 1].map((copy) => (
        <div
          key={copy}
          aria-hidden={copy === 1 ? true : undefined}
          className="flex min-w-full shrink-0 animate-marquee items-center justify-around gap-[var(--gap)] group-hover:[animation-play-state:paused]"
        >
          {LOGOS.map((logo) => (
            <span
              key={`${copy}-${logo.src}`}
              className="flex h-10 shrink-0 cursor-default items-center justify-center"
            >
              <Image
                src={logo.src}
                alt={copy === 0 ? logo.alt : ''}
                width={logo.width}
                height={logo.height}
                className={cn(
                  'object-contain grayscale opacity-65 transition-opacity duration-200 ease-out hover:opacity-90 dark:invert',
                  logo.className,
                )}
              />
            </span>
          ))}
        </div>
      ))}

      <div className="from-background pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r to-transparent sm:w-20" />
      <div className="from-background pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l to-transparent sm:w-20" />
    </div>
  );
}
