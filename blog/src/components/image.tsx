import * as React from 'react';

import { withBasePath } from '@/lib/paths';

type ImageProps = Omit<React.ComponentPropsWithoutRef<'img'>, 'height' | 'src' | 'width'> & {
  fill?: boolean;
  height?: number | string;
  priority?: boolean;
  quality?: number;
  src: string | { src: string };
  width?: number | string;
};

const Image = React.forwardRef<HTMLImageElement, ImageProps>(function Image(
  { fill, height, priority, quality: _quality, src, style, width, ...props },
  ref,
) {
  const source = typeof src === 'string' ? src : src.src;

  return (
    <img
      ref={ref}
      src={withBasePath(source)}
      height={fill ? undefined : height}
      width={fill ? undefined : width}
      loading={priority ? 'eager' : props.loading}
      style={
        fill
          ? { height: '100%', inset: 0, position: 'absolute', width: '100%', ...style }
          : style
      }
      {...props}
    />
  );
});

export default Image;
