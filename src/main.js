import {
  PRODUCTS,
  ASSETS,
  STACK_STAGES,
  STACK_HEADLINES,
  LENS_STEPS,
  LENS_FIELDS,
  FILINGS_TOOLS,
  FILINGS_RESULTS,
  FILINGS_TICKERS,
  REPOS,
  RULES,
} from "./data.js";
import { createLoom, MOTIF } from "./cloth.js";

const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const $ = (sel) => document.querySelector(sel);
const el = (tag, attrs = {}, ...kids) => {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === "class") node.className = v;
    else if (k === "text") node.textContent = v;
    else node.setAttribute(k, v);
  }
  node.append(...kids);
  return node;
};

const arrow = () => {
  const t = document.createElement("template");
  t.innerHTML = `<svg class="arrow" viewBox="0 0 12 12" width="11" height="11" aria-hidden="true" focusable="false"><path d="M3.5 8.5 8.5 3.5M4.5 3.5h4v4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="square"/></svg>`;
  return t.content.firstChild;
};

const SHORT_SOURCE = {
  insight: "lib/assets.ts",
  stack: "src/collector/rss.ts",
  lens: "daily.yml",
  filings: "scripts/setup.ps1",
};

/* ---------- ledger + doors ---------- */
const ledger = $("#ledger");
for (const p of PRODUCTS) {
  ledger.append(
    el(
      "li",
      { "data-product": p.id },
      el("div", { class: "ledger-top" }, el("span", { class: "name", text: p.name }), el("span", { class: "code", text: p.code })),
      el("span", { class: "fig", text: p.figure }),
      el("span", { class: "unit", text: p.unit }),
      el("span", { class: "src", text: SHORT_SOURCE[p.id] }),
      el("a", { class: "open", href: p.href }, `Open ${p.name} `, arrow()),
    ),
  );
}

const doors = $("#doors");
for (const p of PRODUCTS) {
  doors.append(
    el(
      "li",
      {},
      el(
        "a",
        { href: p.href, "data-product": p.id },
        el("span", { class: "code", text: p.code }),
        el("span", { class: "name", text: `Open ${p.name}` }),
        arrow(),
        el("span", { class: "host", text: p.host }),
      ),
    ),
  );
}

/* ---------- Insight board ---------- */
const weights = { upside: 3, safety: 3, ai: 3 };
const WEIGHT_LABELS = [
  ["upside", "Upside"],
  ["safety", "Safety"],
  ["ai", "AI exposure"],
];
const weightBox = $("#weights");
for (const [key, label] of WEIGHT_LABELS) {
  const input = el("input", { type: "range", id: `w-${key}`, min: "0", max: "5", step: "1", value: String(weights[key]) });
  const out = el("output", { for: `w-${key}`, text: String(weights[key]) });
  input.style.setProperty("--p", `${(weights[key] / 5) * 100}%`);
  input.addEventListener("input", () => {
    weights[key] = Number(input.value);
    out.textContent = input.value;
    input.style.setProperty("--p", `${(weights[key] / 5) * 100}%`);
    renderBoard();
  });
  weightBox.append(el("div", { class: "weight" }, el("label", { for: `w-${key}`, text: label }), out, input));
}

const tbody = $("#board tbody");
const rows = new Map();
let showAll = false;
let focusSymbol = null;

const fmt = (n) => n.toFixed(1);
const blendOf = (a) => {
  const total = weights.upside + weights.safety + weights.ai;
  return total === 0 ? null : (a.upside * weights.upside + a.safety * weights.safety + a.ai * weights.ai) / total;
};
const formulaOf = (a) => {
  const total = weights.upside + weights.safety + weights.ai;
  return `${a.symbol}: (U ${fmt(a.upside)}×${weights.upside} + S ${fmt(a.safety)}×${weights.safety} + AI ${fmt(a.ai)}×${weights.ai}) / ${total} = ${blendOf(a).toFixed(2)}`;
};

for (const a of ASSETS) {
  const tr = el(
    "tr",
    { tabindex: "0", "data-symbol": a.symbol },
    el("td", { class: "rank" }),
    el("td", {}, el("span", { class: "sym", text: a.symbol }), el("span", { class: "asset-name", text: a.name })),
    el("td", { class: "num", text: fmt(a.upside) }),
    el("td", { class: "num", text: fmt(a.safety) }),
    el("td", { class: "num", text: fmt(a.ai) }),
    el("td", { class: "num blend" }),
  );
  const show = () => {
    focusSymbol = a.symbol;
    for (const r of rows.values()) r.classList.toggle("is-focus", r === tr);
    $("#formula").textContent = blendOf(a) === null ? "" : formulaOf(a);
  };
  tr.addEventListener("mouseenter", show);
  tr.addEventListener("focus", show);
  rows.set(a.symbol, tr);
}

