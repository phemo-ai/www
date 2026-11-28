// Website behaviour: the animated Echo marks, the live watch (crown press → watch face), the data-path animation,
// and the header backdrop on scroll. Bundled into dist/site.js by build.mjs (mark geometry from brand/phemo-mark.mjs).
import { frame } from "../brand/phemo-mark.mjs";
document.documentElement.classList.remove("no-js");

const NS = "http://www.w3.org/2000/svg";
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const now = () => performance.now() / 1000;

/** One animated mark per <svg data-mark>. data-cycle="idle:3,speak:4.5,saved:1.4" loops through states (seconds each). */
class Mark {
  constructor(svg) {
    this.svg = svg;
    this.g = document.createElementNS(NS, "g");
    this.g.setAttribute("fill", "currentColor");
    svg.appendChild(this.g);
    this.paths = [];
    this.weight = Number(svg.dataset.weight || 1);
    this.cycle = (svg.dataset.cycle || "").split(",").filter(Boolean).map((p) => {
      const [s, d] = p.split(":");
      return [s, Number(d)];
    });
    this.state = svg.dataset.state || "idle";
    this.start = now();
  }
  draw(t) {
    let state = this.state, since = t - this.start;
    if (this.cycle.length) {
      const total = this.cycle.reduce((a, [, d]) => a + d, 0);
      let x = since % total;
      for (const [s, d] of this.cycle) { if (x < d) { state = s; since = x; break; } x -= d; }
    }
    if (reduce) { state = "still"; since = 1; }
    const level = Math.max(0, 0.55 + 0.45 * Math.sin(t * 5.3) * Math.sin(t * 1.7 + 1));
    const f = frame({ state, t, level, since, weight: this.weight });
    while (this.paths.length < f.paths.length) {
      const p = document.createElementNS(NS, "path");
      this.g.appendChild(p);
      this.paths.push(p);
    }
    this.paths.forEach((p, i) => {
      const src = f.paths[i];
      p.setAttribute("d", src ? src.d : "");
      if (src) p.setAttribute("fill-opacity", src.opacity.toFixed(3));
    });
    this.g.setAttribute("transform", f.scale === 1 ? "" : `translate(60 60) scale(${f.scale.toFixed(4)}) translate(-60 -60)`);
  }
}

const marks = [...document.querySelectorAll("svg[data-mark]")].map((s) => new Mark(s));
const visible = new Set();
const io = new IntersectionObserver((entries) => {
  for (const e of entries) {
    const m = marks.find((x) => x.svg === e.target);
    if (m) e.isIntersecting ? visible.add(m) : visible.delete(m);
  }
});
marks.forEach((m) => { io.observe(m.svg); m.draw(now()); });
(function loop() {
  if (!document.hidden) for (const m of visible) m.draw(now());
  if (!reduce) requestAnimationFrame(loop);
})();

const onScroll = () => document.documentElement.classList.toggle("scrolled", scrollY > 24);
addEventListener("scroll", onScroll, { passive: true });
onScroll();

/*
 * Opening scene (src/scene.ts): one flat page. Each part loops while it is in view:
 * record — watch face ↔ recording, the iPhone's Today screen filling in; doc — the day file's lines;
 * agent — the agent name and the lines in the terminal card. Reduced motion: final frames, no loops.
 */
const REVEAL = ["23.5%", "44%", "61%", "85.7%"];
const loops = new Map();
/*
 * The interactive watch. States: idle (face, not recording) → app (recording screen) → face (face, still
 * recording) → app … The demo advances by itself; a tap, a crown press or a tap on the screen takes over, and the
 * demo resumes after 8 s of no input. A hint bubble says what to try next, and a pulse marks the target.
 */
