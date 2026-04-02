/**
 * Cloudflare Worker for BotSpace Dashboard
 * Canonical public route: /bot
 */

const CANONICAL_PREFIX = '/bot';
const LEGACY_PREFIX = '/botspace';

function isRoute(pathname, prefix) {
  return pathname === prefix || pathname === `${prefix}/`;
}

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const { pathname } = url;

    // Redirect legacy /botspace path to canonical /bot
    if (isRoute(pathname, LEGACY_PREFIX)) {
      return Response.redirect(`${url.origin}${CANONICAL_PREFIX}`, 301);
    }

    // Route /bot to the dashboard entrypoint
    if (isRoute(pathname, CANONICAL_PREFIX)) {
      return new Response(
        await fetch(new Request(new URL('/index.html', url), request)),
        {
          headers: {
            'Content-Type': 'text/html; charset=utf-8',
            'Cache-Control': 'public, max-age=3600',
          },
        }
      );
    }

    // Serve static assets under canonical route
    if (pathname.startsWith(`${CANONICAL_PREFIX}/`)) {
      const assetPath = pathname.replace(CANONICAL_PREFIX, '') || '/';
      const assetUrl = new URL(assetPath, url);
      return fetch(new Request(assetUrl, request));
    }

    // Redirect legacy assets and nested paths from /botspace/* to /bot/*
    if (pathname.startsWith(`${LEGACY_PREFIX}/`)) {
      const redirectedPath = pathname.replace(LEGACY_PREFIX, CANONICAL_PREFIX);
      return Response.redirect(`${url.origin}${redirectedPath}${url.search}`, 301);
    }

    return new Response('Not Found', { status: 404 });
  },
};
