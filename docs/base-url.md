# Base URL (`NEXT_PUBLIC_BASE_URL`)

`sitemap.xml`, `robots.txt`, `metadataBase`, and social preview URLs are built from a single resolved origin:

1. **`NEXT_PUBLIC_BASE_URL`** if set (use the full origin you want indexed, e.g. `https://www.ptoq.io` or `https://something.ptoq.io`).
2. On Vercel **production** only, if unset: **`VERCEL_PROJECT_PRODUCTION_URL`**, then a last resort of **`https://www.ptoq.io`** (so production does not fall back to `*.vercel.app` for sitemap/OG).
3. Otherwise **`VERCEL_URL`** (preview deployments keep their preview host).
4. Local dev: `http://localhost:3000`.

**Subdomains** (`*.ptoq.io`): add the hostname in Vercel (or your DNS provider), assign it to the right project, and set **`NEXT_PUBLIC_BASE_URL`** on that project to the matching `https://…` origin. No extra code is required beyond this env var for each deployment.

## One Project, Two Domains

If a project needs both:

- a **primary public domain** such as `https://machinedie.life`
- an **organization alias** such as `https://liferestart.ptoq.io`

configure the deployment like this:

1. Pick exactly one **canonical production origin**.
2. Set **`NEXT_PUBLIC_BASE_URL`** to that canonical origin on the production project.
3. Point the secondary hostname at the same deployment, but redirect it to the canonical host at the edge or platform level.

For the `agent_lifeRestarter` project, the intended setup is:

- Canonical production origin: `https://machinedie.life`
- Organization alias: `https://liferestart.ptoq.io`

Until DNS is ready, leave previews on their preview host and only set `NEXT_PUBLIC_BASE_URL` on production once the canonical domain is live.

See `.env.example`.
