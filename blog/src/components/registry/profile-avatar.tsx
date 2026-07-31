import type { ComponentProps } from 'react';

export function ProfileAvatar({
  name,
  status = 'Available for selected projects',
  ...props
}: ComponentProps<'img'> & { name: string; status?: string }) {
  return (
    <span className="relative inline-flex size-12 shrink-0" title={`${name} — ${status}`}>
      <img
        {...props}
        alt={props.alt ?? name}
        className="size-full rounded-full border-2 border-background object-cover shadow-sm ring-1 ring-border"
      />
      <span
        aria-label={status}
        className="absolute right-0 bottom-0 size-3.5 rounded-full border-2 border-background bg-emerald-500"
      />
    </span>
  );
}
