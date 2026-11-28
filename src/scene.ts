/**
 * The home hero: one figure for a whole recorded day. The day's timeline runs across the top; under it the
 * Apple Watch records, the user's own iCloud joins it to the iPhone (transcript), and the agent reads the
 * whole Phemo library through the skill or MCP and ends in a finished result.
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
    h1: ["一日万言，", "句句有着落。"],
    sub: "Apple Watch 从早录到晚，iPhone 本地转写，只存进你自己的 iCloud；你已经在用的 agent 读得到每一天，把事办完。",
    soon: "即将上架 App Store", fine: "无 Phemo 服务器 · 无账号 · 免费",
    label: "从一整天的录音到拿到成果的演示",
    simulate: "模拟说一段话", again: "再说一段", hint: "轻点表盘也能开始 · 表冠可以按",
    today: "今天", live: "手表录音中", volatile: "正在转写…", final: "已定稿",
    dayToday: "今天已录", dayWeek: "本周已录", recorded: (t: string) => `已录 ${t}`, segs: (n: number) => `${n} 段对话 · 只录人声`, weekSegs: "5 天 · 212 段对话",
    library: "你的 iCloud 里已有", libraryTotal: "86 天 · 412 小时", now: "现在",
    lib: "iCloud 云盘", libRows: ["原话全文", "每日摘要", "待办", "标记时刻", "跨天搜索"], libVia: "只读 · 在你的电脑上",
    saved: "已存入 iCloud", old: [["09:12", "周会改到下午三点，会议室我来订。"], ["08:40", "记得给车续保险。"]],
    cloud: "你的 iCloud", account: "只在你的账户里", syncing: "同步中…", synced: "已同步",
    connect: ["", "连接方法"], ask: "你对它说", sample: "示意", read: "读了",
    wait: "等你说完…", reading: "正在通过 Phemo 读取…", working: "正在完成工作…", done: "交付已备好",
    copy: "复制", cases: "换个场景", wall: "22 个 agent 都能接，点一个试试", play: "播放",
  },
  en: {
    h1: ["Every word you say, ", "put to work."],
    sub: "Apple Watch records morning to night. iPhone transcribes on device, into your own iCloud. Your own agent does the rest.",
    soon: "Coming to the App Store", fine: "No Phemo server · No account · Free",
    label: "Demo: from a whole recorded day to a finished result",
    simulate: "Simulate speaking", again: "Say another", hint: "Tap the watch · Press the crown",
    today: "Today", live: "Recording on Watch", volatile: "Transcribing…", final: "Final",
    dayToday: "Recorded today", dayWeek: "Recorded this week", recorded: (t: string) => t, segs: (n: number) => `${n} conversations · speech only`, weekSegs: "5 days · 212 conversations",
    library: "Already in your iCloud:", libraryTotal: "86 days · 412 hours", now: "Now",
    lib: "iCloud Drive", libRows: ["Full transcripts", "Daily summaries", "To-dos", "Marked moments", "Search across days"], libVia: "Read-only · on your computer",
    saved: "Saved to iCloud", old: [["09:12", "Move the weekly sync to three, I'll book the room."], ["08:40", "Remember to renew the car insurance."]],
    cloud: "Your iCloud", account: "Only in your account", syncing: "Syncing…", synced: "Synced",
    connect: ["How to ", "connect"], ask: "You ask", sample: "Example", read: "Read",
    wait: "Waiting for you…", reading: "Reading through Phemo…", working: "Working…", done: "Ready for review",
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

/**
 * Where each outcome sits in a long recording: the time of day the line is said (`at`, the day ribbon's playhead),
 * the conversation it belongs to, and how much of the library the agent reads for it. `week` outcomes draw on several days.
 */
