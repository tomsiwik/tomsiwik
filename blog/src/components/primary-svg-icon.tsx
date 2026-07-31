import { cn } from '@/lib/utils';
import { withBasePath } from '@/lib/paths';

type PrimarySvgIconProps = {
  /** Public path, e.g. `/images/services/noun-star-7745963.svg` */
  src: string;
  className?: string;
};

/**
 * Renders a public SVG as a silhouette filled with theme `primary` (`--primary`)
 * using CSS mask, so color follows light/dark tokens.
 */
export function PrimarySvgIcon({ src, className }: PrimarySvgIconProps) {
  const url = withBasePath(src);

  return (
    <span
      className={cn('bg-primary inline-block shrink-0', className)}
      style={{
        WebkitMaskImage: `url(${url})`,
        WebkitMaskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center',
        WebkitMaskSize: 'contain',
        maskImage: `url(${url})`,
        maskRepeat: 'no-repeat',
        maskPosition: 'center',
        maskSize: 'contain',
      }}
      aria-hidden
    />
  );
}
