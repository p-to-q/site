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
| `/work-derived/*` (preview derivatives) | `public, max-age=31536000, immutable` (next.config.js) | cached |
| other `public/` files (`/work/*`, `/fonts/*`, `/pitches/*`) | `public, max-age=14400, must-revalidate` | `REVALIDATED` |

## Rules of thumb

- **CSS/JS chunks are content-named.** Editing `app/global.css` (or any CSS)
  ships under a new chunk URL; the old URL is never reused. Verified by editing
  global.css and seeing the new rules in the live chunk immediately after the
  deploy. "Stale CSS after deploy" is therefore almost always a stale local
  `.next` dev build (`npm run clean`) or a browser cache, not the CDN.
- **HTML is never cached at the edge**, so a deploy is visible on the next
  request. To confirm a deploy, curl the page and look for the new markup or
  the new chunk name.
- **Files in `public/` keep their URL when replaced**, so they are only cached
  for hours and revalidated. Anything that should be cached forever must carry
  a content hash in its name (as `/work-derived/*` does). Do not mark
  un-hashed `public/` paths `immutable`.
- Cloudflare sits in front of Vercel: a purge on Vercel alone does not purge
  Cloudflare. With the rules above no purge should ever be needed.