function renderBoard() {
  const empty = weights.upside + weights.safety + weights.ai === 0;
  $("#board").hidden = empty;
  $("#board-empty").hidden = !empty;
  $("#board-more").hidden = empty;
  $("#blend-link").href = `https://goldirham-insight.vercel.app/?rank=custom&w=${weights.upside}-${weights.safety}-${weights.ai}`;
  if (empty) {
    $("#formula").textContent = "";
    return;
  }

  const before = new Map();
  for (const [sym, tr] of rows) if (!tr.hidden) before.set(sym, tr.getBoundingClientRect().top);

  const ranked = [...ASSETS].sort((x, y) => {
    const d = blendOf(y) - blendOf(x);
    return Math.abs(d) > 1e-9 ? d : x.order - y.order;
  });
  ranked.forEach((a, i) => {
    const tr = rows.get(a.symbol);
    tr.children[0].textContent = String(i + 1).padStart(2, "0");
    tr.children[5].textContent = blendOf(a).toFixed(2);
    tr.hidden = !showAll && i >= 10;
    tbody.append(tr);
  });

  const lead = ASSETS.find((a) => a.symbol === (focusSymbol ?? ranked[0].symbol));
  $("#formula").textContent = formulaOf(lead);

  if (reduced) return;
  for (const [sym, top] of before) {
    const tr = rows.get(sym);
    if (tr.hidden) continue;
    const delta = top - tr.getBoundingClientRect().top;
    if (Math.abs(delta) < 1) continue;
    for (const anim of tr.getAnimations()) anim.cancel();
    tr.animate([{ transform: `translateY(${delta}px)` }, { transform: "translateY(0)" }], {
      duration: 220,
      easing: "cubic-bezier(0.23, 1, 0.32, 1)",
    });
  }
}

$("#board-more").addEventListener("click", (e) => {
  showAll = !showAll;
  e.currentTarget.textContent = showAll ? "Show top 10" : "Show all 26";
  e.currentTarget.setAttribute("aria-expanded", String(showAll));
  renderBoard();
});
renderBoard();

/* ---------- Stack ---------- */
const pipeline = $("#pipeline");
for (const [name, desc, n, src] of STACK_STAGES) {
  pipeline.append(
    el(
      "li",
      {},
      el("span", { class: "stage-n", text: n }),
      el(
        "div",
        {},
        el("span", { class: "stage-name", text: name }),
        el("p", { class: "stage-desc", text: desc }),
        el("span", { class: "src", text: src }),
      ),
    ),
  );
}

const headlines = $("#headlines");
for (const [text, score, fate] of STACK_HEADLINES) {
  const why =
    fate === "kept"
      ? `Relevance ${score} of 10: kept`
      : fate === "dropped"
        ? `Relevance ${score} of 10: dropped, under 4`
        : "Not scored: dropped at dedupe, before scoring";
  headlines.append(
    el(
      "li",
      { class: fate === "kept" ? "" : "is-out" },
      el("span", { class: "score", text: score === null ? "--" : String(score) }),
      el("span", { class: "h", text }),
      el("span", { class: "why", text: why }),
    ),
  );
}

/* ---------- Lens ---------- */
const stepsBox = $("#steps");
const fieldEls = new Map();
const grid = $("#ticket-grid");
for (const [key, label, value, src] of LENS_FIELDS) {
  const v = el("span", { class: "v", text: value });
  const node = el("div", { class: "field" }, el("dt", { text: label }), el("dd", {}, v, el("span", { class: "src", text: src })));
  fieldEls.set(key, { node, v, value });
  grid.append(node);
}

let step = 0;
let playTimer = null;
const stepButtons = LENS_STEPS.map(([name], i) => {
  const b = el("button", { type: "button", class: `step${i === 5 ? " is-miss" : ""}`, "aria-pressed": "false", text: name });
  b.addEventListener("click", () => {
    stopPlay();
    setStep(i);
  });
  stepsBox.append(b);
  return b;
});

