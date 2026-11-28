/**
 * Home page opening: one scroll-driven scene (desktop) or a vertical storyboard (phones, reduced motion).
 *
 * Follows Apple's marketing guidelines for product images: Apple-provided bezels "as is" at correct relative
 * scale whenever several are shown (Watch 0.5853 × iPhone image width; iPad 0.7838 × MacBook image width, from
 * the physical widths 249.7 mm and 304.1 mm against the measured device outlines), at least 200 px on screen,
 * never moved, scaled or tilted — only the screen content and the elements beside the devices animate, and
 * scenes change by dissolve. Nothing enters or leaves a screen. iPhone and Watch show the real app (CI
 * screenshots); iPad and Mac show the day's Markdown file as it sits in iCloud Drive. Agent marks sit beside
 * the Mac, never on its screen. Timing lives in site-client/main.mjs.
 */
import { AGENTS, agentMark } from "./agents";
import { liveWatch } from "./live";

type Lang = "zh" | "en";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const pic = (src: string, alt: string, cls: string, lazy = false) =>
  `<picture class="${cls}"><source type="image/webp" srcset="${src}.webp"><img src="${src}.png" alt="${alt}" decoding="async"${lazy ? ' loading="lazy"' : ""}></picture>`;

interface Copy {
  tag: string; sub: string; soon: string; caps: string[]; fine: string;
  phoneAlt: string; cloud: string; cloudSub: string; tree: string[];
  doc: { crumb: string; files: string[]; title: string; sumH: string; sum: string; todoH: string; todos: string[]; trH: string; tr: [string, string][] };
  term: string[]; agentsLabel: string;
  panels: [string, string][];
}

const COPY: Record<Lang, Copy> = {
  zh: {
    tag: "说过的话，<br>留在你的 iCloud，<br>交给你的 agent。",
    sub: "手表录音，iPhone 本地转写，你的 agent 直接读取。没有服务器，没有账号。",
    soon: "即将上架 App Store",
    caps: ["戴上手表，点一下 Phemo 开始录音", "只录有人说话的片段", "放下手腕回到表盘，录音继续；iPhone 在本地转成文字", "整理出要点", "和带截止时间的待办", "存进你自己的 iCloud", "同一份笔记，出现在你的 iPad 和 Mac 上", "你的 agent 读取它，帮你跟进", "没有 Phemo 服务器，没有账号。"],
    fine: "没有 Phemo 服务器，没有账号。",
    phoneAlt: "iPhone 上的 Phemo：今天的标记、总结、要点和待办",
    cloud: "你的 iCloud", cloudSub: "只在你的 Apple 账户里",
    tree: ["iCloud 云盘 › Phemo", "  2026 › 11 › 2026-11-27.md", "  todos.md"],
    doc: { crumb: "iCloud 云盘 › Phemo › 2026 › 11", files: ["2026-11-25.md", "2026-11-26.md", "2026-11-27.md", "todos.md"], title: "2026-11-27", sumH: "总结", sum: "上午站会确认 iOS 版本中午前发到 TestFlight；合同付款条款改为 30 天，周五前发给张经理。", todoH: "待办", todos: ["把修改后的合同发给张经理（周五）", "和设计组确认新手引导文案（周四）"], trH: "转写", tr: [["10:02", "iOS 版本中午前发到 TestFlight。"], ["14:31", "付款条款改成 30 天吧。"]] },
    term: ["› 读取 Phemo/2026/11/2026-11-27.md", "✓ 提醒事项：周五前把合同发给张经理", "✓ 日历：周一 15:00 陈医生复诊"],
    agentsLabel: "可以连接的 agent",
    panels: [["手表录音，iPhone 本地转写", "放下手腕回到表盘，录音继续；说完一段，iPhone 在本地转成文字，整理出要点和待办。"], ["存进你自己的 iCloud", "内容只在你的 Apple 账户里。"], ["iPad 上也有同一份", "每天一个 Markdown 文件，放在 iCloud 云盘。"], ["你的 agent 接手", "Mac 上的 agent 读取当天的文件，帮你跟进。"]],
  },
  en: {
    tag: "What you said.<br>In your iCloud.<br>For your agent.",
    sub: "Your watch records, your iPhone transcribes on device, your agent reads it. No server, no account.",
    soon: "Coming to the App Store",
    caps: ["Put on your watch and tap Phemo to record", "Only the parts where someone speaks", "Lower your wrist, still recording; your iPhone transcribes on device", "Sorted into highlights", "and to-dos with due dates", "Kept in your own iCloud", "The same notes on your iPad and Mac", "Your agent reads them and follows up", "No Phemo server. No account."],
    fine: "No Phemo server. No account.",
    phoneAlt: "Phemo on iPhone: today's marks, summary, highlights and to-dos",
    cloud: "Your iCloud", cloudSub: "Only in your Apple Account",
    tree: ["iCloud Drive › Phemo", "  2026 › 11 › 2026-11-27.md", "  todos.md"],
    doc: { crumb: "iCloud Drive › Phemo › 2026 › 11", files: ["2026-11-25.md", "2026-11-26.md", "2026-11-27.md", "todos.md"], title: "2026-11-27", sumH: "Summary", sum: "Stand-up: iOS build to TestFlight by noon. Contract payment terms now 30 days, to Mr. Zhang by Friday.", todoH: "To-dos", todos: ["Send the revised contract to Mr. Zhang (Fri)", "Confirm onboarding copy with design (Thu)"], trH: "Transcript", tr: [["10:02", "iOS build goes to TestFlight by noon."], ["14:31", "Let's make the terms 30 days."]] },
    term: ["› read Phemo/2026/11/2026-11-27.md", "✓ Reminder: contract to Mr. Zhang, Friday", "✓ Calendar: Dr. Chen, Monday 3 pm"],
    agentsLabel: "Agents you can connect",
    panels: [["Your watch records, your iPhone transcribes", "Lower your wrist and recording carries on; each chunk is transcribed on your iPhone and sorted into highlights and to-dos."], ["Kept in your own iCloud", "Only in your Apple Account."], ["The same notes on iPad", "One Markdown file a day in iCloud Drive."], ["Your agent takes over", "The agent on your Mac reads the day's file and follows up."]],
  },
};

