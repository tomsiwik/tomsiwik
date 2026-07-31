import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import {
  Children,
  cloneElement,
  isValidElement,
  lazy,
  type ComponentProps,
  Suspense,
} from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  type TableRowProps,
} from '@/components/ui/table';

const LazyInteractiveExample = lazy(() => import('@/components/blog/interactive-example'));

function InteractiveExample(props: { initialCount?: number }) {
  return (
    <Suspense fallback={<div className="my-6 h-32 animate-pulse rounded-xl bg-muted" aria-label="Loading interactive example" />}>
      <LazyInteractiveExample {...props} />
    </Suspense>
  );
}

function MdxTable(props: ComponentProps<typeof Table>) {
  return (
    <div className="my-6 max-w-full overflow-x-auto rounded-[4px] border">
      <Table {...props} />
    </div>
  );
}

function MdxTableBody({ children, ...props }: ComponentProps<typeof TableBody>) {
  return (
    <TableBody {...props}>
      {Children.map(children, (child, index) =>
        isValidElement<TableRowProps>(child) ? cloneElement(child, { index }) : child,
      )}
    </TableBody>
  );
}

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    InteractiveExample,
    table: MdxTable,
    thead: TableHeader,
    tbody: MdxTableBody,
    tr: TableRow,
    th: TableHead,
    td: TableCell,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
