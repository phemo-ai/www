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

/* Live watch: pressing the crown goes to the watch face; recording carries on (the complication keeps speaking). */
const setFace = (fig, on) => { fig.dataset.state = on ? "face" : "app"; };
const press = (fig) => { fig.classList.add("press"); setTimeout(() => fig.classList.remove("press"), 170); };

/*
 * The data path scene. Steps: press the crown → face; audio token watch → iCloud → iPhone; waveform → text → to-dos;
 * Markdown token iPhone → iCloud Drive → agent; agent acts. Loops while on screen. Token paths are measured from
 * the laid-out nodes, so the same code works for the row (desktop) and the column (phone) layouts.
 */
const stage = document.querySelector("[data-stage]");
if (stage) {
  const chainEl = stage.closest("[data-chain]");
  const caps = JSON.parse(chainEl.dataset.caps || "[]");
  const capEl = chainEl.querySelector("[data-cap]");
  const watchEl = stage.querySelector("[data-watch]");
  const tok = stage.querySelector(".tok");
  const nodes = { watch: stage.querySelector(".n-watch"), cloud: stage.querySelector(".n-cloud"), phone: stage.querySelector(".n-phone"), mac: stage.querySelector(".n-mac") };
  const anchor = { watch: watchEl.querySelector(".scrwrap"), cloud: stage.querySelector(".cloudbox"), phone: stage.querySelector(".phone2"), mac: stage.querySelector(".mac") };
  const MODES = ["s-wave", "s-text", "s-todo", "s-agent"];
  let timers = [], anims = [], onScreen = false;

  const at = (ms, fn) => timers.push(setTimeout(fn, ms));
  const cap = (i) => { if (capEl) capEl.textContent = caps[i] ?? ""; };
  const on = (...names) => names.forEach((n) => nodes[n].classList.add("on"));
  const mode = (...m) => stage.classList.add(...m);
  const pulse = (n) => { nodes[n].classList.remove("pulse"); void nodes[n].offsetWidth; nodes[n].classList.add("pulse"); };
  const center = (el) => {
    const r = el.getBoundingClientRect(), s = stage.getBoundingClientRect();
    return [r.left + r.width / 2 - s.left, r.top + r.height / 2 - s.top];
  };
  // One hop along a gentle arc (up in the row layout, sideways in the column layout).
  const hop = (from, to, ms) => {
    const [x0, y0] = center(anchor[from]), [x1, y1] = center(anchor[to]);
    const row = Math.abs(x1 - x0) > Math.abs(y1 - y0);
    const cx = (x0 + x1) / 2 + (row ? 0 : 46), cy = (y0 + y1) / 2 - (row ? 56 : 0);
    const frames = [];
    for (let k = 0; k <= 16; k++) {
      const t = k / 16, u = 1 - t;
      const x = u * u * x0 + 2 * u * t * cx + t * t * x1, y = u * u * y0 + 2 * u * t * cy + t * t * y1;
      frames.push({ transform: `translate(${x.toFixed(1)}px,${y.toFixed(1)}px) scale(${(0.8 + 0.2 * Math.sin(Math.PI * t)).toFixed(3)})`, opacity: t < 0.08 || t > 0.94 ? 0 : 1 });
    }
    const a = tok.animate(frames, { duration: ms, easing: "cubic-bezier(.45,0,.35,1)", fill: "forwards" });
    anims.push(a);
    return a.finished.catch(() => {});
  };
  const travel = (path, kind) => {
    tok.classList.toggle("doc", kind === "doc");
    let p = Promise.resolve();
    path.slice(1).forEach((to, k) => {
      const from = path[k];
      p = p.then(() => { if (from === "cloud") { on("cloud"); pulse("cloud"); } return hop(from, to, k === 0 ? 1000 : 900); });
    });
    return p;
  };

  const reset = () => {
    timers.forEach(clearTimeout); timers = [];
    anims.forEach((a) => a.cancel()); anims = [];
    stage.classList.remove(...MODES);
    Object.values(nodes).forEach((n) => n.classList.remove("on", "pulse"));
    setFace(watchEl, false);
    cap(0);
  };
  const play = (fromCrown = false) => {
    reset();
    const t0 = fromCrown ? 0 : 2600;
    at(t0, () => { press(watchEl); setFace(watchEl, true); cap(1); });
    at(t0 + 1300, () => { cap(2); travel(["watch", "cloud", "phone"], "audio"); });
    at(t0 + 3400, () => { on("phone"); mode("s-wave"); cap(3); });
    at(t0 + 5000, () => { mode("s-text"); cap(4); });
    at(t0 + 7100, () => { mode("s-todo"); cap(5); });
    at(t0 + 8700, () => { cap(6); travel(["phone", "cloud", "mac"], "doc"); });
    at(t0 + 10700, () => { on("mac"); mode("s-agent"); cap(7); });
    at(t0 + 14500, () => cap(8));
    at(t0 + 18500, () => { if (onScreen) play(); });
  };

  if (reduce) {
    Object.values(nodes).forEach((n) => n.classList.add("on"));
    stage.classList.add("s-text", "s-todo", "s-agent");
    const toggle = () => { press(watchEl); setFace(watchEl, watchEl.dataset.state !== "face"); };
    watchEl.querySelector(".crown")?.addEventListener("click", toggle);
    watchEl.querySelector(".scrwrap")?.addEventListener("click", toggle);
  } else {
    new IntersectionObserver(([e]) => {
      const was = onScreen;
      onScreen = e.isIntersecting;
      if (onScreen && !was) play();
      if (!onScreen) reset();
    }, { threshold: 0.35 }).observe(stage);
    const crownPress = () => {
      if (watchEl.dataset.state === "face") { press(watchEl); reset(); at(6000, () => { if (onScreen) play(); }); }
      else play(true);
    };
    watchEl.querySelector(".crown")?.addEventListener("click", crownPress);
    watchEl.querySelector(".scrwrap")?.addEventListener("click", crownPress);
    chainEl.querySelector("[data-replay]")?.addEventListener("click", () => play());
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
