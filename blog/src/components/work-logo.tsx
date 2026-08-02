import Image from '@/components/image';
import { cn } from '@/lib/utils';

const WORK_LOGOS: Record<
  string,
  { src: string; width: number; height: number; tone: 'dark' | 'light' }
> = {
  cove: { src: '/images/logos/british-airways.webp', width: 819, height: 128, tone: 'light' },
  epoch: { src: '/images/logos/bmw-group.webp', width: 540, height: 128, tone: 'light' },
  pace: { src: '/images/logos/porsche-wordmark.webp', width: 1920, height: 128, tone: 'light' },
  pitch: { src: '/images/logos/commerzbank.webp', width: 1044, height: 128, tone: 'dark' },
  ripple: { src: '/images/logos/volvo.webp', width: 806, height: 128, tone: 'dark' },
  veil: { src: '/images/logos/santander.webp', width: 637, height: 128, tone: 'light' },
};

export function WorkLogo({ slug, variant }: { slug: string; variant: 'card' | 'hero' }) {
  const logo = WORK_LOGOS[slug];
  if (!logo) return null;

  return (
    <div
      className={cn(
        'pointer-events-none absolute inset-0 z-10 flex items-center justify-center',
        variant === 'card' && 'transition-opacity duration-200 group-hover:opacity-0',
      )}
      aria-hidden
    >
      <Image
        src={logo.src}
        alt=""
        width={logo.width}
        height={logo.height}
        className={cn(
          'w-auto object-contain opacity-95',
          variant === 'card' ? 'h-10 max-w-[58%]' : 'h-7 max-w-[18%]',
          logo.tone === 'light'
            ? 'brightness-0 invert drop-shadow-[0_1px_8px_rgb(0_0_0/0.28)]'
            : 'brightness-0 drop-shadow-[0_1px_8px_rgb(255_255_255/0.18)]',
        )}
      />
    </div>
  );
}
