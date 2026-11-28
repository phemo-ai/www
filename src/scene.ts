/**
 * The home hero: one figure that plays a spoken line from the Apple Watch, through the user's own iCloud,
 * to the iPhone (transcript) and on to their own agent, ending in a finished result.
 * Rendered in its final state (works without JavaScript); site-client/main.mjs replays it on demand.
 */
import { AGENTS, agentMark } from "./agents";
import { liveWatch } from "./live";
import { USE_CASES, preview } from "./usecases";

type Lang = "zh" | "en";
const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

const FILE = "2026-11-28.md";

const COPY = {
  zh: {
    h1: ["说一句，", "你的 agent 就去办。"],
    sub: "手表听见，iPhone 本地转写，原话只进你自己的 iCloud；你常用的 agent 读到后直接交付成果。",
    soon: "即将上架 App Store", fine: "无 Phemo 服务器 · 无账号 · 免费",
    label: "从说一句话到拿到成果的演示",
    steps: ["手表录音", "iPhone 本地转写", "你的 agent 交付"],
    simulate: "模拟说一段话", again: "再说一段", hint: "轻点表盘也能开始 · 表冠可以按",
    today: "今天", date: "11 月 28 日 · 周六", live: "手表录音中", volatile: "正在转写…", final: "已定稿",
    saved: "已存入 iCloud", old: [["09:12", "周会改到下午三点，会议室我来订。"], ["08:40", "记得给车续保险。"]],
    cloud: "你的 iCloud", account: "只在你的账户里", drive: "iCloud 云盘", daily: "每天一份 Markdown", syncing: "同步中…", synced: "已同步",
    connect: ["", "连接方法"], ask: "你对它说", sample: "示意",
    wait: "等你说完…", reading: `正在读取 ${FILE}…`, working: "正在完成工作…", done: "交付已备好",
    copy: "复制", cases: "换个场景", wall: "22 个 agent 都能接，点一个试试", play: "播放",
  },
  en: {
    h1: ["Say it once. ", "Your agent gets it done."],
    sub: "Your Watch hears it. Your iPhone transcribes on device, into your own iCloud. The agent you already use does the work.",
    soon: "Coming to the App Store", fine: "No Phemo server · No account · Free",
    label: "Demo: from a spoken line to a finished result",
    steps: ["Watch records", "iPhone transcribes on device", "Your agent delivers"],
    simulate: "Simulate speaking", again: "Say another", hint: "Tap the watch · Press the crown",
    today: "Today", date: "Sat, Nov 28", live: "Recording on Watch", volatile: "Transcribing…", final: "Final",
    saved: "Saved to iCloud", old: [["09:12", "Move the weekly sync to three, I'll book the room."], ["08:40", "Remember to renew the car insurance."]],
    cloud: "Your iCloud", account: "Only in your account", drive: "iCloud Drive", daily: "One Markdown file a day", syncing: "Syncing…", synced: "Synced",
    connect: ["How to ", "connect"], ask: "You ask", sample: "Example",
    wait: "Waiting for you…", reading: `Reading ${FILE}…`, working: "Working…", done: "Ready for review",
    copy: "Copy", cases: "Try another", wall: "Works with 22 agents. Tap one.", play: "Play",
  },
};

/** Short names for the eight outcomes (USE_CASES order). */
const SHORT: Record<string, [string, string]> = {
  proposal: ["方案报价", "Proposal"], bugfix: ["修 bug", "Bug fix"], crm: ["更新 CRM", "CRM"], research: ["研究报告", "Research"],
  doctor: ["就诊清单", "Care plan"], lecture: ["课堂笔记", "Study kit"], family: ["家庭安排", "Family"], weekly: ["周报", "Weekly"],
};
/** The agent that performs each outcome by default, per language. */
const CASE_AGENT: Record<Lang, string[]> = {
  zh: ["workbuddy", "trae", "workbuddy", "kimi-code", "cherry-studio", "qwen-code", "workbuddy", "codebuddy"],
  en: ["claude-desktop", "claude-code", "goose", "codex", "lm-studio", "gemini-cli", "claude-desktop", "cursor"],
};
/** The outcome each agent plays when its icon is pressed. */
const AGENT_CASE: Record<string, string> = {
  "claude-code": "bugfix", "claude-desktop": "proposal", codex: "research", cursor: "weekly", vscode: "bugfix", windsurf: "bugfix",
  "gemini-cli": "lecture", zed: "bugfix", cline: "research", kiro: "proposal", goose: "crm", "lm-studio": "doctor", jetbrains: "bugfix",
  workbuddy: "proposal", codebuddy: "weekly", trae: "bugfix", qoder: "bugfix", "kimi-code": "research", "qwen-code": "lecture",
  iflow: "family", "cherry-studio": "doctor", comate: "bugfix",
};

