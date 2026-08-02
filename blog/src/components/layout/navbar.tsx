'use client';

import Image from '@/components/image';
import Link from '@/components/link';
import { useLocation } from '@tanstack/react-router';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

import { ProfileAvatar } from '@/components/registry/profile-avatar';
import { withBasePath } from '@/lib/paths';
import { cn } from '@/lib/utils';

const HEADER_HEIGHT = 80;

const ITEMS = [
  { label: 'Blog', href: '/blog' },
  { label: 'Projects', href: '/work' },
  { label: 'Work', href: '/services' },
  { label: 'About', href: '/about' },
];

export default function Navbar() {
  const pathname = useLocation({ select: (location) => location.pathname });
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('overflow-hidden', isMenuOpen);
    return () => document.body.classList.remove('overflow-hidden');
  }, [isMenuOpen]);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const closeOnDesktop = () => {
      if (mq.matches) setIsMenuOpen(false);
    };
    mq.addEventListener('change', closeOnDesktop);
    return () => mq.removeEventListener('change', closeOnDesktop);
  }, []);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [panelHeight, setPanelHeight] = useState<number | 'auto'>(0);
  const [minOpenHeight, setMinOpenHeight] = useState<number>(0);

  useLayoutEffect(() => {
    const wrapper = wrapperRef.current;
    const content = contentRef.current;
    if (!wrapper || !content) return;

    const viewportRemainder = Math.max(0, window.innerHeight - HEADER_HEIGHT);

    const onEnd = () => {
      if (isMenuOpen) setPanelHeight('auto');
      wrapper.removeEventListener('transitionend', onEnd);
    };

    queueMicrotask(() => {
      setMinOpenHeight(viewportRemainder);

      if (isMenuOpen) {
        const target = Math.max(content.scrollHeight, viewportRemainder);
        setPanelHeight(target);
        wrapper.addEventListener('transitionend', onEnd);
      } else {
        const current = wrapper.getBoundingClientRect().height || 0;
        setPanelHeight(current);
        requestAnimationFrame(() => setPanelHeight(0));
      }
    });
  }, [isMenuOpen, pathname]);

  useEffect(() => {
    const onResize = () => {
      if (!isMenuOpen || !contentRef.current) return;
      const viewportRemainder = Math.max(0, window.innerHeight - HEADER_HEIGHT);
      queueMicrotask(() => {
        setMinOpenHeight(viewportRemainder);
        if (panelHeight !== 'auto') {
          const target = Math.max(
            contentRef.current!.scrollHeight,
            viewportRemainder,
          );
          setPanelHeight(target);
        }
      });
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [isMenuOpen, panelHeight]);

  return (
    <header className="relative z-50">
      <div className="bg-background/70 backdrop-blur">
        <div className="relative container flex h-20 items-center justify-between gap-2 sm:gap-3">
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2"
            aria-label="Tom Hacks home"
          >
            <Image
              src="/images/brand/tomhacks-matrix-logo.svg"
              alt="Tom Hacks"
              width={55}
              height={20}
              priority
            />
          </Link>

          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 lg:flex">
            {ITEMS.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={cn(
                    'text-base transition-colors',
                    active
                      ? 'text-foreground'
                      : 'text-muted-foreground hover:text-foreground',
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex min-w-0 items-center justify-end gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <span className="min-w-0 text-right">
                <span className="block truncate text-sm font-semibold">Tom Siwik</span>
                <a
                  href="https://x.com/tomhacks"
                  target="_blank"
                  rel="noreferrer"
                  className="font-sans block truncate text-sm text-muted-foreground/60 transition-colors hover:text-foreground"
                >
                  x.com/tomhacks
                </a>
              </span>
              <ProfileAvatar
                src={withBasePath('/images/brand/tom-siwik.jpg')}
                name="Tom Siwik"
              />
            </div>
            <button
              type="button"
              className={cn(
                'lg:hidden',
                'bg-background inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[4px] shadow-xs',
                'text-muted-foreground hover:text-foreground transition-colors',
              )}
              onClick={() => setIsMenuOpen((v) => !v)}
              aria-expanded={isMenuOpen}
              aria-label="Toggle main menu"
            >
              <span className="sr-only">Toggle main menu</span>
              <div className="relative h-4 w-[18px]">
                <span
                  aria-hidden="true"
                  className={cn(
                    'absolute top-0 left-0 block h-0.5 w-full rounded-full bg-current transition duration-300 ease-in-out',
                    isMenuOpen ? 'translate-y-[7px] rotate-45' : '',
                  )}
                />
                <span
                  aria-hidden="true"
                  className={cn(
                    'absolute top-[7px] left-0 block h-0.5 w-full rounded-full bg-current transition duration-300 ease-in-out',
                    isMenuOpen ? 'opacity-0' : 'opacity-100',
                  )}
                />
                <span
                  aria-hidden="true"
                  className={cn(
                    'absolute top-[14px] left-0 block h-0.5 w-full rounded-full bg-current transition duration-300 ease-in-out',
                    isMenuOpen ? 'top-[7px] -rotate-45' : '',
                  )}
                />
              </div>
            </button>
          </div>
        </div>
      </div>
      <div className="lg:hidden">
        <div
          ref={wrapperRef}
          style={{
            height: panelHeight === 'auto' ? 'auto' : panelHeight,
            minHeight: isMenuOpen ? `${minOpenHeight}px` : undefined,
            transition: 'height 320ms cubic-bezier(.22,.61,.36,1)',
          }}
          className={cn(
            'bg-background overflow-hidden',
            'relative right-1/2 left-1/2 -mr-[50vw] -ml-[50vw] w-screen',
          )}
          aria-hidden={!isMenuOpen}
        >
          <div
            ref={contentRef}
            className="max-h-[calc(100vh-80px)] overflow-auto"
            inert={!isMenuOpen ? true : undefined}
          >
            <div className="container">
              <div
                className={cn(
                  'pt-6 pb-8 transition-[transform,opacity] duration-300',
                  isMenuOpen
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-2 opacity-0',
                )}
              >
                <nav className="flex flex-col gap-6">
                  {ITEMS.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className={cn(
                        'text-lg tracking-[-0.02em]',
                        pathname === link.href
                          ? 'text-foreground'
                          : 'text-muted-foreground',
                      )}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
