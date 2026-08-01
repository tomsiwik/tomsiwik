import type * as React from 'react';

type BrandLogoProps = React.ComponentPropsWithoutRef<'svg'>;

export function BrandLogo({ className, ...props }: BrandLogoProps) {
  return (
    <svg
      viewBox="0 0 34 46"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <path
        fill="var(--primary)"
        d="M0 0h10v10H0zM12 0h10v10H12zM24 0h10v10H24zM12 12h10v10H12z"
      />
      <path
        fill="currentColor"
        d="M0 12h10v10H0zM24 12h10v10H24zM0 24h10v10H0zM12 24h10v10H12zM24 24h10v10H24zM0 36h10v10H0zM24 36h10v10H24z"
      />
      <path fill="#00c7f6" d="M12 36h10v10H12z" />
    </svg>
  );
}
