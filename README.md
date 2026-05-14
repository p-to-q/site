# site

**This is the public site for <a href="https://github.com/p-to-q">p-to-q</a>.**

<div align="center">

<pre>
[p → q]
We're interested in the arrow.
</pre>

</div>

We study the layer between language and consequence.

> `p` what can be said  
> `→` how it becomes something  
> `q` what actually happens

This [site](https://www.ptoq.io) is a public surface for that work.

Our first proof is [wittgenstein](https://github.com/p-to-q/wittgenstein), a modality harness for text-first LLMs.<br/>
See more at our organization [README](https://github.com/p-to-q).

**Craft over scale.**

<a href="https://github.com/p-to-q/.github/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=p-to-q/.github" alt="Image with all contributors" />
</a>

## www.

ptoq.io [[click](https://www.ptoq.io/)]<br/>
p-to-q.com [[click](https://www.p-to-q.com)]

### Canonical URL (`NEXT_PUBLIC_BASE_URL`)

`sitemap.xml`, `robots.txt`, `metadataBase`, and social preview URLs are built from a single resolved origin:

1. **`NEXT_PUBLIC_BASE_URL`** if set (use the full origin you want indexed, e.g. `https://www.ptoq.io` or `https://something.ptoq.io`).
2. On Vercel **production** only, if unset: **`VERCEL_PROJECT_PRODUCTION_URL`**, then a last resort of **`https://www.ptoq.io`** (so production does not fall back to `*.vercel.app` for sitemap/OG).
3. Otherwise **`VERCEL_URL`** (preview deployments keep their preview host).
4. Local dev: `http://localhost:3000`.

**Subdomains** (`*.ptoq.io`): add the hostname in Vercel (or your DNS provider), assign it to the right project, and set **`NEXT_PUBLIC_BASE_URL`** on that project to the matching `https://…` origin. No extra code is required beyond this env var for each deployment.

See `.env.example`.

### Engineering

Install dependencies:

```bash
pnpm install
```

Run locally:

```bash
pnpm dev
```

### Clone

Clone it to the cloud with Vercel:

> See the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/p-to-q/site&project-name=p-to-q-site&repository-name=site)
