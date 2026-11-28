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
 * Opening scene (src/scene.ts). Desktop: scroll position picks a step; CSS dissolves between shots and plays the
 * screen content. Phones and reduced motion: still panels that fade in. Devices themselves never move.
 */
const STEPS = [0, 0.07, 0.15, 0.23, 0.31, 0.43, 0.59, 0.75, 0.9];
const REVEAL = ["23.5%", "23.5%", "44%", "61%", "85.7%"];
const stageEl = document.querySelector("[data-scene]");
const sticky = stageEl?.closest(".sc-sticky");
const rotate = (root, ms) => {
  const titles = [...root.querySelectorAll(".an")];
  const strip = [...root.querySelectorAll(".as")];
  let k = 0, timer = null;
  const show = () => {
    const id = titles[k % titles.length]?.dataset.agent;
    titles.forEach((t) => t.classList.toggle("is-on", t.dataset.agent === id));
    strip.forEach((t) => t.classList.toggle("is-on", t.dataset.agent === id));
    k++;
  };
  return { start() { if (!timer) { show(); timer = setInterval(show, ms); } }, stop() { clearInterval(timer); timer = null; } };
};
if (stageEl && sticky && getComputedStyle(sticky).display !== "none") {
  const caps = JSON.parse(stageEl.dataset.caps || "[]");
  const cap = stageEl.querySelector("[data-cap]");
  const shots = [...stageEl.querySelectorAll(".shot")];
  const watch = stageEl.querySelector(".s1 .live");
  const reveal = stageEl.querySelector(".s1 .reveal");
  const agents = rotate(stageEl.querySelector(".s4"), 1500);
  let step = -1;
  const shotFor = (s) => (s <= 4 ? 0 : s === 5 ? 1 : s === 6 ? 2 : 3);
  const apply = (s) => {
    stageEl.dataset.step = String(s);
    shots.forEach((el, i) => el.classList.toggle("on", i === shotFor(s)));
    if (watch) watch.dataset.state = s === 1 ? "app" : "face";
    if (reveal) reveal.style.top = REVEAL[Math.min(s, 4)];
    if (cap) { cap.classList.add("out"); setTimeout(() => { cap.textContent = caps[s] ?? ""; cap.classList.remove("out"); }, 220); }
    s >= 7 ? agents.start() : agents.stop();
  };
  const onScroll = () => {
    const r = sticky.getBoundingClientRect();
    const p = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height - innerHeight)));
    let s = 0;
    STEPS.forEach((t, i) => { if (p >= t) s = i; });
    if (s !== step) { step = s; apply(s); }
  };
  let ticking = false;
  addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(() => { ticking = false; onScroll(); }); } }, { passive: true });
  addEventListener("resize", onScroll);
  onScroll();
}
const story = document.querySelector(".sc-story");
if (story && getComputedStyle(story).display !== "none") {
  const panels = [...story.querySelectorAll(".panel")];
  if (reduce) panels.forEach((p) => p.classList.add("in"));
  else {
    const io2 = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io2.unobserve(e.target); } }), { threshold: 0.2 });
    panels.forEach((p) => io2.observe(p));
    const last = panels[panels.length - 1];
    if (last) rotate(last, 1500).start();
  }
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
