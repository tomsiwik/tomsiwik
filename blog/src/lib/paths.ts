export function withBasePath(path: string) {
  if (!path.startsWith('/') || path.startsWith('//')) return path;

  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}${path}`;
}
