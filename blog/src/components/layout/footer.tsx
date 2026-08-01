import Image from '@/components/image';
import Link from '@/components/link';

import { HatchRadialSvgPattern } from '@/components/hatch-radial-svg-pattern';
import { ThemeToggle } from '@/components/ui/theme-toggle';

type FooterProps = {
  name?: string;
  socials?: {
    href: string;
    label: string;
    iconSrc: string;
  }[];
};

export function Footer({
  name = 'Tom Siwik',
  socials = [],
}: FooterProps) {
  return (
    <footer className="bg-background border-hatch-cta relative overflow-hidden border-b-4">
      <HatchRadialSvgPattern />
      <div className="relative z-10 container py-7 md:px-0">
        <div className="flex flex-col-reverse items-start justify-between gap-4 sm:flex-row sm:items-center">
          <p className="font-jersey text-muted-foreground text-base">
            © {new Date().getFullYear()} {name}. All rights reserved.{' '}
            <a href="https://tomhacks.com" className="hover:text-foreground underline underline-offset-4">tomhacks.com</a>
          </p>

          <div className="flex items-center gap-3">
            {socials.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                aria-label={s.label}
                className="text-muted-foreground hover:text-foreground transition-colors"
                target="_blank"
                rel="noreferrer"
              >
                <span className="sr-only">{s.label}</span>
                <Image
                  src={s.iconSrc}
                  alt=""
                  width={18}
                  height={18}
                  className="opacity-80 transition-opacity hover:opacity-100"
                />
              </Link>
            ))}
            <ThemeToggle />
          </div>
        </div>
      </div>
    </footer>
  );
}
