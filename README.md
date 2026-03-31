# tldraw-styled

An experiment in restyling [tldraw](https://github.com/tldraw/tldraw) into a flat, professional-looking canvas editor. Built with [Next.js](https://nextjs.org/) and the [Geist](https://vercel.com/font) font family.

## What's changed from vanilla tldraw

- **Flat UI** — all gradients, shadows, and rounded corners replaced with sharp edges and 1px borders
- **Monochrome selection** — selection outlines, handles, and focus rings are black instead of blue
- **Muted color palette** — shape colors remapped to softer, professional tones
- **Geist fonts** — Sans, Mono, and Instrument Serif replace the defaults
- **Pixel fonts** — five Geist Pixel variants (Square, Grid, Circle, Triangle, Line) available via a custom dropdown in the style panel
- **Sharp arrows** — miter joins, butt caps, and triangle arrowheads instead of the default rounded/hand-drawn style
- **No "draw" dash** — the freehand dash option is hidden from the style panel

## Getting started

```bash
git clone https://github.com/miguelalcalde/tldraw-styled.git
cd tldraw-styled
npm install
npm run dev
```

Open `http://localhost:3000` in your browser.

## How it works

Most of the restyling is done through CSS variable overrides and targeted selectors in `src/app/globals.css`. Shape colors are remapped in `src/app/page.tsx` via `DefaultColorThemePalette`. A small `patch-package` patch adjusts arrow defaults at the source level. The pixel font picker is a custom component in `src/components/CustomStylePanelContent.tsx`.

## License

This project is provided under the MIT license found [here](https://github.com/tldraw/nextjs-template/blob/main/LICENSE.md). The tldraw SDK is provided under the [tldraw license](https://github.com/tldraw/tldraw/blob/main/LICENSE.md).