function setStep(i) {
  step = i;
  stepButtons.forEach((b, j) => {
    b.setAttribute("aria-pressed", String(j === i));
    b.classList.toggle("is-done", j < i);
  });
  $("#step-text").textContent = LENS_STEPS[i][1];
  const lit = new Set(LENS_STEPS.slice(0, i + 1).flatMap((s) => s[2]));
  const hot = new Set(LENS_STEPS[i][2]);
  const withdrawn = i === 5;
  for (const [key, f] of fieldEls) {
    f.node.classList.toggle("is-lit", lit.has(key));
    f.node.classList.toggle("is-hot", hot.has(key) && !withdrawn);
    const miss = withdrawn && (key === "status" || key === "reason");
    f.node.classList.toggle("is-miss", miss);
    if (key === "status") f.v.textContent = withdrawn ? "Withdrawn" : f.value;
    else if (key === "reason") f.v.textContent = withdrawn ? "disputed_bar" : f.value;
  }
}

function stopPlay() {
  clearInterval(playTimer);
  playTimer = null;
}

$("#replay").addEventListener("click", () => {
  stopPlay();
  setStep(0);
  playTimer = setInterval(() => {
    if (step >= LENS_STEPS.length - 1) return stopPlay();
    setStep(step + 1);
  }, 1300);
});
setStep(0);

/* ---------- Filings ---------- */
const QA = {
  answered: {
    q: "What did NVIDIA report as Data Center revenue in its 10-Q for the quarter ended July 26, 2026?",
    a: "NVIDIA reported Data Center revenue of $89,023 million for the quarter ended July 26, 2026.",
  },
  abstained: {
    q: "What did NVIDIA report as Data Center revenue for the quarter ended October 31, 2027?",
    a: "The filings in the index don't answer this.",
  },
};
const PASSAGE = `(Unaudited)
(In millions)
Revenue by Market Platform
Data Center | $ | 89,023 | $ | 41,096 | $ | 164,269 | $ | 80,208
Hyperscale | 48,710 | 24,168 | 91,761 | 46,428
AI Clouds, Industrial, & Enterprise | 40,313 | 16,928 | 72,508 | 33,780`;

function renderQA(kind) {
  const box = $("#qa");
  box.replaceChildren();
  box.classList.toggle("is-declined", kind === "abstained");
  box.append(el("p", { class: "qa-q", text: QA[kind].q }));
  if (kind === "answered") {
    box.append(
      el("p", { class: "qa-a" }, QA[kind].a, el("a", { class: "cite", href: "#passage-1", "aria-label": "Citation 1", text: "1" })),
    );
    const pre = el("pre", {});
    const [head, rest] = PASSAGE.split("89,023");
    pre.append(head, el("mark", { text: "89,023" }), rest);
    box.append(
      el(
        "div",
        { class: "passage", id: "passage-1" },
        el(
          "p",
          { class: "passage-ref" },
          el("b", { text: "1 " }),
          "NVDA 10-Q, period ended 2026-07-26, Part I Item 1, characters 55,068 to 56,837",
        ),
        pre,
        el(
          "a",
          { class: "link", href: "https://www.sec.gov/Archives/edgar/data/1045810/000104581026000075/nvda-20260726.htm" },
          "Open the filing on EDGAR ",
          arrow(),
        ),
      ),
    );
  } else {
    box.append(el("p", { class: "qa-a", text: QA[kind].a }));
    box.append(
      el("p", { class: "qa-note", text: "No borrowed quarter and no guess. The note gives the reason: no indexed filing matches the question." }),
    );
  }
}
for (const b of document.querySelectorAll(".switch-btn")) {
  b.addEventListener("click", () => {
    for (const o of document.querySelectorAll(".switch-btn")) o.setAttribute("aria-pressed", String(o === b));
    renderQA(b.dataset.qa);
  });
}
renderQA("answered");

const tools = $("#tools");
for (const [name, desc] of FILINGS_TOOLS) tools.append(el("dt", { text: name }), el("dd", { text: desc }));

const results = $("#results tbody");
for (const [metric, value, targetText, met] of FILINGS_RESULTS) {
  results.append(
    el(
      "tr",
      { class: met ? "" : "is-miss" },
      el("td", { text: metric }),
      el("td", { class: "num", text: value }),
      el("td", { class: "num", text: targetText }),
      el("td", { class: met ? "met" : "missed" }, el("span", { class: "mark", "aria-hidden": "true" }), met ? "Met" : "Missed"),
    ),
  );
}

const tickers = $("#tickers");
for (const t of FILINGS_TICKERS) tickers.append(el("li", { text: t }));

$("#copy").addEventListener("click", async (e) => {
  const btn = e.currentTarget;
  try {
    await navigator.clipboard.writeText($("#quickstart").textContent);
    btn.textContent = "Copied";
  } catch {
    btn.textContent = "Select the text to copy";
  }
  setTimeout(() => (btn.textContent = "Copy"), 1800);
});

