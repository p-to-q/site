# Work preview assets

The Work page keeps its text-only layout at rest. On desktops with a mouse or
trackpad and a viewport of at least 66rem (1056px), hovering or keyboard-focusing
a link reveals the image for that exact destination in the left gutter. Below
66rem the gutter is too narrow for a useful preview (under 10rem wide), and touch
screens cannot hover, so phones and tablets (including a landscape iPad) show no
previews.

## Loading

All Work previews are intentionally preloaded at low priority from both the
home page and Work itself. The home page warms the browser cache before the
(client-side) navigation; Work covers direct visits. This guarantees that the
first hover does not wait for an image request without placing the transfer on
unrelated Writing pages. Do not replace this with hover-triggered loading
without revisiting that decision.

Desktop gets every preview as the original file, at full quality; nothing is
resized or re-encoded. The transfer is spent only where previews exist:

- **Only where previews show.** Every preload carries
  `media="(min-width: 66rem) and (hover: hover) and (pointer: fine)"`
  (`WORK_PREVIEW_MEDIA` in `app/lib/work-previews.ts`, identical to the CSS
  media query that shows `.work-thumb`; a test enforces it). Phones and
  tablets download nothing.
- **Top first.** Previews are preloaded in on-page order, top to bottom, then
  left to right (`WORK_PREVIEW_ORDER`), so the first rows are ready first and
  the large GIFs further down do not hold them up. A test renders Work and
  checks the list against the page; add a new preview to it in place.
- **Returning visitors** get previews (and fonts) from cache at once:
  `stale-while-revalidate` refreshes them in the background (`next.config.js`).
- **Only images are previews.** `public/work` may also hold download artifacts
  (a project's `.mp4` demo video); those are never preloaded and never offered
  as previews. They are linked by path through `requireWorkFile()` (the build
  fails if the file is missing) and open in a new tab like every other
  artifact, so a large video is fetched only when its link is opened.
- The build reads each preview's intrinsic size from its file header
  (`app/lib/image-size.ts`) for the `<img>` width/height attributes and the
  banner height (below); an unreadable image fails the build.

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

Sizes are the original design:

- standard: five body rows tall (`--work-thumb-height`, 164px), natural width,
  capped at one gutter (letterboxed within the fixed height if wider);
- banner: spans the gutter (`min(32rem, …)`); its height = width ÷ the
  artwork's aspect ratio, which `WorkPreviewLink` passes inline as
  `--preview-ar`, so CSS knows it before the image loads.

Placement: the thumb is centred on its row, then clamped so it never spills
past the first or last project: `top: clamp(list top, centred, list bottom)`.
Each edge row knows how many rows of room it has (`--rows-above/--rows-below`,
set by `nth-child` rules for the first and last three rows). The clamp uses the
thumb's real height (`--thumb-img-h`), so a five-row preview on an edge row
sits flush with the list edge exactly as before, while a short banner on the
same row stays centred on its own row instead of hanging beside another one.

The room each row has is measured, not assumed: `WorkList`
(`app/components/content/work-list.tsx`) writes every row's real distance to
the list top and bottom (`--space-above/--space-below`) and keeps it current
with a ResizeObserver, so a row that wraps to two lines (browser zoom, a larger
default font, a fallback font, longer copy) does not push previews out of the
list. Before hydration or without JS, the CSS falls back to counting rows.
`WorkList` also hides a preview whose image fails to load, rather than showing
an empty frame.

## Preview scaling

`previewScale` on `WorkPreviewLink` multiplies the frame height (standard) or
width (banner); placement is recomputed from the scaled height, so alignment
holds. Allowed range 0.25–1.4 (the component throws outside it, which fails
the build). One number per link; no variants.

- `ants` (standard): 0.75
- `see-me-see-u` poster (banner): 0.85
- everything else: 1 (full size)

## Asset standard

- Use a real artifact from the destination, not a generic icon.
- Prefer an optimized, transparent SVG for vector title artwork. It must contain
  no scripts, external references, embedded fonts, or raster images.
- For raster previews, export a static 1200px-wide JPEG at approximately 85 quality.
- PDF previews are rendered offline; hovering must never load the PDF itself.
- Preview images keep their real source in Work in addition to the site-wide
  preload; both resolve through `getWorkPreviewMap()` to the same URL, so the
  hover always hits the preloaded file.
- Do not change the visible Work copy or add cards, badges, or persistent imagery.

Before publishing, verify at 1280px that every multi-link row changes image when
moving focus between its links. Also verify that no preview appears below 66rem
(1056px) or on a touch device,
keyboard focus matches hover, and reduced-motion mode fades without translating.
