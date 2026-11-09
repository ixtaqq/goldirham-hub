---
name: Goldirham
description: A hub for four market-research tools, set as a length of woven songket where every figure carries its source.
colors:
  ground: "#2a0910"
  label: "#24070e"
  label-2: "#320c15"
  code-well: "#1a050a"
  gold: "#e3b04f"
  gold-hi: "#f7d991"
  gold-lo: "#a97a2c"
  silver: "#c3c7cf"
  silver-lo: "#8d919a"
  text: "#f4e6df"
  text-2: "#d3b4b4"
  text-3: "#b08f92"
  rule: "rgba(227, 176, 79, 0.42)"
  rule-soft: "rgba(227, 176, 79, 0.18)"
  silver-rule: "rgba(195, 199, 207, 0.4)"
typography:
  display:
    fontFamily: "Reem Kufi, Hanken Grotesk, sans-serif"
    fontSize: "clamp(2.9rem, 8.2vw, 6rem)"
    fontWeight: 700
    lineHeight: 0.98
    letterSpacing: "-0.015em"
  headline:
    fontFamily: "Reem Kufi, Hanken Grotesk, sans-serif"
    fontSize: "clamp(2.8rem, 7vw, 5.5rem)"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Reem Kufi, Hanken Grotesk, sans-serif"
    fontSize: "clamp(1.5rem, 3vw, 2.1rem)"
    fontWeight: 600
    lineHeight: 1.12
  lead:
    fontFamily: "Hanken Grotesk, system-ui, sans-serif"
    fontSize: "clamp(1.15rem, 2vw, 1.4rem)"
    fontWeight: 400
    lineHeight: 1.45
  body:
    fontFamily: "Hanken Grotesk, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Hanken Grotesk, system-ui, sans-serif"
    fontSize: "0.7rem"
    fontWeight: 700
    letterSpacing: "0.12em"
  figure:
    fontFamily: "Hanken Grotesk, system-ui, sans-serif"
    fontSize: "clamp(2rem, 3.4vw, 2.6rem)"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.01em"
    fontFeature: "tnum"
  mono:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "0.82em"
    fontWeight: 400
rounded:
  thread: "2px"
spacing:
  gutter: "clamp(16px, 4vw, 48px)"
  column: "760px"
  column-wide: "860px"
  page: "1240px"
  section: "clamp(96px, 16vh, 180px)"
  panel: "clamp(22px, 3.4vw, 40px)"
components:
  button-primary:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.ground}"
    rounded: "{rounded.thread}"
    padding: "10px 20px"
    height: "44px"
  button-primary-hover:
    backgroundColor: "{colors.gold-hi}"
    textColor: "{colors.ground}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.gold-hi}"
    rounded: "{rounded.thread}"
    padding: "10px 20px"
    height: "44px"
  switch-btn:
    backgroundColor: "transparent"
    textColor: "{colors.text-2}"
    padding: "8px 16px"
    height: "44px"
  switch-btn-active:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.ground}"
  label-panel:
    backgroundColor: "{colors.label}"
    textColor: "{colors.text}"
    padding: "{spacing.panel}"
    width: "{spacing.column}"
  ticket:
    backgroundColor: "{colors.label-2}"
    textColor: "{colors.text}"
  passage:
    backgroundColor: "{colors.label-2}"
    textColor: "{colors.text}"
    typography: "{typography.mono}"
    padding: "14px"
  code-block:
    backgroundColor: "{colors.code-well}"
    textColor: "{colors.text}"
    typography: "{typography.mono}"
    padding: "16px 18px"
  cite:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.ground}"
    rounded: "{rounded.thread}"
    height: "1.6em"
  copy-button:
    backgroundColor: "{colors.label}"
    textColor: "{colors.gold-hi}"
    padding: "6px 12px"
    height: "36px"
  tag:
    backgroundColor: "transparent"
    textColor: "{colors.silver}"
    padding: "2px 8px"
---

# Design System: Goldirham

## Overview

**Creative North Star: "The Songket Ledger"**

The page is one length of Malay songket cloth rendered in WebGL behind every section: an oxblood silk ground, warp and weft threads you can see at full size, and a gold supplementary weft that weaves a different motif for each tool. Everything in the DOM reads as something laid on that cloth: woven labels with a gold selvedge along their top edge, single gold threads as rules, and figures set in tabular numerals with their source file printed directly beneath. The cloth sets the scene. The numbers are the content, and no part of the weave is ever drawn over a figure.

