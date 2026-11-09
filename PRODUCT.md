# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Vite + Three.js static site (user chose "new standalone site" and a WebGL scene on 2026-11-09). Deploy target: Vercel, replacing goldirham.vercel.app once moved into its repo.

## Users

Hiring managers, engineers and investors-in-the-hobby-sense reading a solo developer's portfolio of market-research tools. They arrive from a CV, LinkedIn or GitHub link, skim for a minute, and decide whether the work is real. A second audience is the developer's own future users who want to open one of the tools.

## Product Purpose

Goldirham is a hub for four market-research tools built by one developer (github.com/ixtaqq; display name not confirmed, so the hub doesn't print one). The hub sends visitors to each tool and proves, with real figures and their sources, that the tools are built carefully.

- **Insight** (goldirham-insight.vercel.app, repo ixtaqq/Goldirham-Insight): research desk for the AI build-out. 234 assets, 26 scored 0 to 10 on upside, safety and AI exposure.
- **Stack** (goldirham-stack.vercel.app, repo ixtaqq/ai-infra-digest): morning Telegram brief on chips, power and capital behind AI. 68 RSS feeds, SEC filings of 35 companies, ten sectors.
- **Lens** (goldirham-lens.vercel.app, private repo goldirham-lens-v2): one private briefing before 08:00 MYT; every figure computed in Python; fails closed on disputed prices.
- **Filings** (ixtaqq.github.io/goldirham-filings, repo ixtaqq/goldirham-filings, new on the hub): local MCP server answering questions about the 10-K and 10-Q filings of 12 AI-infrastructure companies, citing exact passages or declining.

## Positioning

Code owns the numbers. Language models read and summarise; code computes every figure, and every figure says where it came from. The tools publish their own misses (Lens backtest did not beat random entries; Filings missed three of five held-out targets).

## Capabilities and Constraints

- Every figure on the hub must trace to a named file in a repo. No invented metrics, users, testimonials or uptime.
- Lens v2 is private; link its showcase, not its code.
- Filings has no hosted demo; it runs locally (Python, Docker, Ollama). Its project site is on GitHub Pages (ixtaqq.github.io/goldirham-filings, HTTP 200 on 2026-11-09); the hub opens that site and also links the repo.
- Not financial advice; demo data is labelled as demo data.

## Brand Commitments

Name "Goldirham". House rules (verbatim from the live hub): code owns the numbers; every figure says where it came from; model output is checked before it ships; fail closed, and say why; silence is a valid answer. Voice: plain, specific, numbers with sources, admits limits.

## Evidence on Hand

- Live hub copy and figures at goldirham.vercel.app (captured 2026-11-09).
- Lens demo setup KSTL: entry 93.90, stop 90.40, targets 99.15 / 104.40, R:R 3.00, size cap 20%, withdrawn for disputed_bar. Backtest 0.03R vs random 0.27R, 106 trades.
- Insight scores for 26 assets in lib/assets.ts (top 10 captured from the live hub).
- Filings: NVDA Data Center revenue $89,023 million answer with citation (site/examples/answered.json); held-out metrics in README (Recall@10 0.833, citation precision 0.614, wrongly declined 0.095, unsupported numbers 0, unanswerable declined 2/4).
- No testimonials, no user counts, no press. Do not fabricate them.

## Product Principles

1. Show the number and its source together.
2. Admit the miss in the same type size as the win.
3. Spectacle never hides a figure; the 3D is the frame, the numbers are the content.
4. A visitor can reach any tool in one click from the first viewport.

## Accessibility & Inclusion

Respect prefers-reduced-motion (static scene), keep all figures as real text, WCAG AA contrast, keyboard reachable links.
