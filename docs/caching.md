# Delivery and caching

How the site reaches visitors, as observed on production (2026-10-22). Read this
before diagnosing "the deploy didn't take" or adding cache headers.

## Path

`www.ptoq.io` → **Cloudflare** (proxy; `server: cloudflare`, `cf-cache-status`)
→ **Vercel**. `ptoq.io` redirects (307) to `www`.

| What | Cache-Control seen | Cloudflare |
| --- | --- | --- |
| HTML (`/`, `/work`, …) | `public, max-age=0, must-revalidate` | `DYNAMIC` (not cached) |
| `/_next/static/immutable/chunks/*.css/js` | `public, max-age=31536000, immutable` | `HIT` |
| other `public/` files (`/work/*`, `/fonts/*`, `/pitches/*`) | `public, max-age=14400, must-revalidate` | `REVALIDATED` |

## Rules of thumb

- **CSS/JS chunks are content-named per build.** A local build emits a new
  chunk name whenever CSS changes. On 2026-10-22 a deploy (a0eec8b) still
  shipped the *previous* global CSS chunk, same name and old rules, next to
  the new HTML: the build had compiled stale CSS from the restored Vercel
  build cache (this is also what defd977 ran into). Since b3f4e6a,
  `npm run build` deletes `.next/cache` before `next build`, and the next
  deploy shipped the new chunk immediately. Keep that step.
- **After a CSS change, verify the chunk, not just the page.** curl the page,
  take the `.css` URL, and grep it for a rule you just added. If the name did
  not change, the deploy compiled stale CSS; edge caches are not the cause,
  because a new name is a new URL.
- **HTML is never cached at the edge**, so a deploy is visible on the next
  request.
- **Files in `public/` keep their URL when replaced**, so they are only cached
  for hours and revalidated. Anything that should be cached forever must carry
  a content hash in its name. Do not mark
  un-hashed `public/` paths `immutable`.
- Cloudflare sits in front of Vercel: a purge on Vercel alone does not purge
  Cloudflare. With the rules above no purge should be needed.
