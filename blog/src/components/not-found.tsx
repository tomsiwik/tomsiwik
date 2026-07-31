import { Link } from '@tanstack/react-router';

export function NotFound() {
  return (
    <main className="mx-auto flex min-h-[50vh] max-w-xl flex-col items-center justify-center px-6 text-center">
      <p className="text-muted-foreground text-sm uppercase tracking-widest">404</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight">Page not found</h1>
      <p className="text-muted-foreground mt-4">The page you requested does not exist.</p>
      <Link to="/" className="mt-8 underline underline-offset-4">Return home</Link>
    </main>
  );
}
