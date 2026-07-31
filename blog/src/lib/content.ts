import { loader } from 'fumadocs-core/source';
import { pageSchema } from 'fumadocs-core/source/schema';
import { defineDocs } from 'fumadocs-mdx/macro';
import { z } from 'zod';

const projectSchema = pageSchema.extend({
  tagline: z.string().optional(),
  coverImage: z.string(),
  featured: z.boolean().default(false),
  order: z.number(),
  heroImage: z.string().optional(),
  liveUrl: z.string().optional(),
  roleLabel: z.string().optional(),
  roleValue: z.string().optional(),
  timelineLabel: z.string().optional(),
  timelineValue: z.string().optional(),
  servicesLabel: z.string().optional(),
  servicesValue: z.string().optional(),
  challengeTitle: z.string().optional(),
  challengeBody: z.string().optional(),
  solutionTitle: z.string().optional(),
  solutionBody: z.string().optional(),
  deliverables: z.array(z.string()).optional(),
  gallery: z.array(z.string()).optional(),
});

const serviceSchema = pageSchema.extend({
  price: z.string().optional(),
  priceMeta: z.string().optional(),
  primaryCtaLabel: z.string().optional(),
  primaryCtaHref: z.string().optional(),
  secondaryCtaLabel: z.string().optional(),
  secondaryCtaHref: z.string().optional(),
});

export const projectContent = defineDocs({
  dir: 'content/work',
  docs: { async: true, schema: projectSchema },
});

export const serviceContent = defineDocs({
  dir: 'content/services',
  docs: { async: true, schema: serviceSchema },
});

const projectSource = loader({
  source: projectContent.toFumadocsSource(),
  baseUrl: '/work',
});

const serviceSource = loader({
  source: serviceContent.toFumadocsSource(),
  baseUrl: '/services',
});

export function getProjects() {
  return projectSource
    .getPages()
    .map((page) => ({
      challengeBody: page.data.challengeBody,
      challengeTitle: page.data.challengeTitle,
      coverImage: page.data.coverImage,
      deliverables: page.data.deliverables,
      description: page.data.description ?? '',
      featured: page.data.featured,
      gallery: page.data.gallery,
      heroImage: page.data.heroImage,
      liveUrl: page.data.liveUrl,
      order: page.data.order,
      roleLabel: page.data.roleLabel,
      roleValue: page.data.roleValue,
      servicesLabel: page.data.servicesLabel,
      servicesValue: page.data.servicesValue,
      slug: page.slugs.join('/'),
      solutionBody: page.data.solutionBody,
      solutionTitle: page.data.solutionTitle,
      tagline: page.data.tagline,
      timelineLabel: page.data.timelineLabel,
      timelineValue: page.data.timelineValue,
      title: page.data.title,
    }))
    .sort((a, b) => a.order - b.order);
}

export type Project = ReturnType<typeof getProjects>[number];

export function getProject(slug: string) {
  return getProjects().find((project) => project.slug === slug);
}

export function getServices() {
  return serviceSource.getPages().map((page) => ({
    description: page.data.description ?? '',
    price: page.data.price,
    priceMeta: page.data.priceMeta,
    primaryCtaHref: page.data.primaryCtaHref,
    primaryCtaLabel: page.data.primaryCtaLabel,
    secondaryCtaHref: page.data.secondaryCtaHref,
    secondaryCtaLabel: page.data.secondaryCtaLabel,
    slug: page.slugs.join('/'),
    title: page.data.title,
  }));
}

export function getService(slug: string) {
  return getServices().find((service) => service.slug === slug);
}
