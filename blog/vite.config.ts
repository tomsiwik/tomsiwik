import react from '@vitejs/plugin-react';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { fumadocsMdx } from 'fumadocs-mdx/vite';
import { nitro } from 'nitro/vite';

export default defineConfig({
  base: '/tomsiwik/',
  optimizeDeps: {
    include: ['use-sync-external-store/shim/with-selector'],
  },
  server: {
    port: 3000,
  },
  plugins: [
    fumadocsMdx(),
    tailwindcss(),
    tanstackStart({
      spa: {
        enabled: true,
        prerender: {
          enabled: true,
          crawlLinks: true,
          outputPath: '/_shell.html',
        },
      },

      pages: [
        {
          path: '/about',
        },
        {
          path: '/blog',
        },
        {
          path: '/blog/feed.xml',
        },
        {
          path: '/contact',
        },
        {
          path: '/services',
        },
        {
          path: '/work',
        },
      ],
    }),
    react(),
    // please see https://tanstack.com/start/latest/docs/framework/react/guide/hosting#nitro for guides on hosting
    nitro({
      baseURL: '/tomsiwik/',
    }),
  ],
  resolve: {
    tsconfigPaths: true,
    alias: {
      tslib: 'tslib/tslib.es6.js',
    },
  },
});