const LOCK = '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="10.5" width="14" height="10" rx="2.2" fill="none" stroke="currentColor" stroke-width="1.3"/><path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5" fill="none" stroke="currentColor" stroke-width="1.3"/></svg>';

function doc(c: Copy, cls: string) {
  const d = c.doc;
  return `<div class="docscr ${cls}"><div class="dbar">${esc(d.crumb)}</div><div class="dbody"><ul class="dfiles">${d.files.map((f) => `<li${f === "2026-11-27.md" ? ' class="on"' : ""}>${f}</li>`).join("")}</ul>
<div class="dpage">${[`<h4># ${d.title}</h4>`, `<h5>## ${esc(d.sumH)}</h5>`, `<p>${esc(d.sum)}</p>`, `<h5>## ${esc(d.todoH)}</h5>`, ...d.todos.map((t) => `<p>- [ ] ${esc(t)}</p>`), `<h5>## ${esc(d.trH)}</h5>`, ...d.tr.map(([t, x]) => `<p>- ${t} ${esc(x)}</p>`)].map((h, n) => h.replace(/^<(h4|h5|p)>/, `<$1 style="--n:${n}">`)).join("")}</div></div></div>`;
}

function iphone(lang: Lang, c: Copy) {
  return `<figure class="dev iphone sc-phone"><div class="scr">${pic(`/screens/iphone-today2-${lang}`, c.phoneAlt, "simg")}<span class="reveal" aria-hidden="true"></span></div>${pic("/bezels/iphone-17-pro-silver", "", "bez")}</figure>`;
}
const ipad = (c: Copy) => `<figure class="dev ipadf"><div class="scr">${doc(c, "on-ipad")}</div>${pic("/bezels/ipad-pro-11-silver", "", "bez")}</figure>`;
const mac = (c: Copy) => `<figure class="dev macf"><div class="scr">${doc(c, "on-mac")}</div>${pic("/bezels/macbook-air-13-silver", "", "bez")}</figure>`;