const DEPTH: Record<string, { at: string; week?: boolean; ctx: [string, string]; reads: [string, string] }> = {
  proposal: { at: "14:32", ctx: ["客户会 · 已录 52 分钟", "Meeting · 52 min"], reads: ["今天 52 分钟的客户会全文 · 此前 3 次相关对话", "Today's 52-min client meeting · 3 earlier talks"] },
  bugfix: { at: "09:41", ctx: ["站会 · 已录 11 分钟", "Standup · 11 min"], reads: ["今天 18 分钟的站会 · 上周两次提到同一问题", "Today's 18-min standup · 2 earlier mentions"] },
  crm: { at: "11:05", ctx: ["销售电话 · 已录 24 分钟", "Call · 24 min"], reads: ["今天 37 分钟的销售电话 · 这位客户的 4 次通话", "Today's 37-min sales call · 4 earlier calls"] },
  research: { at: "17:30", week: true, ctx: ["", ""], reads: ["本周 8 场访谈的全文 · 共 6 小时 40 分", "All 8 interviews this week · 6 h 40 min"] },
  doctor: { at: "16:20", ctx: ["门诊 · 已录 9 分钟", "Clinic · 9 min"], reads: ["今天 14 分钟的门诊对话 · 上次复诊的医嘱", "Today's 14-min visit · notes from the last one"] },
  lecture: { at: "10:15", ctx: ["线性代数 · 已录 35 分钟", "Lecture · 35 min"], reads: ["今天 90 分钟的整堂课 · 本学期前 11 讲", "Today's 90-min lecture · 11 earlier lectures"] },
  family: { at: "20:10", week: true, ctx: ["晚饭后 · 家里", "After dinner · at home"], reads: ["这周家里的 5 段对话 · 3 件待办", "5 talks at home this week · 3 to-dos"] },
  weekly: { at: "18:00", week: true, ctx: ["5 天 · 12 场会议", "12 meetings"], reads: ["本周 5 天的录音 · 31 小时 · 12 场会议", "This week's 5 days · 31 h · 12 meetings"] },
};
/** The day ribbon covers 07:00–23:00. Speech comes in stretches; silence is not recorded. */
const DAY = [7 * 60, 23 * 60] as const;
const TALK = [[7.3, 7.7], [8.4, 9.1], [9.5, 9.95], [10.05, 11.8], [12.2, 12.9], [13.7, 15.1], [15.6, 16.6], [17.1, 18.2], [19, 19.5], [19.9, 20.7], [21.4, 21.9]];
const minutes = (hm: string) => { const [h, m] = hm.split(":").map(Number); return h! * 60 + m!; };
const span = (min: number, zh: boolean) => { const h = Math.floor(min / 60), m = min % 60; return zh ? `${h} 小时 ${m} 分` : `${h} h ${m} min`; };
function wave(talk: boolean, bars: number) {
  let d = "";
  for (let i = 0; i < bars; i++) {
    const t = (DAY[0] + (i + .5) * (DAY[1] - DAY[0]) / bars) / 60;
    const on = talk && TALK.some(([a, b]) => t >= a! && t <= b!);
    const h = on ? 6 + Math.round(30 * Math.abs(Math.sin(i * 12.9898)) ** 1.6 * (.55 + .45 * Math.abs(Math.cos(i * .37)))) : .01;
    d += `M${i + .5},${(20 - h / 2).toFixed(2)}v${h}`;
  }
  return `<svg class="w${bars}" viewBox="0 0 ${bars} 40" preserveAspectRatio="none" aria-hidden="true"><path d="${d}"/></svg>`;
}
/** 220 bars on a wide stage, 110 where the stage is narrow. */
const waves = (talk: boolean) => wave(talk, 220) + wave(talk, 110);
/** The iCloud glyph (drawing: Simple Icons 16.38.1, CC0), in iCloud's blue. See NOTICE.md. */
let cloudId = 0;
const icloud = () => { const id = `icg${++cloudId}`; return `<svg class="icloud" viewBox="0 0 24 24" aria-hidden="true"><defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5cc5fb"/><stop offset="1" stop-color="#1c7ff5"/></linearGradient></defs><path fill="url(#${id})" d="M13.762 4.29a6.51 6.51 0 0 0-5.669 3.332 3.571 3.571 0 0 0-1.558-.36 3.571 3.571 0 0 0-3.516 3A4.918 4.918 0 0 0 0 14.796a4.918 4.918 0 0 0 4.92 4.914 4.93 4.93 0 0 0 .617-.045h14.42c2.305-.272 4.041-2.258 4.043-4.589v-.009a4.594 4.594 0 0 0-3.727-4.508 6.51 6.51 0 0 0-6.511-6.27z"/></svg>`; };
const MIC = '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="9" y="3" width="6" height="11" rx="3" fill="currentColor"/><path d="M6 11a6 6 0 0 0 12 0M12 17v3" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/></svg>';
const bars = (n: number) => Array.from({ length: n }, (_, i) => `<i style="--i:${i};--h:${35 + ((i * 37) % 65)}%"></i>`).join("");

