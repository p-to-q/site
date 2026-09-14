# Work preview assets

The Work page keeps its text-only layout at rest. At desktop widths, hovering or
keyboard-focusing a link reveals the image for that exact destination in the left
gutter. Mobile and tablet layouts do not request or display these previews.

## Naming

- Canonical project link: `public/work/<project>.<ext>`
- Pitch PDF link: `public/work/<project>-pitch.jpg`
- Other secondary artifact: `public/work/<project>-<artifact>.jpg`

The build scans `public/work` by basename, so extensions may change without a code
update. Basenames must remain unique.

## Curated canonical previews

- `matter.jpg`: supplied screenshot of the current Matter interface

## Current secondary previews

- `wittgenstein-pitch.jpg`: pitch PDF page 1
- `jiko-pitch.jpg`: pitch PDF page 1
- `matter-pitch.jpg`: high-quality web export of Matter's official
  [`slate-bone-master-1024.png`](https://github.com/p-to-q/matter/blob/main/features/matter/brand/assets/slate-bone-master-1024.png)
- `murmur-pitch.jpg`: supplied Murmur title artwork
- `aleph-benchmark.jpg`: Aleph benchmark interface
- `liferestart-upstream.jpg`: original lifeRestart interface

## Asset standard

- Use a real artifact from the destination, not a generic icon.
- Export a static 1200px-wide JPEG at approximately 85 quality.
- Keep each preview below 500KB unless the source makes that impractical.
- PDF previews are rendered offline; hovering must never load the PDF itself.
- Do not change the visible Work copy or add cards, badges, or persistent imagery.

Before publishing, verify at 1280px that every multi-link row changes image when
moving focus between its links. Also verify that no preview appears below 1024px,
keyboard focus matches hover, and reduced-motion mode fades without translating.