function agentCard(c: Copy) {
  const rot = AGENTS.map((a) => `<span class="an" data-agent="${a.id}">${agentMark(a.id, 16)}<b>${esc(a.name)}</b></span>`).join("");
  return `<div class="acard"><div class="atitle">${rot}</div><div class="aterm">${c.term.map((t, i) => `<p style="--i:${i}">${esc(t)}</p>`).join("")}<span class="caret"></span></div></div>`;
}
function agentStrip(c: Copy) {
  return `<div class="astrip" aria-label="${esc(c.agentsLabel)}">${AGENTS.map((a) => `<span class="as" data-agent="${a.id}" title="${esc(a.name)}">${agentMark(a.id, 15)}<i>${esc(a.name)}</i></span>`).join("")}</div>`;
}

function echo(cls: string) {
  return `<svg class="echo ${cls}" viewBox="0 0 120 120" aria-hidden="true"><path d="M60 26v68"/><path class="e1" d="M44 40q-10 20 0 40"/><path class="e1" d="M76 40q10 20 0 40"/><path class="e2" d="M32 30q-17 30 0 60"/><path class="e2" d="M88 30q17 30 0 60"/></svg>`;
}

export function scene(lang: Lang) {
  const c = COPY[lang];
  const intro = `<div class="sc-intro"><h1>${c.tag}</h1><p class="sub">${esc(c.sub)}</p><span class="pill">${c.soon}</span></div>`;
  const cloud = `<div class="cloudmark"><span class="ring"></span><span class="lk">${LOCK}</span><b>${c.cloud}</b><small>${c.cloudSub}</small><pre class="tree">${c.tree.map((t, i) => `<span style="--i:${i}">${esc(t)}</span>`).join("\n")}</pre></div>`;

  // Desktop: sticky stage, one shot at a time.
  const stage = `<div class="sc-sticky"><div class="sc-stage" data-scene data-step="0" data-caps="${esc(JSON.stringify(c.caps))}">
${intro}
<div class="shot s1"><div class="pair1">${liveWatch(lang, { lazy: false })}<div class="gap">${echo("g1")}</div>${iphone(lang, c)}</div></div>
<div class="shot s2">${cloud}</div>
<div class="shot s3"><div class="pair2">${ipad(c)}${mac(c)}</div></div>
<div class="shot s4"><div class="pair3">${agentCard(c)}${mac(c)}</div>${agentStrip(c)}</div>
<p class="sc-cap"><span data-cap>${c.caps[0]}</span></p>
</div></div>`;

  // Phones and reduced motion: the same story as still panels, devices shown one kind at a time.
  const P = c.panels;
  const story = `<div class="sc-story">
${intro}
<div class="panel"><div class="pstack">${liveWatch(lang, { lazy: true })}${iphone(lang, c).replace('class="reveal"', 'class="reveal done"')}</div><h3>${P[0]![0]}</h3><p>${P[0]![1]}</p></div>
<div class="panel">${cloud.replace('class="cloudmark"', 'class="cloudmark done"')}<h3>${P[1]![0]}</h3><p>${P[1]![1]}</p></div>
<div class="panel">${ipad(c)}<h3>${P[2]![0]}</h3><p>${P[2]![1]}</p></div>
<div class="panel">${mac(c)}${agentCard(c).replace('class="acard"', 'class="acard done"')}${agentStrip(c)}<h3>${P[3]![0]}</h3><p>${P[3]![1]}</p></div>
<p class="fine">${c.fine}</p>
</div>`;

  return `<section class="scene" aria-label="${lang === "zh" ? "Phemo 如何工作" : "How Phemo works"}">${stage}${story}</section>`;
}
