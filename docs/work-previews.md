# Work preview assets

The Work page keeps its text-only layout at rest. At desktop widths, hovering or
keyboard-focusing a link reveals the image for that exact destination in the left
gutter. Mobile and tablet layouts do not display these previews.

All Work previews are intentionally preloaded at low priority from both the home
page and Work itself. The home page warms the browser cache before navigation;
Work covers direct visits. This guarantees that the first hover does not wait for
an image request without placing the transfer on unrelated Writing pages. The
bandwidth cost is a deliberate part of the interaction design; do not replace
this with hover-triggered loading without revisiting that decision.

## Naming

- Canonical project link: `public/work/<project>.<ext>`
- Pitch PDF link: `public/work/<project>-pitch.jpg`
- Other secondary artifact: `public/work/<project>-<artifact>.<ext>`

The build scans `public/work` by basename, so extensions may change without a code
update. Basenames must remain unique.

## Curated canonical previews

- `matter.jpg`: supplied screenshot of the current Matter interface
- `see-me-see-u.jpg`: supplied screenshot of the current See Me See You interface

## Current secondary previews

- `wittgenstein-pitch.jpg`: pitch PDF page 1
- `jiko-pitch.jpg`: pitch PDF page 1
- `see-me-see-u-poster.svg`: optimized, self-contained SEE-ME SEE-U title artwork
- `matter-pitch.jpg`: high-quality web export of Matter's official
  [`slate-bone-master-1024.png`](https://github.com/p-to-q/matter/blob/main/features/matter/brand/assets/slate-bone-master-1024.png)
- `murmur-pitch.jpg`: supplied Murmur title artwork
- `aleph-benchmark.jpg`: Aleph benchmark interface
- `liferestart-upstream.jpg`: original lifeRestart interface

## Asset standard

- Use a real artifact from the destination, not a generic icon.
- Prefer an optimized, transparent SVG for vector title artwork. It must contain
  no scripts, external references, embedded fonts, or raster images.
- For raster previews, export a static 1200px-wide JPEG at approximately 85 quality.
- Keep each preview below 500KB unless the source makes that impractical.
- PDF previews are rendered offline; hovering must never load the PDF itself.
- Preview images keep their real source in Work in addition to the site-wide
  preload; both paths must continue to resolve to the same canonical asset URL.
- Do not change the visible Work copy or add cards, badges, or persistent imagery.

Before publishing, verify at 1280px that every multi-link row changes image when
moving focus between its links. Also verify that no preview appears below 1024px,
keyboard focus matches hover, and reduced-motion mode fades without translating.