Density is editorial and unhurried. The column runs about 760px, sections are separated by up to 180px of open cloth, and every panel has one job. Gold carries names, actions and results. Silver carries misses, disputes, withdrawals and declines, set in the same type size and weight as the gold beside it. The system is flat, rectangular and threadlike. Glass, gradients on surfaces and rounded cards play no part in it.

Motion follows the loom. The cloth billows slowly, reweaves its motif in a ragged sweep when the visitor changes tool, lifts and lights threads under the pointer, and changes pose as each section scrolls into view. Under reduced motion the whole scene renders as a single still frame.

**Key Characteristics:**
- One oxblood ground for the whole page (#2a0910), with darker woven panels laid on it
- Gold weft for names, actions and results, silver for misses at equal size
- Reem Kufi display on a woven, geometric grid. Hanken Grotesk for reading, JetBrains Mono only for code, paths, formulas and tool names
- Every figure is real text in tabular numerals, with its source line directly under it
- 1px gold threads for rules, a 7px pucuk rebung selvedge on panels, 2px corners at most
- A WebGL songket behind everything that weaves one motif per product

## Colors

The palette is a single dyed cloth: oxblood and maroon silk shades, two metallic threads (gold and silver), and a warm cream for reading text.

### Primary
- **Songket Gold** (gold): The supplementary weft. Product names in display type, the wordmark, primary button fills, citation chips, the selvedge motif, the active stepper thread, the top Insight blend, and the gold rule tints. 9.3:1 on the ground.
- **Lit Gold** (gold-hi): Thread under light. Links, ghost buttons, highlighted and winning figures (blend scores, slider outputs, headline scores, met targets, the winning backtest figure, answered questions), mono tool names, the focus ring. 13.4:1 on the ground.
- **Shadowed Gold** (gold-lo): Gold in shade. Tool codes (INS, STK, LNS, FIL, SRC), rank numbers, completed stepper threads, the scrollbar thumb. Used only at 0.7rem bold or larger, at 4.8:1 on the ground.

### Secondary
- **Silver Thread** (silver): Misses, disputes, withdrawals, declines and empty states: the losing backtest figure, missed eval targets, the declined answer, dropped headlines, the "Demo data" and "Private" tags. Always the same size and weight as the gold it sits beside.
- **Tarnished Silver** (silver-lo): Secondary silver. The strike-through on dropped headlines and their reason text.
- **Silver Rule** (silver-rule): The 1px border on silver tags and the left rule on the empty-board note.

### Neutral
- **Oxblood Ground** (ground): The page, the nav once it turns solid, the footer, button text on gold, `theme-color`. The cloth shader fades to the same value in the distance, so the canvas and the DOM meet without a seam.
- **Woven Label** (label): Panel fill, a step darker than the ground so labels read as laid on the cloth. Also the range-thumb ring and the copy button.
- **Raised Label** (label-2): Inset records inside a panel: the Lens ticket, the brief, the cited passage. Also the copy button hover.
- **Code Well** (code-well): The quickstart code block only, the darkest surface.
- **Cream** (text): Body copy, headings, and figures at rest (ledger figures, ticket values) before a state colors them. 15:1 on the ground.
- **Rose Grey** (text-2): Units, nav links at rest, secondary table columns, formula text. 9.6:1.
- **Dusk** (text-3): Source lines, notes, table headers, captions. 6.3:1, the floor for small text.
- **Gold Thread** (rule) and **Faint Thread** (rule-soft): 1px rules. The stronger one sits under table headers and along the top of the ledger and the doors. The fainter one divides rows, cells and panel borders.

### Named Rules
**The Equal Thread Rule.** A miss is set in silver at the same size, weight and position as the gold win beside it. Silver is never smaller, lighter or pushed into a footnote.

**The Two Metals Rule.** Gold and silver are the only accent colors. A new state is expressed as gold (passed, computed, won) or silver (missed, disputed, declined). Never add a third hue.

**The One Cloth Rule.** Every surface is a shade of the same oxblood. Panels get darker than the ground and are never lighter, tinted or translucent.

## Typography

**Display Font:** Reem Kufi (with Hanken Grotesk, sans-serif)
**Body Font:** Hanken Grotesk (with system-ui, sans-serif)
**Label/Mono Font:** JetBrains Mono (with ui-monospace, monospace)

**Character:** Reem Kufi is a geometric Kufic-derived face whose square counters sit on the same grid as the weave. Hanken Grotesk is a plain grotesque that keeps long figures and dense source lines readable. The pairing reads as woven above and printed below.

### Hierarchy
- **Display** (700, clamp(2.9rem, 8.2vw, 6rem), 0.98): The hero claim and the closing line only. Cream, never gold.
- **Headline** (700, clamp(2.8rem, 7vw, 5.5rem), 1): Product names as section titles, in gold.
- **Title** (600, clamp(1.5rem, 3vw, 2.1rem), 1.12): Panel headings in Reem Kufi, cream. Smaller Reem Kufi titles (1.2rem to 1.6rem) name pipeline stages, house rules, ticket symbols and door links.
- **Answer** (Reem Kufi, clamp(1.3rem, 2.6vw, 1.7rem), 1.3): The cited answer in Filings, in lit gold, or silver when it declines.
- **Lead** (400, clamp(1.15rem, 2vw, 1.4rem), 1.45, 36ch): The one-sentence product summary under each name.
- **Body** (400, 1.0625rem, 1.6; 1rem under 640px): Panel paragraphs, capped at 64 to 70ch.
- **Figure** (600 to 700, tabular numerals): Ledger figures at clamp(2rem, 3.4vw, 2.6rem); ticket values 1.35rem; backtest figures use Reem Kufi at clamp(2.6rem, 6vw, 3.8rem). Every figure uses `font-variant-numeric: tabular-nums`.
- **Label** (700, 0.7rem, 0.1em to 0.12em, uppercase source text): Three-letter tool codes, always paired with the tool name on the same row. Table headers and ticket field names use 0.72rem to 0.75rem, 600, uppercase, 0.06em to 0.07em.
- **Source** (400, 0.72rem to 0.8rem, text-3): The line under a figure that names its file. Mono when it is a bare path.
- **Mono** (JetBrains Mono 400, 0.82em): Inline code, file paths, the blend formula, MCP tool names, the cited passage and the quickstart block.

### Named Rules
**The Mono Means Machine Rule.** JetBrains Mono is reserved for strings a machine reads: code, file paths, formulas, tool names, raw passages. Prose, labels and figures never use it.

**The Tabular Figure Rule.** Any element holding a number uses tabular numerals, so figures align in tables and stay put when a re-rank or stepper changes them.

## Layout

A single centered column on top of a full-viewport fixed canvas. The page max width is 1240px with a fluid gutter (clamp(16px, 4vw, 48px)). Section heads and standard panels cap at 760px. Wide panels, which hold tables, the stepper and the Q&A, cap at 860px. The doors grid caps at 980px. Sections sit clamp(96px, 16vh, 180px) apart, so open cloth shows between them, and panels stack 28px apart inside a section.

The hero is a bottom-anchored block at least the viewport height minus the nav: the claim, a 54ch sub, then the four-column ledger directly under it. A vertical scrim (95% to 0% of the label shade, top edge at 80% of the height) darkens the cloth under the text. The nav is sticky with a fading top gradient that turns solid ground after 24px of scroll. A 1px gold "fell line" along its bottom edge fills left to right with scroll progress.

Desktop poses push the cloth to the right half and shade the left 60% under the text. Below 900px the cloth recenters and the shade covers it fully.

Breakpoints:
- **960px:** the ledger becomes 2x2 and the stepper drops to 3 columns.
- **640px:** the ledger becomes a single list with name and unit on the left and the figure right-aligned. The slider fieldset, the versus pair, the days, the tools list, the doors and the repos table collapse to one column. Board headers shorten to letters, nav links drop to their codes, and the code block wraps.

## Elevation & Depth

Depth comes from the cloth itself: real perspective, billow, thread-level lighting with anisotropic gold highlights, and distance fog to the ground color. The DOM stays nearly flat and uses tonal layering, with panels a step darker than the ground and inset records a step lighter than the panel. Two soft, diffuse shadows exist, both pointing down, both used to lift objects off the cloth. Neither is a hard offset.

### Shadow Vocabulary
- **Label drop** (`box-shadow: 0 24px 60px -30px rgba(0, 0, 0, 0.85)`): Under every woven label panel, so it reads as lying on the cloth.
- **Button drop** (`box-shadow: 0 6px 18px -8px rgba(0, 0, 0, 0.7)`): Under the gold primary button only. The ghost button has none.

### Named Rules
**The Cloth Carries Depth Rule.** The 3D is the WebGL cloth. DOM surfaces get at most the label drop and never use glass, blur or glow.

## Shapes

Rectangular and threadlike. Corners stay square or at 2px (buttons, citation chips, the focus ring). The only true circle is the range slider thumb. Borders are always 1px threads in gold or silver alpha. Accent bars are 2px gold threads that draw in from the left with `scaleX` (ledger hover, stepper progress, backtest tops). The recurring geometric marker is a 7px square rotated 45 degrees, the songket diamond: it marks pipeline stage nodes and met results. Missed results use the same diamond as an outline.

The signature edge is the **pucuk rebung selvedge**: a 12x7px pixel-grid SVG of bamboo-shoot triangles in gold with a shadowed-gold core, tiled along the top of every label panel and drawn 8px above the panel at 90% opacity.

## Components

### Buttons
Solid, rectangular, gold.
- **Shape:** near-square (2px), 44px minimum height, 10px 20px padding, 600 weight 0.98rem.
- **Primary:** gold fill with ground text and the button drop. Followed by a 11px outbound arrow drawn as an inline SVG stroke.
- **Hover / Focus:** fill lifts to lit gold in 180ms. The arrow moves 2px up and right on fine pointers. Focus is a 2px lit-gold outline offset 3px.
- **Active:** `scale(0.97)` over 160ms on cubic-bezier(0.23, 1, 0.32, 1). Disabled under reduced motion.
- **Ghost:** transparent with lit-gold text and the 1px gold border kept, no drop. Hover adds a 12% gold wash. Used for in-panel actions ("Show all 26", "Run the morning again").
- **Text link:** lit gold, 1px underline offset 0.22em, 44px tap height. Hover turns cream.

### Segmented switch
A 1px gold-ruled pair of buttons. The pressed one fills gold with ground text. It uses the same press scale as the buttons.

### Ledger (signature)
The four-tool index under the hero. Each entry stacks the tool name in Reem Kufi gold with its three-letter code at the far right, then the live figure in cream at figure size, the unit in rose grey, the source path in mono dusk, and an "Open" link that stretches over the whole cell. Cells are divided by faint threads, with a gold thread along the top. Hover or focus draws a 2px lit-gold thread across the cell top in 240ms and reweaves the cloth into that tool's motif. Entries rise in with a 60ms stagger after the hero text.

### Woven label panel (signature)
The container for every piece of evidence. Woven label fill, 1px faint gold border, the label drop, clamp(22px, 3.4vw, 40px) padding (20px 16px on mobile), and the pucuk rebung selvedge along the top. It opens with a Reem Kufi title and a paragraph of up to 68ch, then holds one evidence component.

### Ranking board
The Insight table. Three range sliders (3px gold-filled track, 18px lit-gold thumb ringed in label color and 1px gold) with tabular lit-gold outputs sit above a table of rank (shadowed gold, zero-padded), symbol, three scores and the blend (bold lit gold, gold for rank 1). Row hover gets a 6% gold wash. When the weights change, rows reorder by FLIP: each row translates from its old position over 220ms on cubic-bezier(0.23, 1, 0.32, 1). A mono formula line under the table shows the exact arithmetic for the leading row. With every weight at zero, a silver note with a silver left rule replaces the board.

### Stepper and ticket
The Lens walk-through. Six text buttons share a faint top thread. Completed steps draw it in shadowed gold, the current step in lit gold, and a miss step in silver, each drawing in over 220ms. The ticket below is a raised-label record: a header with the Reem Kufi symbol in gold, the name and a silver "Demo data" tag, then a grid of fields (uppercase dusk labels, 1.35rem tabular values). Fields not yet reached sit at 32% opacity and light to full in 200ms. A hot value turns lit gold and a missed one silver.

### Cited answer and passage
The Filings Q&A. The question is in body size with a shadowed-gold "Q" before it. The answer is Reem Kufi in lit gold (silver when declined), followed by a citation chip: a 1.6em gold square, 2px corners, with the number in ground. The passage is a raised-label record with a reference header (filing name in gold) over a mono `pre` block that wraps. The exact cited characters are marked with a 28% gold wash in lit gold.

### Results table
Metric, achieved value, target and result. Met values are bold lit gold with a filled diamond. Missed values are bold silver with an outlined diamond, and their row's value turns silver too. Both use one weight and size. A silver-marked limits list follows, with each limit's lead phrase in silver semibold.

### Code block
A code-well box with a faint border. The header row holds the shell name in dusk and a Copy button (36px, label fill, lit-gold text, gold rule, press scale). The `pre` scrolls on desktop and wraps under 640px.

### Navigation
A sticky bar: the wordmark in Reem Kufi 700 gold at 1.35rem, then five links, each a shadowed-gold tool code before a rose-grey name. Hover and the current section turn lit gold, and the current code turns gold. Under 640px only the codes remain, and each link keeps a 10px vertical pad.

### Cloth (signature)
A full-viewport fixed WebGL canvas (Three.js plane, 18x12 units, 20 threads per unit) behind all content. Plain weave in warp and weft shades, with a gold supplementary weft that floats over the ground wherever the active motif is set and ties down every sixth thread. Motif per product:
- **Insight:** bunga tabur, half-drop eight-point stars on a 26-thread repeat.
- **Stack:** pucuk rebung, rows of bamboo-shoot triangles.
- **Lens:** bunga cengkih, concentric diamond rings on a 30-thread repeat.
- **Filings:** teluk berantai, a chained diagonal lattice with an index mark in each cell.
- **Hero, Code and end:** kepala kain, a bamboo-shoot head border over scattered stars.

Behavior: a reweave sweep moves up the screen with a ragged three-thread edge over about 1.1s (cubic in-out) when the section or the hovered product changes, and hover-out waits 140ms before reverting. The pointer leaves a 16-point trail that lifts threads and lights them in lit gold, then decays. Each section has its own pose (tilt, offset, billow, side shade), eased toward on scroll, and scroll also advances the weave by 0.09 threads per viewport. Pixel ratio caps at 1.5 and steps down to 0.75 after sustained slow frames. With reduced motion, time, the pointer trail and the weave scroll stop, motifs swap instantly, and one frame renders per change. Without WebGL, the canvas is replaced by a static oxblood radial gradient.

### Hero entrance
The two claim lines, the sub and the four ledger entries rise 10px and fade in over 700ms on cubic-bezier(0.23, 1, 0.32, 1), staggered 0, 60, 140, then 220 to 400ms in 60ms steps. Reduced motion replaces the rise with a 400ms fade.

## Do's and Don'ts

### Do:
- **Do** put the source file or report name directly under every figure, in dusk at 0.72rem to 0.8rem, mono when it is a bare path.
- **Do** set a miss in silver at the same size and weight as the win next to it (The Equal Thread Rule).
- **Do** lay new evidence inside a woven label panel with the pucuk rebung selvedge, on label fill, with a 1px faint gold border.
- **Do** use 1px gold threads for every rule and 2px gold threads, drawn in from the left, for active or hover marks.
- **Do** give a new product its own songket motif in the cloth shader and map its section and ledger entry to it.
- **Do** keep press feedback at `scale(0.97)` and state transitions at 160ms to 240ms on cubic-bezier(0.23, 1, 0.32, 1), and drop both under reduced motion.
- **Do** keep buttons, switches, steps, ledger and nav links at 44px tall or more (36px for the in-header Copy button).

### Don't:
- **Don't** use glass, backdrop blur, glow or translucent panels. Panels are opaque woven labels.
- **Don't** add a third accent hue. A state is gold or silver.
- **Don't** set prose, labels or figures in JetBrains Mono.
- **Don't** round corners past 2px, except the range thumb.
- **Don't** place the cloth's gold motif behind a figure without a scrim or shade. The hero scrim and the per-section side shade exist so text never sits on bright weft.
- **Don't** let a three-letter tool code stand alone above a heading. It always sits beside its tool name.
