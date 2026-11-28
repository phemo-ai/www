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

/* The watch is a small, user-controlled demo. Its device artwork never changes. */
for (const el of document.querySelectorAll("[data-watch-scene]")) {
  const watch = el.querySelector("[data-watch]");
  const hints = JSON.parse(el.dataset.hints || "[]");
  const hint = el.querySelector("[data-hint]");
  const face = watch.querySelector(".wface"), app = watch.querySelector(".wapp");
  let interacted = false;
  const show = (state, recording) => {
    watch.dataset.state = state;
    watch.dataset.rec = recording ? "1" : "0";
    face.inert = state !== "face";
    app.inert = state !== "app";
    face.setAttribute("aria-hidden", String(state !== "face"));
    app.setAttribute("aria-hidden", String(state !== "app"));
    el.classList.toggle("talking", recording);
    hint.textContent = hints[state === "app" ? 1 : recording ? 3 : 0] || "";
  };
  show("face", false);
  el.addEventListener("click", (e) => {
    const button = e.target.closest?.("[data-act]");
    if (!button) return;
    const act = button.dataset.act;
    if (act === "comp") { show("app", true); app.querySelector("button")?.focus({preventScroll:true}); }
    if (act === "crown") { show("face", watch.dataset.rec === "1"); face.querySelector("button")?.focus({preventScroll:true}); }
    if (act === "screen") {
      watch.classList.remove("marked"); void watch.offsetWidth; watch.classList.add("marked");
      const flag = watch.querySelector(".flag");
      flag.textContent = flag.dataset.message;
      setTimeout(() => { watch.classList.remove("marked"); flag.textContent = ""; }, 1300);
    }
    if (!interacted) {
      interacted = true;
      setTimeout(() => { hint.classList.add("dismissed"); }, reduce ? 0 : 1800);
    }
  });
}

/* Only adjacent agent names and decorative marks loop, while visible. Content is always present. */
const loops = new Map();
for (const el of document.querySelectorAll('[data-loop="agent"]')) {
  const titles = [...el.querySelectorAll(".an")];
  const strip = el.closest(".row").querySelector(".astrip");
  let k = 0, timer;
  const show = () => {
    const id = titles[k++ % titles.length]?.dataset.agent;
    titles.forEach((x) => x.classList.toggle("is-on", x.dataset.agent === id));
    strip.querySelectorAll(".as").forEach((x) => x.classList.toggle("is-on", x.dataset.agent === id));
  };
  loops.set(el, { start() { if (!timer && !reduce) timer = setInterval(show, 2600); }, stop() { clearInterval(timer); timer = null; } });
}
const sceneIO = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    e.target.classList.toggle("motion-visible", e.isIntersecting && !document.hidden);
    const loop = loops.get(e.target);
    if (loop) e.isIntersecting && !document.hidden ? loop.start() : loop.stop();
  });
}, { threshold: 0.1 });
document.querySelectorAll("[data-watch-scene], [data-motion], [data-loop]").forEach((el) => sceneIO.observe(el));
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    loops.forEach((loop) => loop.stop());
    document.querySelectorAll(".motion-visible").forEach((el) => el.classList.remove("motion-visible"));
  } else document.querySelectorAll("[data-watch-scene], [data-motion], [data-loop]").forEach((el) => { sceneIO.unobserve(el); sceneIO.observe(el); });
});

/* Shared prompt, command and configuration copying, including a selected-text fallback. */
document.addEventListener("click", async (e) => {
  const b = e.target.closest?.("[data-copy]");
  if (!b) return;
  const zh = document.documentElement.lang.startsWith("zh");
  const label = b.textContent, ariaLabel = b.getAttribute("aria-label");
  let copied = false;
  try { await navigator.clipboard.writeText(b.dataset.copy); copied = true; }
  catch {
    const text = b.parentElement.querySelector("p, code, pre");
    if (text) {
      const range = document.createRange(); range.selectNodeContents(text);
      const selection = getSelection(); selection.removeAllRanges(); selection.addRange(range);
      try { copied = document.execCommand("copy"); } catch { /* Leave the text selected for manual copy. */ }
      if (copied) selection.removeAllRanges();
    }
  }
  b.textContent = copied ? (zh ? "已复制" : "Copied") : (zh ? "已选中" : "Selected");
  b.setAttribute("aria-label", copied ? (zh ? "已复制" : "Copied") : (zh ? "复制失败，文字已选中，请手动复制" : "Copy failed. Text selected; copy it manually."));
  b.classList.toggle("done", copied);
  setTimeout(() => {
    b.textContent = label; b.classList.remove("done");
    if (ariaLabel) b.setAttribute("aria-label", ariaLabel); else b.removeAttribute("aria-label");
  }, 1600);
});

/* Opened from the app (Handoff / AirDrop) as /agents#<id>: land on that card once fonts and layout settle. */
if (location.hash.length > 1) {
  const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
  if (target) (document.fonts?.ready ?? Promise.resolve()).then(() => target.scrollIntoView({ block: "start" }));
}
