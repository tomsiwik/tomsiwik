import { createFileRoute } from '@tanstack/react-router';

import { getBlogPosts } from '@/lib/blog';

const siteUrl = 'https://tomhacks.com';

function escapeXml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

function buildFeed() {
  const items = getBlogPosts()
    .map((post) => {
      const url = `${siteUrl}${post.url}`;
      return `<item><title>${escapeXml(post.title)}</title><link>${url}</link><guid>${url}</guid><pubDate>${new Date(post.date).toUTCString()}</pubDate><description>${escapeXml(post.description ?? '')}</description><category>${escapeXml(post.category)}</category></item>`;
    })
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Tom Siwik Blog</title><link>${siteUrl}/blog</link><description>Notes, experiments, and projects by Tom Siwik.</description>${items}</channel></rss>`;
}

export const Route = createFileRoute('/blog/feed.xml')({
  server: {
    handlers: {
      GET: () =>
        new Response(buildFeed(), {
          headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
        }),
    },
  },
});
