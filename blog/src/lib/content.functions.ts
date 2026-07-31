import { createServerFn } from '@tanstack/react-start';
import { staticFunctionMiddleware } from '@tanstack/start-static-server-functions';

import { getProject, getProjects, getService } from './content';

export const loadProjects = createServerFn({ method: 'GET' })
  .middleware([staticFunctionMiddleware])
  .handler(() => getProjects());

export const loadProject = createServerFn({ method: 'GET' })
  .validator((slug: string) => slug)
  .middleware([staticFunctionMiddleware])
  .handler(({ data: slug }) => getProject(slug));

export const loadServicePage = createServerFn({ method: 'GET' })
  .validator((slug: string) => slug)
  .middleware([staticFunctionMiddleware])
  .handler(({ data: slug }) => ({
    projects: getProjects(),
    service: getService(slug),
  }));
