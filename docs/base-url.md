# Base URL (`NEXT_PUBLIC_BASE_URL`)

`sitemap.xml`, `robots.txt`, `metadataBase`, and social preview URLs are built from a single resolved origin:

1. **`NEXT_PUBLIC_BASE_URL`** if set (use the full origin you want indexed, e.g. `https://www.ptoq.io` or `https://something.ptoq.io`).
2. On Vercel **production** only, if unset: **`VERCEL_PROJECT_PRODUCTION_URL`**, then a last resort of **`https://www.ptoq.io`** (so production does not fall back to `*.vercel.app` for sitemap/OG).
3. Otherwise **`VERCEL_URL`** (preview deployments keep their preview host).
4. Local dev: `http://localhost:3000`.

**Subdomains** (`*.ptoq.io`): add the hostname in Vercel (or your DNS provider), assign it to the right project, and set **`NEXT_PUBLIC_BASE_URL`** on that project to the matching `https://…` origin. No extra code is required beyond this env var for each deployment.

See `.env.example`.
