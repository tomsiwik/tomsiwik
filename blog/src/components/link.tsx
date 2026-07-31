import * as React from 'react';

import { withBasePath } from '@/lib/paths';

type LinkProps = Omit<React.ComponentPropsWithoutRef<'a'>, 'href'> & {
  href: string;
};

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { href, ...props },
  ref,
) {
  return <a ref={ref} href={withBasePath(href)} {...props} />;
});

export default Link;
