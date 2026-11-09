# Goldirham hub

The landing page for Goldirham's four tools (Insight, Stack, Lens, Filings), drawn on a live WebGL songket. Each tool has its own woven motif, hovering a tool reweaves the cloth, and scrolling drives the cloth's pose and weave.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # static output in dist/
```

Deploy `dist/` on Vercel as a static site (framework preset: Vite).

## Files

| File | What it holds |
| --- | --- |
| `index.html` | Page structure and fixed copy |
| `src/data.js` | Every figure on the page, with the repo file it comes from |
| `src/cloth.js` | Three.js scene: displaced cloth, weave shader, motifs, pointer lift |
| `src/main.js` | Rendering from data, Insight ranking, Lens stepper, Filings demo, scroll choreography |
| `src/styles.css` | Tokens and layout |

## Updating a figure

Change it in `src/data.js` and keep the `source` text pointing at the file it was read from. Insight scores are copied from `lib/assets.ts` in ixtaqq/Goldirham-Insight in file order, because ties keep that order.

Under `prefers-reduced-motion` the cloth renders a still frame and motif changes are instant. Without WebGL the page falls back to a plain oxblood gradient.
