// Website behaviour: the animated Echo marks, the home hero (Watch → iPhone → iCloud → agent), copy buttons,
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
    if (this.drawn && this.state === "still" && !this.cycle.length) return;
    this.drawn = true;
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

/* The home hero: one spoken line travels Watch → iPhone → iCloud → agent. Each press plays one finite run;
   the markup is rendered in its final state, so without JavaScript (or with reduced motion) it reads complete. */
for (const el of document.querySelectorAll("[data-journey]")) {
  const { cases, agents, href, copy } = JSON.parse(el.querySelector("[data-journey-data]").textContent);
  const q = (s) => el.querySelector(s), qa = (s) => [...el.querySelectorAll(s)];
  const zh = document.documentElement.lang.startsWith("zh");
  const stage = q(".stage"), packets = q("[data-packets]");
  const watch = q("[data-watch]"), face = q(".wface"), app = q(".wapp"), crownBtn = q(".crown");
  const FLAGS = ["s-heard", "s-saved", "s-asked", "s-done"];
  const markOf = (role) => marks.find((m) => m.svg === q(`[data-role="${role}"]`));
  const watchMark = markOf("watch-mark"), phoneMark = markOf("phone-mark");
  const setMark = (m, state) => { if (!m) return; m.state = state; m.start = now(); m.drawn = false; m.draw(now()); };
  let index = 0, agent = cases[0].agent, timers = [], started = false, inView = false, playing = false;
  const running = new Set();
  const later = (fn, ms) => timers.push(setTimeout(fn, ms));
  const stop = () => {
    timers.forEach(clearTimeout); timers = [];
    running.forEach((a) => a.cancel()); running.clear();
    packets.replaceChildren();
  };

  const showWatch = (state) => {
    const refocus = el.contains(document.activeElement) && (face.contains(document.activeElement) || app.contains(document.activeElement));
    watch.dataset.state = state;
    face.inert = state !== "face"; app.inert = state !== "app";
    face.setAttribute("aria-hidden", String(state !== "face"));
    app.setAttribute("aria-hidden", String(state !== "app"));
    if (refocus) (state === "app" ? app : face).querySelector("button")?.focus({ preventScroll: true });
  };

  /* Rails join the anchors; they are measured, so they follow any layout (one row, or stacked on a phone). */
  const rails = [0, 1, 2, 3].map((i) => [q(`[data-rail="${i}"]`), q(`[data-rail-on="${i}"]`)]);
  const layout = () => {
    const base = stage.getBoundingClientRect();
    const box = (name) => {
      const r = q(`[data-anchor="${name}"]`).getBoundingClientRect();
      return { l: r.left - base.left, r: r.right - base.left, t: r.top - base.top, b: r.bottom - base.top, cx: r.left - base.left + r.width / 2, cy: r.top - base.top + r.height / 2, h: r.height };
    };
    const w = box("watch"), c = box("cloud"), p = box("phone"), f = box("file"), a = box("agent");
    const clamp = (y, o) => Math.min(Math.max(y, o.t + Math.min(40, o.h * .2)), o.b - Math.min(40, o.h * .2));
    const h = (x1, y1, x2, y2) => { const dx = Math.max(6, (x2 - x1) * .5); return `M${x1},${y1} C${x1 + dx},${y1} ${x2 - dx},${y2} ${x2},${y2}`; };
    const v = (x1, y1, x2, y2) => { const dy = Math.max(3, (y2 - y1) * .5); return `M${x1},${y1} C${x1},${y1 + dy} ${x2},${y2 - dy} ${x2},${y2}`; };
    const d = [h(w.r + 4, clamp(c.cy, w), c.l - 3, c.cy), h(c.r + 3, c.cy, p.l + 1, clamp(c.cy, p))];
    if (f.l >= p.r - 1) d.push(h(p.r - 1, clamp(f.cy, p), f.l - 3, f.cy), h(f.r + 3, f.cy, a.l - 1, clamp(f.cy, a)));
    else d.push(v(f.cx, p.b + 2, f.cx, f.t - 2), v(f.cx, f.b + 2, f.cx, a.t - 1));
    rails.forEach(([dotted, solid], i) => { dotted.setAttribute("d", d[i]); solid.setAttribute("d", d[i]); });
  };
  const light = (i, on) => rails[i][1].classList.toggle("is-on", on);
  const packet = (i, ms) => {
    if (reduce || !inView || document.hidden) return;
    const path = rails[i][0], length = path.getTotalLength();
    if (!length) return;
    const dot = document.createElementNS(NS, "circle");
    dot.setAttribute("r", "3.5");
    packets.appendChild(dot);
    const n = 24;
    const frames = Array.from({ length: n + 1 }, (_, k) => {
      const pt = path.getPointAtLength(length * k / n);
      return { transform: `translate(${pt.x}px,${pt.y}px)`, opacity: k === 0 || k === n ? 0 : 1 };
    });
    const a = dot.animate(frames, { duration: ms, easing: "ease-in-out" });
    running.add(a);
    a.onfinish = a.oncancel = () => { running.delete(a); dot.remove(); };
  };

  const parts = (text) => (zh ? Array.from(text) : text.match(/\S+\s*/g) || [text]);
  const type = (target, text, start, duration) => {
    const p = parts(text);
    p.forEach((_, i) => later(() => { target.textContent = p.slice(0, i + 1).join(""); }, start + duration * (i + 1) / p.length));
  };

  const meta = () => {
    const u = cases[index], a = agents[agent];
    q("[data-active-agent]").textContent = a.name;
    q("[data-active-mark]").innerHTML = a.mark;
    q("[data-active-mark]").classList.toggle("dark", a.dark);
    q("[data-active-link]").href = `${href}#${agent}`;
    q("[data-case-title]").textContent = u.title;
    q("[data-spoken-time]").textContent = u.time;
    q("[data-phone-time]").textContent = u.time;
    q("[data-prompt-text]").textContent = u.prompt;
    q("[data-copy]").dataset.copy = u.prompt;
    q("[data-deliverable]").innerHTML = u.deliverable;
    qa("[data-play-case]").forEach((b) => b.setAttribute("aria-pressed", String(+b.dataset.playCase === index)));
    qa("[data-play-agent]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.playAgent === agent)));
    const pill = q(`[data-play-case="${index}"]`);
    if (pill.parentElement.scrollWidth > pill.parentElement.clientWidth) pill.parentElement.scrollTo({ left: pill.offsetLeft - 12, behavior: reduce ? "auto" : "smooth" });
  };
  const finish = () => {
    playing = false;
    el.classList.add(...FLAGS); el.dataset.stage = "done";
    rails.forEach((_, i) => light(i, true));
    q("[data-spoken]").textContent = cases[index].line;
    q("[data-phone-text]").textContent = cases[index].line;
    q("[data-transcript-status]").textContent = copy.final;
    q("[data-cloud-status]").textContent = copy.synced;
    q("[data-agent-status]").textContent = copy.done;
    q("[data-simulate-label]").textContent = copy.again;
    setMark(watchMark, "idle"); setMark(phoneMark, "still");
  };
  const play = (i, who = cases[i].agent) => {
    stop(); started = true; index = i; agent = who; meta();
    watch.dataset.rec = "1"; showWatch("app");
    if (reduce) { finish(); return; }
    const line = cases[index].line, n = parts(line).length;
    const D = Math.min(2400, Math.max(1300, n * (zh ? 62 : 150)));
    playing = true;
    el.classList.remove(...FLAGS); el.dataset.stage = "recording";
    rails.forEach(([, solid]) => { solid.style.transition = "none"; solid.classList.remove("is-on"); });
    void stage.offsetWidth;
    rails.forEach(([, solid]) => { solid.style.transition = ""; });
    q("[data-spoken]").textContent = ""; q("[data-phone-text]").textContent = "";
    q("[data-transcript-status]").textContent = copy.volatile;
    q("[data-cloud-status]").textContent = copy.syncing;
    q("[data-agent-status]").textContent = copy.wait;
    q("[data-simulate-label]").textContent = copy.again;
    setMark(watchMark, "speak"); setMark(phoneMark, "write");

    // Speaking: audio leaves the watch in small packets while it is still being said; the phone's text trails by a beat.
    light(0, true); light(1, true);
    type(q("[data-spoken]"), line, 80, D);
    type(q("[data-phone-text]"), line, 480, D);
    for (let t = 120; t < D + 150; t += 230) later(() => { packet(0, 420); later(() => packet(1, 420), 300); }, t);
    const heard = D + 700;
    later(() => {
      el.classList.add("s-heard"); el.dataset.stage = "saving";
      q("[data-phone-text]").textContent = line;
      q("[data-transcript-status]").textContent = copy.final;
      q("[data-cloud-status]").textContent = copy.synced;
      setMark(watchMark, "idle"); setMark(phoneMark, "saved");
      light(2, true); packet(2, 560);
    }, heard);
    later(() => { el.classList.add("s-saved"); setMark(phoneMark, "still"); }, heard + 560);
    later(() => {
      el.classList.add("s-asked"); el.dataset.stage = "reading";
      q("[data-agent-status]").textContent = copy.reading;
      light(3, true); packet(3, 620); later(() => packet(3, 620), 240);
    }, heard + 1150);
    later(() => { el.dataset.stage = "working"; q("[data-agent-status]").textContent = copy.working; }, heard + 2050);
    later(finish, heard + 3250);
  };

  const pressCrown = () => {
    crownBtn.classList.add("pressed");
    showWatch(watch.dataset.state === "app" ? "face" : "app");
    if (reduce) return;
    // The crown travels inward and springs back, the case gives a little, and a ring leaves the point of contact.
    q(".cimg").animate([{ transform: "translateX(0) scaleX(1)" }, { transform: "translateX(-34%) scaleX(.82)", offset: .28 }, { transform: "translateX(6%) scaleX(1)", offset: .7 }, { transform: "translateX(0) scaleX(1)" }], { duration: 460, easing: "cubic-bezier(.2,.8,.3,1)" });
    watch.animate([{ transform: "translateX(0)" }, { transform: "translateX(-1.6%)", offset: .28 }, { transform: "translateX(.4%)", offset: .7 }, { transform: "translateX(0)" }], { duration: 460, easing: "cubic-bezier(.2,.8,.3,1)" });
    crownBtn.animate([{ opacity: .9, transform: "scale(.35)" }, { opacity: 0, transform: "scale(1.9)" }], { duration: 560, easing: "ease-out", pseudoElement: "::after" });
  };

  el.addEventListener("click", (e) => {
    const b = e.target.closest("button");
    if (!b || b.matches("[data-copy]")) return;
    if (b.matches("[data-simulate]") || b.dataset.act === "screen" || b.dataset.act === "comp") play(started ? (index + 1) % cases.length : 0);
    else if (b.matches("[data-play-case]")) play(+b.dataset.playCase);
    else if (b.matches("[data-play-agent]")) play(agents[b.dataset.playAgent].play, b.dataset.playAgent);
    else if (b.dataset.act === "crown") pressCrown();
  });
  q("[data-agent-status]").setAttribute("role", "status");
  q(".tapscr").setAttribute("aria-label", copy.simulate);
  crownBtn.setAttribute("aria-label", zh ? "按下表冠" : "Press the Digital Crown");

  layout();
  new ResizeObserver(layout).observe(stage);
  document.fonts?.ready.then(layout);
  const settle = () => { if (playing) { stop(); finish(); } else running.forEach((a) => a.cancel()); };
  new IntersectionObserver(([e]) => {
    inView = e.isIntersecting;
    if (!inView) settle();
    else if (!started && !reduce && !document.hidden) play(0);
  }, { threshold: .3 }).observe(stage);
  document.addEventListener("visibilitychange", () => { if (document.hidden) settle(); });
  if (reduce) { showWatch("app"); watch.dataset.rec = "1"; }
}

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
