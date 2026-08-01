import { createRootRoute, HeadContent, Outlet, Scripts } from '@tanstack/react-router';
import * as React from 'react';
import { MotionConfig } from 'framer-motion';
import appCss from '@/styles/app.css?url';
import { RootProvider } from 'fumadocs-ui/provider/tanstack';
import { Footer } from '@/components/layout/footer';
import Navbar from '@/components/layout/navbar';

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'Tom Siwik | tomhacks.com',
      },
      {
        name: 'description',
        content:
          'Tom Siwik writes about design, development, accessibility, and building better digital products.',
      },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'icon', href: '/tomsiwik/favicon/favicon.ico' },
    ],
  }),
  component: RootComponent,
});

function RootComponent() {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="min-h-screen antialiased">
        <RootProvider
          theme={{ defaultTheme: 'light', enableSystem: true, disableTransitionOnChange: true }}
        >
          <MotionConfig reducedMotion="user">
            <div className="flex min-h-screen flex-col">
              <Navbar />
              <main className="w-full flex-1">
                <Outlet />
              </main>
              <Footer />
            </div>
          </MotionConfig>
        </RootProvider>
        <Scripts />
      </body>
    </html>
  );
}
