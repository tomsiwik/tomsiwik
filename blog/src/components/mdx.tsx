import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { lazy, Suspense } from 'react';

const LazyInteractiveExample = lazy(() => import('@/components/blog/interactive-example'));

function InteractiveExample(props: { initialCount?: number }) {
  return (
    <Suspense fallback={<div className="my-6 h-32 animate-pulse rounded-xl bg-muted" aria-label="Loading interactive example" />}>
      <LazyInteractiveExample {...props} />
    </Suspense>
  );
}

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    InteractiveExample,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