export function scene(lang: Lang) {
  const c = COPY[lang], l = lang === "zh" ? 0 : 1;
  const agentsHref = lang === "zh" ? "/agents" : "/en/agents";
  const name = (id: string) => AGENTS.find((a) => a.id === id)!.name;
  const zh = lang === "zh";
  cloudId = 0;
  const cases = USE_CASES.map((u, i) => {
    const x = DEPTH[u.id]!, at = minutes(x.at), since = at - DAY[0];
    return {
      id: u.id, title: u.title[l]!, short: SHORT[u.id]![l]!, time: u.time[l]!, line: u.line[l]!, prompt: u.prompt[l]!,
      agent: CASE_AGENT[lang][i]!, deliverable: preview(u.id, lang),
      at: x.at, now: +(since / (DAY[1] - DAY[0]) * 100).toFixed(2), ctx: x.ctx[l]!, reads: x.reads[l]!,
      dayLabel: x.week ? c.dayWeek : c.dayToday, total: x.week ? span(31 * 60 + 20, zh) : span(Math.round(since * .62), zh),
      segs: x.week ? c.weekSegs : c.segs(Math.round(since / 11)), today: c.recorded(span(Math.round(since * .62), zh)),
    };
  });
  const first = cases[0]!;
  // The reader's own market first.
  const wall = [...AGENTS].sort((a, b) => Number(a.group !== (lang === "zh" ? "cn" : "intl")) - Number(b.group !== (lang === "zh" ? "cn" : "intl")));
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

<div class="day">
<div class="day-top"><p><b><span data-day-label>${first.dayLabel}</span> <span data-day-total>${first.total}</span></b><span data-day-segs>${first.segs}</span></p><p class="day-lib">${icloud()}<span>${c.library} <b>${c.libraryTotal}</b></span></p></div>
<div class="day-track"><div class="day-wave day-rest">${waves(false)}</div><div class="day-wave day-past" data-day-past style="clip-path:inset(-4px ${100 - first.now}% -4px 0)">${waves(true)}</div><span class="day-now" data-day-now style="left:${first.now}%"><time data-day-time>${first.at}</time></span></div>
<div class="day-axis" aria-hidden="true">${[7, 10, 13, 16, 19, 22].map((h) => `<span style="left:${(h * 60 - DAY[0]) / (DAY[1] - DAY[0]) * 100}%">${String(h).padStart(2, "0")}:00</span>`).join("")}</div>
</div>

<div class="st st-watch"><div class="st-body">
<div class="bubble"><div class="bubble-top"><time data-spoken-time>${esc(first.time)}</time><span class="bubble-ctx" data-spoken-ctx>${esc(first.ctx)}</span></div><p data-spoken>${esc(first.line)}</p></div>
<div class="wdev"><div data-anchor="watch">${liveWatch(lang, { interactive: true })}</div>
<button class="simulate" type="button" data-simulate>${MIC}<span data-simulate-label>${c.simulate}</span></button>
<p class="st-hint">${c.hint}</p></div>
</div></div>

<div class="st st-cloud"><div class="st-body">
<div class="cloud"><div class="cloud-disc" data-anchor="cloud">${icloud()}</div>
<div class="cloud-text"><b>${c.cloud}</b><small>${c.account}</small><span class="cloud-sync" data-cloud-status>${c.synced}</span></div></div>
</div></div>

<div class="st st-phone"><div class="st-body">
<figure class="dev iphone" data-anchor="phone"><div class="scr"><div class="pui">
<div class="pui-status" aria-hidden="true"><span>9:41</span><span class="pui-batt"></span></div>
<header><b>${c.today}</b><span data-phone-total>${first.today}</span></header>
<div class="pui-live"><svg data-mark data-role="phone-mark" data-state="still" data-weight="1.3" viewBox="0 0 120 120" aria-hidden="true"></svg><span>${c.live}</span><span class="bars" aria-hidden="true">${bars(9)}</span></div>
<article class="pui-entry pui-now"><div class="pui-meta"><time data-phone-time>${esc(first.time)}</time><span data-transcript-status>${c.final}</span></div><p data-phone-text>${esc(first.line)}</p></article>
${c.old.map(([t, s]) => `<article class="pui-entry"><div class="pui-meta"><time>${t}</time></div><p>${esc(s!)}</p></article>`).join("")}
<div class="pui-saved"><span class="pui-tick" aria-hidden="true">✓</span>${c.saved}<code>${FILE}</code></div>
<div class="pui-home" aria-hidden="true"></div>
</div></div><picture class="bez"><source type="image/webp" srcset="/bezels/iphone-17-pro-silver.webp"><img src="/bezels/iphone-17-pro-silver.png" alt="" width="600" height="1227" decoding="async"></picture></figure>
</div></div>

<div class="st st-lib"><div class="st-body">
<div class="lib" data-anchor="lib">
<div class="lib-head">${icloud()}<p><b>${c.lib}</b><small>Phemo</small></p></div>
<p class="lib-total">${c.libraryTotal}</p>
<ul class="lib-rows">${c.libRows.map((r, i) => `<li style="--i:${i}">${r}</li>`).join("")}</ul>
<p class="lib-via"><b>Skill</b><b>MCP</b><small>${c.libVia}</small></p>
</div>
</div></div>

<div class="st st-agent"><div class="st-body">
<div class="panel" data-anchor="agent">
<header class="pa-head"><span class="tile" data-active-mark>${agentMark(first.agent, 24)}</span><div><b data-active-agent>${esc(name(first.agent))}</b><span class="pa-status" data-agent-status>${c.done}</span></div><a href="${agentsHref}#${first.agent}" data-active-link><span class="pa-long">${c.connect[0]}${c.connect[1]}</span><span class="pa-short">${c.connect[1]!.replace(/^c/, "C")}</span> <span aria-hidden="true">↗</span></a></header>
<div class="pa-ask"><button class="copy" type="button" data-copy="${esc(first.prompt)}">${c.copy}</button><p data-prompt><span class="pa-tag">${c.ask}</span><span data-prompt-text>${esc(first.prompt)}</span></p></div>
<p class="pa-trace"><svg data-mark data-state="still" data-weight="1.3" viewBox="0 0 120 120" aria-hidden="true"></svg><span>${c.read}</span><span data-reads>${esc(first.reads)}</span></p>
<div class="pa-result"><div class="pa-result-top"><h2 data-case-title>${esc(first.title)}</h2><span>${c.sample}</span></div><div class="pa-skel" aria-hidden="true"><i></i><i></i><i></i></div><div class="pa-result-body" data-deliverable>${first.deliverable}</div></div>
<nav class="pa-cases" aria-label="${c.cases}">${cases.map((u, i) => `<button type="button" data-play-case="${i}" title="${esc(u.title)}" aria-pressed="${i === 0}">${esc(u.short)}</button>`).join("")}</nav>
<div class="pa-wall"><p>${c.wall}</p><div class="wall">${wall.map((a) => `<button type="button" class="tile${a.id === "lm-studio" ? " dark" : ""}" data-play-agent="${a.id}" title="${esc(a.name)}" aria-label="${c.play}: ${esc(a.name)}" aria-pressed="${a.id === first.agent}">${agentMark(a.id, 24)}</button>`).join("")}</div></div>
</div>
</div></div>
</div>
<script type="application/json" data-journey-data>${JSON.stringify(data).replace(/</g, "\\u003c")}</script>
</section>`;
}
