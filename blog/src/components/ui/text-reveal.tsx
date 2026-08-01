'use client';

import React, {
  useMemo,
  useState,
  type CSSProperties,
  type ElementType,
} from 'react';

import { cn } from '@/lib/utils';

export interface TextRevealProps {
  text: string;
  hoverText?: string;
  as?: ElementType;
  href?: string;
  target?: string;
  className?: string;
  textClassName?: string;
  hoverTextClassName?: string;
  style?: CSSProperties;
  fontSize?: string;
  staggerDelay?: number;
  duration?: number;
  easing?: string;
  color?: string;
  hoverColor?: string;
  backgroundColor?: string;
  hoverBackgroundColor?: string;
  direction?: 'up' | 'down';
  onClick?: (event: React.MouseEvent) => void;
}

function segment(text: string) {
  if (typeof Intl !== 'undefined' && Intl.Segmenter) {
    const segmenter = new Intl.Segmenter('en', { granularity: 'grapheme' });
    return Array.from(segmenter.segment(text), ({ segment }) => segment);
  }

  return [...text];
}

const hiddenRowOffset = 1.35;

const TextReveal = React.memo(function TextReveal({
  text,
  hoverText = text,
  as: Component = 'a',
  href,
  target,
  className = '',
  textClassName = '',
  hoverTextClassName = '',
  style,
  fontSize = '3rem',
  staggerDelay = 25,
  duration = 250,
  easing = 'ease-in-out',
  color = 'inherit',
  hoverColor = '#000',
  backgroundColor = 'transparent',
  hoverBackgroundColor = 'oklch(76% 0.1596 220)',
  direction = 'up',
  onClick,
}: TextRevealProps) {
  const [hovered, setHovered] = useState(false);
  const chars = useMemo(() => segment(text), [text]);
  const hoverChars = useMemo(() => segment(hoverText), [hoverText]);
  const sign = direction === 'up' ? 1 : -1;

  const rootProps: Record<string, unknown> = {
    className: cn(
      'relative inline-block cursor-pointer select-none overflow-hidden whitespace-nowrap no-underline',
      className,
    ),
    style: {
      fontSize,
      color,
      backgroundColor,
      padding: '0.15em 0.4em',
      lineHeight: 1,
      ...style,
    },
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
    onFocus: () => setHovered(true),
    onBlur: () => setHovered(false),
    onClick,
    'aria-label': text,
    'data-hovered': hovered ? 'true' : 'false',
  };

  if (Component === 'a') {
    rootProps.href = href ?? '#';
    if (target) rootProps.target = target;
    if (target === '_blank') rootProps.rel = 'noopener noreferrer';
  }

  const rowStyle: CSSProperties = {
    gridArea: '1 / 1',
    height: '1.12em',
  };

  return (
    <Component {...rootProps}>
      <span className="relative inline-grid overflow-hidden" aria-hidden="true">
        <span
          className={cn('inline-flex', textClassName)}
          style={{ ...rowStyle, color }}
        >
          {chars.map((char, index) => (
            <span
              key={`${char}-${index}`}
              className="inline-block will-change-transform"
              style={{
                transition: `transform ${duration}ms ${easing}`,
                transitionDelay: `${index * staggerDelay}ms`,
                transform: hovered
                  ? `translateY(${-sign * hiddenRowOffset}em)`
                  : 'translateY(0)',
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </span>
        <span
          className={cn('inline-flex', hoverTextClassName)}
          style={{ ...rowStyle, color: hoverColor }}
        >
          {hoverChars.map((char, index) => (
            <span
              key={`${char}-${index}`}
              className="inline-block will-change-transform"
              style={{
                backgroundColor:
                  char === ' ' ? 'transparent' : hoverBackgroundColor,
                marginInline: char === ' ' ? 0 : '0.015em',
                paddingInline: char === ' ' ? 0 : '0.05em',
                transition: `transform ${duration}ms ${easing}`,
                transitionDelay: `${index * staggerDelay}ms`,
                transform: hovered
                  ? 'translateY(0)'
                  : `translateY(${sign * hiddenRowOffset}em)`,
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </span>
      </span>
    </Component>
  );
});

TextReveal.displayName = 'TextReveal';

export { TextReveal };