const record = (el) => {
  const watch = el.querySelector(".live"), reveal = el.querySelector(".reveal");
  const hints = JSON.parse(el.dataset.hints || "[]");
  const hint = el.querySelector("[data-hint]");
  let pulse = el.querySelector(".pulse");
  if (!pulse && watch) { pulse = document.createElement("span"); pulse.className = "pulse comp"; watch.appendChild(pulse); }
  let state = "idle", step = 0, auto = null, resume = null, demo = true;
  const show = (st) => {
    state = st;
    if (!watch) return;
    watch.dataset.state = st === "app" ? "app" : "face";
    watch.dataset.rec = st === "idle" ? "0" : "1";
    el.classList.toggle("talking", st !== "idle");
    const h = st === "idle" ? [hints[0], "comp"] : st === "app" ? [hints[2], "crown"] : [hints[3], "comp"];
    if (hint) { hint.textContent = h[0] ?? ""; hint.className = "hint on" + (h[1] === "crown" ? " crown" : ""); }
    if (pulse) pulse.className = "pulse " + h[1];
  };
  const progress = () => { if (reveal && state !== "idle") { step = Math.min(3, step + 1); reveal.style.top = REVEAL[step]; } };
  const next = () => (state === "idle" ? "app" : state === "app" ? "face" : "app");
  const tick = () => { show(next()); progress(); auto = setTimeout(tick, state === "app" ? 3800 : 3200); };
  const start = () => { if (!auto) { if (demo) { show("idle"); step = 0; if (reveal) reveal.style.top = REVEAL[0]; } auto = setTimeout(tick, 2400); } };
  const stop = () => { clearTimeout(auto); auto = null; };
  const user = (st) => {
    stop(); clearTimeout(resume); demo = false;
    show(st); progress();
    if (hint && state === "app") { setTimeout(() => { if (state === "app") hint.textContent = hints[1] ?? ""; }, 1800); setTimeout(() => { if (state === "app") hint.textContent = hints[2] ?? ""; }, 4200); }
    resume = setTimeout(() => { demo = false; start(); }, 8000);
  };
  const press = () => { watch?.classList.add("press"); setTimeout(() => watch?.classList.remove("press"), 170); };
  el.addEventListener("click", (e) => {
    const act = e.target.closest?.("[data-act]")?.dataset.act;
    if (!act) return;
    if (act === "comp") user("app");
    else if (act === "crown") { press(); user(state === "app" ? "face" : "app"); }
    else if (act === "screen") { watch?.classList.remove("marked"); void watch?.offsetWidth; watch?.classList.add("marked"); user("app"); }
  });
  return { start, stop: () => { stop(); clearTimeout(resume); } };
};
const once = (el) => ({ start() { el.classList.add("in"); }, stop() {} });
const agentLoop = (el, strip) => {
  const titles = [...el.querySelectorAll(".an")], marks = [...strip.querySelectorAll(".as")];
  let k = 0, t = null;
  const show = () => { const id = titles[k % titles.length]?.dataset.agent; titles.forEach((x) => x.classList.toggle("is-on", x.dataset.agent === id)); marks.forEach((x) => x.classList.toggle("is-on", x.dataset.agent === id)); k++; };
  return { start() { el.classList.add("in"); if (!t) { show(); t = setInterval(show, 1500); } }, stop() { clearInterval(t); t = null; } };
};
for (const el of document.querySelectorAll("[data-loop]")) {
  const kind = el.dataset.loop;
  loops.set(el, kind === "record" ? record(el) : kind === "agent" ? agentLoop(el, el.closest(".row").querySelector(".astrip")) : once(el));
}
if (reduce) {
  for (const [el, l] of loops) { el.classList.add("in", "talking"); if (el.dataset.loop === "agent") el.querySelector(".an")?.classList.add("is-on"); const r = el.querySelector(".reveal"); if (r) r.style.top = "85.7%"; const w = el.querySelector(".live"); if (w) { w.dataset.state = "app"; w.dataset.rec = "1"; } const h = el.querySelector("[data-hint]"); if (h) { const hs = JSON.parse(el.dataset.hints || "[]"); h.textContent = hs[2] ?? ""; h.className = "hint on crown"; } }
  // Reduced motion: the watch still responds to taps, without the demo.
  for (const [el, l] of loops) if (el.dataset.loop === "record") { /* click handlers were attached in record() */ }
} else if (loops.size) {
  const io = new IntersectionObserver((es) => es.forEach((e) => { const l = loops.get(e.target); if (l) e.isIntersecting ? l.start() : l.stop(); }), { threshold: 0.25 });
  loops.forEach((_, el) => io.observe(el));
}

/* Copy buttons (agents page): copy the command or config, then confirm for a moment. */
document.addEventListener("click", async (e) => {
  const b = e.target.closest?.("[data-copy]");
  if (!b) return;
  const label = b.textContent;
  try { await navigator.clipboard.writeText(b.dataset.copy); b.textContent = document.documentElement.lang.startsWith("zh") ? "已复制" : "Copied"; b.classList.add("done"); }
  catch { b.textContent = "⌘C"; }
  setTimeout(() => { b.textContent = label; b.classList.remove("done"); }, 1600);
});

/* Opened from the app (Handoff / AirDrop) as /agents#<id>: land on that card once fonts and layout settle. */
if (location.hash.length > 1) {
  const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
  if (target) (document.fonts?.ready ?? Promise.resolve()).then(() => target.scrollIntoView({ block: "start" }));
}
