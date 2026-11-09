export const LINKS = {
  insight: "https://goldirham-insight.vercel.app/",
  stack: "https://goldirham-stack.vercel.app/",
  stackBrief: "https://goldirham-stack.vercel.app/briefing/",
  lens: "https://goldirham-lens.vercel.app/",
  filings: "https://ixtaqq.github.io/goldirham-filings/",
  filingsRepo: "https://github.com/ixtaqq/goldirham-filings",
  insightRepo: "https://github.com/ixtaqq/Goldirham-Insight",
  stackRepo: "https://github.com/ixtaqq/ai-infra-digest",
  portfolio: "https://aizattaqq.vercel.app/",
  github: "https://github.com/ixtaqq",
  linkedin: "https://www.linkedin.com/in/aizattaqq/",
};

export const PRODUCTS = [
  {
    id: "insight",
    code: "INS",
    name: "Insight",
    line: "A research desk for the AI build-out. 234 assets, 26 of them scored on upside, safety and AI exposure.",
    figure: "26",
    unit: "scored assets",
    source: "lib/assets.ts in ixtaqq/Goldirham-Insight. Each asset is rated 0 to 10 on three factors.",
    href: LINKS.insight,
    host: "goldirham-insight.vercel.app",
  },
  {
    id: "stack",
    code: "STK",
    name: "Stack",
    line: "A morning brief on the chips, power and capital behind AI, sent on Telegram at the hour you choose.",
    figure: "68",
    unit: "feeds read each run",
    source: "src/collector/rss.ts in ixtaqq/ai-infra-digest. 50 company feeds and 18 industry feeds.",
    href: LINKS.stack,
    host: "goldirham-stack.vercel.app",
  },
  {
    id: "lens",
    code: "LNS",
    name: "Lens",
    line: "Numbers before narrative. One private briefing before 08:00 in Kuala Lumpur, every figure computed in Python.",
    figure: "07:00",
    unit: "MYT, first scheduled run",
    source: "daily.yml in the Lens v2 repo. Runs at 07:00 and 07:40 MYT on GitHub Actions.",
    href: LINKS.lens,
    host: "goldirham-lens.vercel.app",
  },
  {
    id: "filings",
    code: "FIL",
    name: "Filings",
    line: "Ask the 10-K and 10-Q filings of twelve AI-infrastructure companies. It cites the passage, or it declines.",
    figure: "96",
    unit: "filings indexed",
    source: "scripts/setup.ps1 in ixtaqq/goldirham-filings. Latest two 10-Ks and six 10-Qs for each of 12 companies.",
    href: LINKS.filings,
    host: "ixtaqq.github.io/goldirham-filings",
  },
];

// lib/assets.ts in ixtaqq/Goldirham-Insight, file order (ties keep this order).
export const ASSETS = [
  ["CEG", "Constellation Energy", 7.5, 9, 10],
  ["VST", "Vistra", 8.5, 7, 9],
  ["NEE", "NextEra Energy", 6.5, 10, 7.5],
  ["AES", "AES Corporation", 8, 7, 9],
  ["NI", "NiSource", 7, 8, 7.5],
  ["NVDA", "NVIDIA", 8, 7.5, 10],
  ["AMD", "Advanced Micro Devices", 8, 6.5, 8.5],
  ["AVGO", "Broadcom", 7.5, 8, 9],
  ["TSM", "Taiwan Semiconductor", 7.5, 7.5, 9.5],
  ["PLTR", "Palantir", 8.5, 4.5, 9],
  ["MU", "Micron Technology", 8, 5.5, 8],
  ["MSFT", "Microsoft", 7, 9.5, 9],
  ["GOOGL", "Alphabet", 7.5, 9, 9],
  ["META", "Meta Platforms", 7.5, 8.5, 8.5],
  ["AMZN", "Amazon", 7.5, 8.5, 8],
  ["AAPL", "Apple", 6, 9.5, 6.5],
  ["TSLA", "Tesla", 8, 4, 8],
  ["QQQ", "Invesco QQQ Trust", 6.5, 8, 8],
  ["SMH", "VanEck Semiconductor ETF", 7.5, 6.5, 9.5],
  ["VOO", "Vanguard S&P 500 ETF", 5.5, 9.5, 6],
  ["ICLN", "iShares Global Clean Energy ETF", 7, 5.5, 6.5],
  ["BTC", "Bitcoin", 8, 6, 3],
  ["ETH", "Ethereum", 8, 5.5, 4],
  ["SOL", "Solana", 8.5, 4.5, 4],
  ["LINK", "Chainlink", 8, 4.5, 6],
  ["RENDER", "Render", 8.5, 3.5, 8],
].map(([symbol, name, upside, safety, ai], order) => ({ symbol, name, upside, safety, ai, order }));

