# Work preview assets

The Work page keeps its text-only layout at rest. At desktop widths (≥1024px),
hovering or keyboard-focusing a link reveals the image for that exact destination
in the left gutter. Mobile and tablet layouts do not display these previews.

## Loading

All Work previews are intentionally preloaded at low priority from both the
home page and Work itself. The home page warms the browser cache before the
(client-side) navigation; Work covers direct visits. This guarantees that the
first hover does not wait for an image request without placing the transfer on
unrelated Writing pages. Do not replace this with hover-triggered loading
without revisiting that decision.

The bandwidth is kept small and spent only where previews exist:

- **Desktop only.** Every preload carries `media="(min-width: 1024px)"`
  (`WORK_PREVIEW_MEDIA` in `app/lib/work-previews.ts`, matching the CSS
  breakpoint that shows `.work-thumb`). Phones and tablets download nothing.
- **Display-sized derivatives.** `scripts/build-work-previews.mjs` runs before
  `npm run dev` and `npm run build`. It writes a WebP for every raster preview
  (JPEG/PNG/GIF, animation preserved, EXIF orientation applied), at most 328px
  tall (2x the 164px gutter), into git-ignored `public/work-derived/`, plus a
  manifest. The originals in `public/work` are never touched. A derivative is
  used only when it is smaller than its source and was built from the exact
  current bytes (the site re-checks a content hash), otherwise the original is
  served. If sharp is unavailable the step logs a warning and the site falls
  back to originals; it never fails the build.
- **Cached forever.** Derivative names carry a content hash, so
  `/work-derived/*` is served `immutable` for a year (`next.config.js`).
  Replacing an artwork produces a new URL; nothing needs purging.
- Only images are previews. `public/work` may also hold download artifacts (a
  project's `.mp4` demo video); those are never preloaded and never offered as
  previews. They are linked by path through `requireWorkFile()` and open in a
  new tab like every other artifact, so a large video is fetched only when
  its link is opened.

## Naming

- Canonical project link: `public/work/<project>.<ext>`
- Pitch PDF link: `public/work/<project>-pitch.jpg`
- Other secondary artifact: `public/work/<project>-<artifact>.<ext>`

The build scans `public/work` by basename, so extensions may change without a code
update. Basenames must remain unique.

## Curated canonical previews

- `matter.jpg`: supplied screenshot of the current Matter interface
- `see-me-see-u.jpg`: supplied screenshot of the current See Me See You interface
- `ants.svg`: official banner.svg from the ants repository (standard preview
  variant, scaled to 0.75 via `previewScale`)

## Current secondary previews

- `wittgenstein-pitch.jpg`: pitch PDF page 1
- `jiko-pitch.jpg`: pitch PDF page 1
- `see-me-see-u-poster.svg`: optimized, self-contained SEE-ME SEE-U title artwork
- `matter-pitch.jpg`: high-quality web export of Matter's official
  [`slate-bone-master-1024.png`](https://github.com/p-to-q/matter/blob/main/features/matter/brand/assets/slate-bone-master-1024.png)
- `matter-demo-poster.jpg`: frame extracted from `matter-demo.mp4` at ~12s,
  1280x720 (kept at the previously deployed dimensions) so the hover preview
  always matches the video
- `murmur-pitch.jpg`: supplied Murmur title artwork
- `aleph-benchmark.jpg`: Aleph benchmark interface
- `liferestart-upstream.jpg`: original lifeRestart interface

## Sizing and placement

Each thumb has one explicit image height, computed in CSS alone:

- standard: five body rows (`--work-thumb-height`, 164px), natural width.
  When that width would exceed one gutter, the height shrinks instead, so the
  frame always hugs the artwork (no letterbox bands);
- banner: the gutter width (`min(32rem, …)`), height = width ÷ the artwork's
  aspect ratio. `WorkPreviewLink` passes the ratio inline as `--preview-ar`,
  read from the file header at build time (`app/lib/image-size.ts`), and also
  sets the `<img>` width/height attributes, so sizes are known before load.

The thumb is centred on its row, then clamped so it never spills past the first
or last project: `top: clamp(list top, centred, list bottom)`. Each row knows
how many rows of room it has above and below (`--rows-above/--rows-below`, set
by `nth-child` rules for the first and last three rows). Because the clamp uses
the thumb's real height, a five-row preview on an edge row sits flush with the
list edge, while a short banner on the same row stays centred on its own row.

## Preview scaling

`previewScale` on `WorkPreviewLink` is a uniform size factor: the whole preview,
frame and artwork, becomes exactly `previewScale` × its unscaled size at every
viewport (the gutter cap scales too). Placement is recomputed from the scaled
height, so alignment holds. Allowed range 0.25–1.4 (the component throws
outside it, which fails the build). One number per link; no variants.

- `ants` (standard): 0.75
- `see-me-see-u` poster (banner): 0.85
- everything else: 1 (full size)

## Asset standard

- Use a real artifact from the destination, not a generic icon.
- Prefer an optimized, transparent SVG for vector title artwork. It must contain
  no scripts, external references, embedded fonts, or raster images.
- For raster previews, export a static 1200px-wide JPEG at approximately 85 quality.
  The build derives the served WebP; the original stays the source of truth.
- PDF previews are rendered offline; hovering must never load the PDF itself.
- Preview images keep their real source in Work in addition to the site-wide
  preload; both resolve through `getWorkPreviewMap()` to the same served URL
  (derivative or original), so the hover always hits the preloaded file.
- Do not change the visible Work copy or add cards, badges, or persistent imagery.

Before publishing, verify at 1280px that every multi-link row changes image when
moving focus between its links. Also verify that no preview appears below 1024px,
keyboard focus matches hover, and reduced-motion mode fades without translating.
