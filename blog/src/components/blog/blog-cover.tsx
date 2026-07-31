import { withBasePath } from '@/lib/paths';
import { cn } from '@/lib/utils';

export function BlogCover({
  title,
  description,
  coverImage,
  className,
}: {
  title: string;
  description?: string;
  coverImage?: string;
  className?: string;
}) {
  if (coverImage) {
    return (
      <div className={cn('relative aspect-video w-full overflow-hidden', className)}>
        <img
          src={withBasePath(coverImage)}
          alt={title}
          className="absolute inset-0 size-full object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className={cn('relative aspect-video w-full overflow-hidden bg-muted/40', className)}
      aria-label={description ? `${title}: ${description}` : title}
    />
  );
}