export const STACK_STAGES = [
  ["Collect", "RSS feeds fetched with conditional GET. A feed that fails two runs in a row is skipped.", "68", "src/collector/rss.ts: 50 company and 18 industry feeds"],
  ["File", "New 8-K, 10-K and 10-Q filings pulled from SEC EDGAR.", "35", "TRACKED_COMPANIES in src/collector/sec.ts"],
  ["Dedupe", "A repeated URL or near-identical headline is dropped. With embeddings switched on, stories within 0.85 cosine merge.", "0.85", "Optional stage. Without an embedding key, URL and Jaccard matching only."],
  ["Score", "Each story is rated 1 to 10 for AI-infrastructure relevance. Anything under 4 is dropped.", "<4", "Relevance from the classifier, 1 to 10. Impact is scored separately."],
  ["Sort", "A fast model files each story into one of ten sectors.", "10", "NEWS_CATEGORIES in src/processor/ai.ts"],
  ["Write", "A stronger model writes the market outlook and the day's deep-dive.", "2 tier", "gpt-oss-20b classifies, gpt-oss-120b synthesises (Groq by default)"],
  ["Check", "Every model response is parsed through a Zod schema before it is stored.", "Zod", "Classification, synthesis, SEC extraction, bear cases, thesis, earnings"],
  ["Send", "One digest per reader on Telegram, at the hour they set in the bot.", "HH:MM", "Set per reader. /digest and /last reread the latest edition."],
];

export const STACK_HEADLINES = [
  ["Utility files plan for new generation near a datacenter cluster", 8, "kept"],
  ["Hyperscaler raises full-year capex guidance", 9, "kept"],
  ["Same capex story from a second outlet", null, "dedupe"],
  ["Liquid-cooling maker adds a second plant", 7, "kept"],
  ["800G optical module shipments ramp", 7, "kept"],
  ["Phone maker teases new colours", 2, "dropped"],
  ["Foundry opens an advanced-packaging line", 8, "kept"],
  ["Lab publishes an open-weight model", 6, "kept"],
];

export const LENS_STEPS = [
  ["Collected", "KSTL closed at USD 93.90 in the 14 Oct session.", ["close", "session", "source"]],
  ["Checked", "The close matches its cross-check, so the bar is marked verified.", ["quality"]],
  ["Computed", "Python sets the levels: entry USD 93.90, stop USD 90.40, targets USD 99.15 and USD 104.40, reward to risk 3.00, size capped at 20% of equity.", ["entry", "stop", "t1", "t2", "rr", "size"]],
  ["Worded", "Any AI narrative can cite these numbers only through placeholders that Python fills.", ["narrative"]],
  ["Sent", "The briefing leaves at 07:01 MYT with the source, session date and quality status beside each figure.", ["sent", "status"]],
  ["Withdrawn", "Next morning the price sources disagree on KSTL's close. The setup comes down, and the briefing names the reason.", ["status", "reason"]],
];

