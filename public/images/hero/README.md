# Hero images

Place your triptych hero assets here. Naming convention:

| Panel   | Default (idle)     | Hover              |
|---------|--------------------|--------------------|
| Left    | `panel-1.jpg`      | `panel-1-hover.jpg`|
| Middle  | `panel-2.jpg`      | `panel-2-hover.jpg`|
| Right   | `panel-3.jpg`      | `panel-3-hover.jpg`|

- **Format**: JPG or WebP recommended (B&W or desaturated for editorial look).
- **Aspect**: Portrait or square works best; they are cropped to cover each third of the viewport.
- **Size**: ~800–1200px on the short edge is enough for retina; `next/image` will serve optimized sizes.
- **Hover**: Use a *different* image for each `-hover.jpg` to see a full image change on wipe. If you use the same file for both, the wipe still runs and the revealed area appears slightly brighter.

If a file is missing, the site falls back to `../placeholder.svg`.
