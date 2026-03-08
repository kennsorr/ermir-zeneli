# Ermir Zeneli — Portfolio

Next.js (App Router) portfolio for male model brand **Ermir Zeneli**. Editorial, high-fashion aesthetic: minimal, cinematic, black & white.

## Stack

- **Next.js 14** (App Router) + TypeScript
- **Tailwind CSS** for layout and styling
- **Framer Motion** for animations
- Content hardcoded in `src/content/home.ts` (no CMS)

## How to run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Homepage shows the fullscreen **Triptych Hero** (three panels). Hover a panel for the line sweep and image crossfade; click a panel to go to Gallery, About, or Contact.

## Images

- **Hero panels**: Put assets in `public/images/hero/`:
  - `panel-1.jpg` / `panel-1-hover.jpg` (Portfolio)
  - `panel-2.jpg` / `panel-2-hover.jpg` (Story)
  - `panel-3.jpg` / `panel-3-hover.jpg` (Contact)
- See `public/images/hero/README.md` for naming and sizing.
- If a file is missing, the UI falls back to `public/images/placeholder.svg`.

## Site map

| Route     | Page        | Notes                    |
|----------|-------------|--------------------------|
| `/`      | Home        | Triptych Hero fullscreen |
| `/gallery` | Gallery   | Placeholder              |
| `/about` | About (Story) | Placeholder            |
| `/contact` | Contact   | Placeholder              |

## Build

```bash
npm run build
npm start
```

## Accessibility

- Panels are focusable links; focus ring matches the theme.
- `prefers-reduced-motion`: line sweep is disabled; image swap uses a simple fade.