export const LENS_FIELDS = [
  ["close", "Close", "93.90", "Demo feed close for the 14 Oct session"],
  ["session", "Session", "14 Oct", "Latest closed daily session. Analysis uses completed sessions only."],
  ["source", "Source", "Demo feed", "Synthetic market from lens demo export, seed 20261016"],
  ["quality", "Quality", "Verified", "Close matches its cross-check. A mismatch posts disputed_bar."],
  ["entry", "Entry", "93.90", "Entry at the signal session's close"],
  ["stop", "Stop", "90.40", "Set in Python by pullback_in_uptrend 52df5d457a0c"],
  ["t1", "Target 1", "99.15", "Set in Python by pullback_in_uptrend 52df5d457a0c"],
  ["t2", "Target 2", "104.40", "Set in Python by pullback_in_uptrend 52df5d457a0c"],
  ["rr", "Reward : risk", "3.00", "(104.40 − 93.90) / (93.90 − 90.40) = 10.50 / 3.50 = 3.00"],
  ["size", "Size", "20.0%", "Capped at 20.0% of equity by the concentration cap"],
  ["narrative", "Narrative", "{entry}", "A placeholder. Python fills it with USD 93.90."],
  ["sent", "Sent", "07:01", "Demo cycle demo1015, 15 Oct"],
  ["status", "Status", "Posted", "A setup on 15 Oct, withdrawn on 16 Oct"],
  ["reason", "Reason", "None", "Reason code disputed_bar: price sources disagree on a recent close"],
];

export const FILINGS_TOOLS = [
  ["answer_question", "A cited answer or an abstention, with the passages used."],
  ["search_filings", "Ranked passages with ticker, form, period, section and offsets."],
  ["get_financial_fact", "An exact XBRL value with unit, period, duration and source filing. Nothing is computed."],
  ["compare_filings", "One section of two filings, by topic or by what changed most. Works across a 10-K and a 10-Q."],
  ["get_passage", "An exact span by accession, section and offsets, with surrounding text and the EDGAR link."],
  ["list_coverage", "Indexed companies, filing counts, newest filing per company and when the index was last updated."],
];

// README.md, Results: held-out v1, 25 questions (eval-all-2026-11-06-heldout-v1.json, retrieval-all-2026-11-06-heldout-v1.json).
export const FILINGS_RESULTS = [
  ["Recall@10", "0.833", "≥ 0.85", false],
  ["Unanswerable questions declined", "0.50 (2 of 4)", "≥ 0.80", false],
  ["Answerable questions wrongly declined", "0.095 (2 of 21)", "≤ 0.10", true],
  ["Citation precision", "0.614", "≥ 0.90", false],
  ["Answers with unsupported numbers", "0", "0", true],
];

export const FILINGS_TICKERS = ["NVDA", "AMD", "AVGO", "MSFT", "AMZN", "GOOGL", "META", "INTC", "MU", "AMAT", "LRCX", "KLAC"];

export const REPOS = [
  ["ixtaqq/Goldirham-Insight", "Next.js 16, React 19, strict TypeScript, Tailwind CSS 4", "Quality checks on GitHub Actions, Playwright end-to-end tests", LINKS.insightRepo],
  ["ixtaqq/ai-infra-digest", "TypeScript, Supabase, pgvector, Zod, Vitest", "Scheduled pipeline runs on GitHub Actions, Vitest suite", LINKS.stackRepo],
  ["goldirham-lens-v2", "Python 3.13, PostgreSQL, SQLAlchemy, Alembic, static Next.js showcase", "One command runs what CI runs: format, lint, strict types, import contracts, tests against PostgreSQL", null],
  ["ixtaqq/goldirham-filings", "Python 3.11+, PostgreSQL full-text and pgvector, Ollama (qwen3:8b, nomic-embed-text), MCP", "CI runs ruff, mypy, a dependency audit, pytest on a fixture corpus and a retrieval gate", LINKS.filingsRepo],
];

export const RULES = [
  ["Code owns the numbers.", "Scores, levels and counts come from Python or TypeScript, never from inside a prompt."],
  ["Every figure says where it came from.", "Insight labels each price as a market feed or a simulation."],
  ["Model output is checked before it ships.", "Stack parses every model response through a schema. Filings removes any sentence whose number is not in its cited passage."],
  ["Fail closed, and say why.", "A disputed price takes the setup down and names the reason."],
  ["Silence is a valid answer.", "A morning with nothing new says so once and stops. A question the filings can't answer gets a decline, not a guess."],
];