const CLOUD = '<svg viewBox="0 0 64 44" aria-hidden="true"><path d="M17 38a13 13 0 0 1-2-26 18 18 0 0 1 34-1 14 14 0 0 1-1 27Z" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"/><path d="M28 25v-3a4 4 0 0 1 8 0v3m-9.5 0h11v8.5h-11Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>';
const MIC = '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="9" y="3" width="6" height="11" rx="3" fill="currentColor"/><path d="M6 11a6 6 0 0 0 12 0M12 17v3" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/></svg>';
const bars = (n: number) => Array.from({ length: n }, (_, i) => `<i style="--i:${i};--h:${35 + ((i * 37) % 65)}%"></i>`).join("");

export function scene(lang: Lang) {
  const c = COPY[lang], l = lang === "zh" ? 0 : 1;
  const agentsHref = lang === "zh" ? "/agents" : "/en/agents";
  const name = (id: string) => AGENTS.find((a) => a.id === id)!.name;
  const cases = USE_CASES.map((u, i) => ({
    id: u.id, title: u.title[l]!, short: SHORT[u.id]![l]!, time: u.time[l]!, line: u.line[l]!, prompt: u.prompt[l]!,
    agent: CASE_AGENT[lang][i]!, deliverable: preview(u.id, lang),
  }));
  const first = cases[0]!;
  // The reader's own market first.
  const wall = [...AGENTS].sort((a, b) => Number(a.group !== (lang === "zh" ? "cn" : "intl")) - Number(b.group !== (lang === "zh" ? "cn" : "intl")));
  const step = (n: number) => `<p class="step"><i>${n + 1}</i>${c.steps[n]}</p>`;
  const data = {
    cases,
    agents: Object.fromEntries(AGENTS.map((a) => [a.id, { name: a.name, mark: agentMark(a.id, 24), dark: a.id === "lm-studio", play: USE_CASES.findIndex((u) => u.id === AGENT_CASE[a.id]) }])),
    href: agentsHref,
    copy: { simulate: c.simulate, again: c.again, volatile: c.volatile, final: c.final, syncing: c.syncing, synced: c.synced, wait: c.wait, reading: c.reading, working: c.working, done: c.done },
  };

  return `<section class="journey s-heard s-saved s-asked s-done" data-journey data-stage="done" aria-label="${c.label}">
<div class="j-head">
<div><h1>${c.h1.map((p) => `<span>${p}</span>`).join("")}</h1><p class="j-sub">${c.sub}</p></div>
<div class="j-cta"><span class="pill store">${c.soon}</span><small>${c.fine}</small></div>
</div>
<div class="stage">
<svg class="rails" aria-hidden="true">${[0, 1, 2, 3].map((i) => `<path class="rail" data-rail="${i}"/><path class="rail-on is-on" data-rail-on="${i}" pathLength="1"/>`).join("")}<g data-packets></g></svg>

<div class="st st-watch">${step(0)}<div class="st-body">
<div class="bubble"><div class="bubble-top"><time data-spoken-time>${esc(first.time)}</time><span class="bars" aria-hidden="true">${bars(14)}</span></div><p data-spoken>${esc(first.line)}</p></div>
<div class="wdev"><div data-anchor="watch">${liveWatch(lang, { interactive: true })}</div>
<button class="simulate" type="button" data-simulate>${MIC}<span data-simulate-label>${c.simulate}</span></button>
<p class="st-hint">${c.hint}</p></div>
</div></div>

<div class="st st-cloud"><div class="st-body">
<div class="cloud"><div class="cloud-disc" data-anchor="cloud">${CLOUD}</div>
<div class="cloud-text"><b>${c.cloud}</b><small>${c.account}</small><span class="cloud-sync" data-cloud-status>${c.synced}</span></div></div>
</div></div>

<div class="st st-phone">${step(1)}<div class="st-body">
<figure class="dev iphone" data-anchor="phone"><div class="scr"><div class="pui">
<div class="pui-status" aria-hidden="true"><span>9:41</span><span class="pui-batt"></span></div>
<header><b>${c.today}</b><span>${c.date}</span></header>
<div class="pui-live"><svg data-mark data-role="phone-mark" data-state="still" data-weight="1.3" viewBox="0 0 120 120" aria-hidden="true"></svg><span>${c.live}</span><span class="bars" aria-hidden="true">${bars(9)}</span></div>
<article class="pui-entry pui-now"><div class="pui-meta"><time data-phone-time>${esc(first.time)}</time><span data-transcript-status>${c.final}</span></div><p data-phone-text>${esc(first.line)}</p></article>
${c.old.map(([t, s]) => `<article class="pui-entry"><div class="pui-meta"><time>${t}</time></div><p>${esc(s!)}</p></article>`).join("")}
<div class="pui-saved"><span class="pui-tick" aria-hidden="true">✓</span>${c.saved}<code>${FILE}</code></div>
<div class="pui-home" aria-hidden="true"></div>
</div></div><picture class="bez"><source type="image/webp" srcset="/bezels/iphone-17-pro-silver.webp"><img src="/bezels/iphone-17-pro-silver.png" alt="" width="600" height="1227" decoding="async"></picture></figure>
</div></div>

<div class="st st-file"><div class="st-body">
<div class="file"><span class="cloud-file" data-anchor="file">${CLOUD}<code>${FILE}</code></span><small><span>${c.drive}</span><span>${c.daily}</span></small></div>
</div></div>

<div class="st st-agent">${step(2)}<div class="st-body">
<div class="panel" data-anchor="agent">
<header class="pa-head"><span class="tile" data-active-mark>${agentMark(first.agent, 24)}</span><div><b data-active-agent>${esc(name(first.agent))}</b><span class="pa-status" data-agent-status>${c.done}</span></div><a href="${agentsHref}#${first.agent}" data-active-link><span class="pa-long">${c.connect[0]}${c.connect[1]}</span><span class="pa-short">${c.connect[1]!.replace(/^c/, "C")}</span> <span aria-hidden="true">↗</span></a></header>
<div class="pa-ask"><button class="copy" type="button" data-copy="${esc(first.prompt)}">${c.copy}</button><p data-prompt><span class="pa-tag">${c.ask}</span><span data-prompt-text>${esc(first.prompt)}</span></p></div>
<div class="pa-result"><div class="pa-result-top"><h2 data-case-title>${esc(first.title)}</h2><span>${c.sample}</span></div><div class="pa-skel" aria-hidden="true"><i></i><i></i><i></i></div><div class="pa-result-body" data-deliverable>${first.deliverable}</div></div>
<nav class="pa-cases" aria-label="${c.cases}">${cases.map((u, i) => `<button type="button" data-play-case="${i}" title="${esc(u.title)}" aria-pressed="${i === 0}">${esc(u.short)}</button>`).join("")}</nav>
<div class="pa-wall"><p>${c.wall}</p><div class="wall">${wall.map((a) => `<button type="button" class="tile${a.id === "lm-studio" ? " dark" : ""}" data-play-agent="${a.id}" title="${esc(a.name)}" aria-label="${c.play}: ${esc(a.name)}" aria-pressed="${a.id === first.agent}">${agentMark(a.id, 24)}</button>`).join("")}</div></div>
</div>
</div></div>
</div>
<script type="application/json" data-journey-data>${JSON.stringify(data).replace(/</g, "\\u003c")}</script>
</section>`;
}