/* ---------- Code ---------- */
const repos = $("#repos tbody");
for (const [name, built, checks, href] of REPOS) {
  repos.append(
    el(
      "tr",
      {},
      el("td", { text: name }),
      el("td", { text: built }),
      el("td", { text: checks }),
      el("td", {}, href ? el("a", { href, text: "GitHub" }) : el("span", { class: "private", text: "Private" })),
    ),
  );
}
const rules = $("#rules");
for (const [head, body] of RULES) rules.append(el("li", {}, el("strong", { text: head }), el("span", { text: body })));

/* ---------- loom choreography ---------- */
const canvas = $("#loom");
const loom = createLoom(canvas, { reduced });
if (!loom) document.documentElement.classList.add("no-webgl");

const SECTION_MOTIF = { hero: MOTIF.hero, insight: MOTIF.insight, stack: MOTIF.stack, lens: MOTIF.lens, filings: MOTIF.filings, code: MOTIF.hero, end: MOTIF.hero };
const POSES = {
  hero: { rx: -0.42, ry: 0, rz: 0.06, x: 0, y: 0, billow: 1, shade: 0, shadeX: 0.6, heroShade: 1 },
  insight: { rx: -0.25, ry: -0.32, rz: 0.02, x: 2.2, y: 0.2, billow: 0.7, shade: 1, shadeX: 0.62, heroShade: 0 },
  stack: { rx: -0.5, ry: 0.28, rz: -0.05, x: 2.0, y: -0.2, billow: 0.8, shade: 1, shadeX: 0.6, heroShade: 0 },
  lens: { rx: -0.2, ry: -0.2, rz: 0.08, x: 2.4, y: 0.1, billow: 0.6, shade: 1, shadeX: 0.64, heroShade: 0 },
  filings: { rx: -0.55, ry: 0.18, rz: -0.03, x: 2.0, y: 0, billow: 0.75, shade: 1, shadeX: 0.64, heroShade: 0 },
  code: { rx: -0.35, ry: 0, rz: 0, x: 0, y: 0, billow: 0.5, shade: 1, shadeX: 1.2, heroShade: 0 },
  end: { rx: -0.42, ry: 0, rz: 0.06, x: 0, y: 0, billow: 1, shade: 0.4, shadeX: 0.9, heroShade: 0.7 },
};
const narrow = () => window.innerWidth < 900;
const poseFor = (id) => (narrow() && id !== "hero" ? { ...POSES[id], x: 0, shade: 0.8, shadeX: 1.2 } : POSES[id]);

let current = "hero";
let hoverProduct = null;
let hoverTimer = null;

function applyMotif() {
  if (!loom) return;
  loom.setMotif(hoverProduct ? MOTIF[hoverProduct] : SECTION_MOTIF[current]);
}

function setSection(id) {
  if (id === current) return;
  current = id;
  for (const a of document.querySelectorAll("[data-nav]")) {
    const on = a.dataset.nav === id;
    a.classList.toggle("is-current", on);
    if (on) a.setAttribute("aria-current", "true");
    else a.removeAttribute("aria-current");
  }
  if (loom) loom.setPose(poseFor(id));
  applyMotif();
}

const observer = new IntersectionObserver(
  (entries) => {
    for (const e of entries) if (e.isIntersecting) setSection(e.target.dataset.section);
  },
  { rootMargin: "-45% 0px -45% 0px" },
);
for (const s of document.querySelectorAll("[data-section]")) observer.observe(s);

for (const node of document.querySelectorAll("[data-product]")) {
  const enter = () => {
    clearTimeout(hoverTimer);
    hoverProduct = node.dataset.product;
    applyMotif();
  };
  const leave = () => {
    clearTimeout(hoverTimer);
    hoverTimer = setTimeout(() => {
      hoverProduct = null;
      applyMotif();
    }, 140);
  };
  node.addEventListener("pointerenter", enter);
  node.addEventListener("pointerleave", leave);
  node.addEventListener("focusin", enter);
  node.addEventListener("focusout", leave);
}

const nav = $(".nav");
const fell = $(".fell-line");
function onScroll() {
  const y = window.scrollY;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  fell.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
  nav.classList.toggle("is-solid", y > 24);
  if (loom) loom.setWeave((y / window.innerHeight) * 0.09);
}
window.addEventListener("scroll", onScroll, { passive: true });
window.addEventListener("resize", () => loom && loom.setPose(poseFor(current)));
window.addEventListener("pointermove", (e) => loom && loom.pointer(e.clientX, e.clientY), { passive: true });
onScroll();

if (loom) {
  loom.setPose(poseFor("hero"));
  loom.start();
}
