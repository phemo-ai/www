/** Flat home scenes. Device artwork stays fixed; only screen content and adjacent marks animate. */
import { AGENTS, agentMark } from "./agents";
import { liveWatch } from "./live";

type Lang = "zh" | "en";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const pic = (src: string, alt: string, cls: string) => {
  const [w, h] = src.includes("iphone-17") ? [600, 1227] : src.includes("iphone-today") ? [540, 1173] : src.includes("ipad") ? [1320, 940] : [1700, 1120];
  return `<picture class="${cls}"><source type="image/webp" srcset="${src}.webp"><img src="${src}.png" alt="${alt}" width="${w}" height="${h}" decoding="async"></picture>`;
};

interface Copy {
  tag: string; sub: string; soon: string; fine: string;
  phoneAlt: string; cloud: string; cloudSub: string; tree: string[];
  doc: { title: string; label: string; headings: string[]; summary: string; highlights: string[]; todos: string[]; transcript: [string, string][] };
  term: string[]; agentsLabel: string;
  panels: [string, string][];
  hints: string[];
}

const COPY: Record<Lang, Copy> = {
  zh: {
    tag: "说过的话，<br>留在你的 iCloud，<br>交给你的 agent。",
    sub: "手表录音，iPhone 本地转写，你的 agent 直接读取。没有服务器，没有账号，免费使用。",
    soon: "即将上架 App Store",
    fine: "没有 Phemo 服务器，没有账号。",
    phoneAlt: "iPhone 上的 Phemo：今天的标记、总结、要点和待办",
    cloud: "你的 iCloud", cloudSub: "只在你的 Apple 账户里",
    tree: ["iCloud 云盘 › Phemo", "  2026 › 11 › 2026-11-27.md", "  todos.md"],
    doc: {
      title: "2026-11-27", label: "当天的 Markdown 文件，可滚动阅读", headings: ["Summary", "Highlights", "To-dos", "Transcript"],
      summary: "上午确认新版上线范围，下午与客户敲定方案和报价，周五交付。",
      highlights: ["新版先上线录音与本地转写", "客户确认 12 月启动试点"],
      todos: ["周五前发方案与报价", "明天和设计组确认文案"],
      transcript: [["09:15", "新版先把录音和本地转写做好。"], ["14:32", "周五前给我们一版报价和方案。"], ["17:10", "明天一起过一下新手引导文案。"]],
    },
    term: ["14:32 · 周五前给我们一版报价和方案。", "proposal.docx", "quote.xlsx", "跟进邮件草稿 · 方案与报价已附上"],
    agentsLabel: "可以连接的 agent",
    hints: ["试试：点一下表盘上的 Phemo", "轻点屏幕标记，按表冠返回", "按一下表冠，回到表盘", "录音还在继续。再点 Phemo 就回来"],
    panels: [["手表录音，iPhone 本地转写", "放下手腕回到表盘，录音继续；说完一段，iPhone 在本地转成文字。支持的 iPhone 可用 Apple 智能整理；中国区版本可连接 agent。"], ["存进你自己的 iCloud", "内容只在你的 Apple 账户里。"], ["同一份笔记，出现在你的 iPad 和 Mac 上", "每天一个 Markdown 文件，放在 iCloud 云盘。示例含 Apple 智能总结；中国区版本可让 agent 总结原话。"], ["你的 agent 接手", "你的 agent 读取原话，用它已有的工具完成交付。"]],
  },
  en: {
    tag: "What you said.<br>In your iCloud.<br>For your agent.",
    sub: "Your watch records, your iPhone transcribes on device, your agent reads it. No server, no account. Free to use.",
    soon: "Coming to the App Store",
    fine: "No Phemo server. No account.",
    phoneAlt: "Phemo on iPhone: today's marks, summary, highlights and to-dos",
    cloud: "Your iCloud", cloudSub: "Only in your Apple Account",
    tree: ["iCloud Drive › Phemo", "  2026 › 11 › 2026-11-27.md", "  todos.md"],
    doc: {
      title: "2026-11-27", label: "Daily Markdown file, scroll to read", headings: ["Summary", "Highlights", "To-dos", "Transcript"],
      summary: "Agreed the release scope and a December pilot. Proposal and quote due Friday.",
      highlights: ["Record + transcribe on device", "December client pilot"],
      todos: ["Send proposal + quote · Fri", "Review app copy · Sat"],
      transcript: [["09:15", "Ship recording and transcription first."], ["14:32", "Proposal and quote by Friday, please."], ["17:10", "Review the onboarding copy tomorrow."]],
    },
    term: ["14:32 · Send us a proposal and a quote by Friday.", "proposal.docx", "quote.xlsx", "Follow-up email draft · Files attached"],
    agentsLabel: "Agents you can connect",
    hints: ["Try it: tap Phemo on the watch face", "Tap to mark; press the crown to return", "Press the crown to go back to your face", "Still recording. Tap Phemo to come back"],
    panels: [["Your watch records, your iPhone transcribes", "Lower your wrist and recording carries on; each chunk is transcribed on your iPhone. Apple Intelligence can organise it on supported iPhones; connect your agent in the China storefront."], ["Kept in your own iCloud", "Only in your Apple Account."], ["The same notes on your iPad and Mac", "One Markdown file a day in iCloud Drive. Example with Apple Intelligence summaries; in the China storefront, your agent summarises the transcript."], ["Your agent takes over", "Your agent reads what was said and uses its tools to deliver."]],
  },
};

const LOCK = '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="10.5" width="14" height="10" rx="2.2" fill="none" stroke="currentColor" stroke-width="1.3"/><path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5" fill="none" stroke="currentColor" stroke-width="1.3"/></svg>';

function doc(c: Copy, cls: string) {
  const d = c.doc;
  const heading = (i: number) => `<h5>## ${esc(d.headings[i]!)}</h5>`;
  return `<div class="docscr ${cls}"><div class="dbar">${esc(d.title)}.md<span aria-hidden="true">↕</span></div><div class="dpage" tabindex="0" role="region" aria-label="${esc(d.label)}"><h4># ${esc(d.title)}</h4>${heading(0)}<p class="day-summary">${esc(d.summary)}</p><div class="day-sections"><section>${heading(1)}<ul>${d.highlights.map(t => `<li>${esc(t)}</li>`).join("")}</ul></section><section>${heading(2)}<ul class="day-todos">${d.todos.map(t => `<li><span aria-hidden="true"></span> ${esc(t)}</li>`).join("")}</ul></section></div>${heading(3)}<ul class="day-transcript">${d.transcript.map(([time, text]) => `<li><time>${time}</time><span>${esc(text)}</span></li>`).join("")}</ul></div></div>`;
}

function iphone(lang: Lang, c: Copy) {
  return `<figure class="dev iphone sc-phone"><div class="scr">${pic(`/screens/iphone-today2-${lang}`, c.phoneAlt, "simg")}</div>${pic("/bezels/iphone-17-pro-silver", "", "bez")}</figure>`;
}
const ipad = (c: Copy) => `<figure class="dev ipadf"><div class="scr">${doc(c, "on-ipad")}</div>${pic("/bezels/ipad-pro-11-silver", "", "bez")}</figure>`;
const mac = (c: Copy) => `<figure class="dev macf"><div class="scr">${doc(c, "on-mac")}</div>${pic("/bezels/macbook-air-13-silver", "", "bez")}</figure>`;

function agentCard(c: Copy, lang: Lang) {
  const agents = AGENTS.filter((a) => lang === "en" || a.group === "cn");
  const rot = agents.map((a, i) => `<span class="an${i === 0 ? " is-on" : ""}" data-agent="${a.id}">${agentMark(a.id, 20)}<b>${esc(a.name)}</b></span>`).join("");
  return `<div class="acard"><div class="atitle">${rot}</div><div class="aterm"><p class="source-line">“${esc(c.term[0]!) }”</p><div class="agent-files"><span><i>W</i>${c.term[1]}</span><span><i>X</i>${c.term[2]}</span></div><p class="email-result"><span aria-hidden="true">↗</span> ${esc(c.term[3]!)}</p></div></div>`;
}
function agentStrip(c: Copy, lang: Lang) {
  return `<div class="astrip" aria-label="${esc(c.agentsLabel)}">${AGENTS.filter((a) => lang === "en" || a.group === "cn").map((a) => `<a class="as" href="${lang === "zh" ? "/agents" : "/en/agents"}#${a.id}" data-agent="${a.id}">${agentMark(a.id, 18)}<i>${esc(a.name)}</i></a>`).join("")}</div>`;
}

function echo(cls: string) {
  return `<svg class="echo ${cls}" viewBox="0 0 120 120" aria-hidden="true"><path d="M60 26v68"/><path class="e1" d="M44 40q-10 20 0 40"/><path class="e1" d="M76 40q10 20 0 40"/><path class="e2" d="M32 30q-17 30 0 60"/><path class="e2" d="M88 30q17 30 0 60"/></svg>`;
}

export function scene(lang: Lang) {
  const c = COPY[lang];
  const P = c.panels;
  const intro = `<div class="sc-intro"><h1>${c.tag}</h1><p class="sub">${esc(c.sub)}</p><span class="pill">${c.soon}</span></div>`;
  const cloud = `<div class="cloudmark" data-motion><span class="ring"></span><span class="lk">${LOCK}</span><b>${c.cloud}</b><small>${c.cloudSub}</small><pre class="tree">${c.tree.map((t, i) => `<span style="--i:${i}">${esc(t)}</span>`).join("\n")}</pre></div>`;
  // One flat page: every part is on it at once; each part's animation loops in place while it is in view.
  return `<section class="scene" aria-label="${lang === "zh" ? "Phemo 如何工作" : "How Phemo works"}">
<div class="row r1"><div class="wrap r1g">${intro}<div class="pair1" data-watch-scene data-hints="${esc(JSON.stringify(c.hints))}">${liveWatch(lang, { lazy: false, interactive: true })}<div class="gap">${echo("g1")}</div>${iphone(lang, c)}</div></div>
<p class="rcap"><b>${P[0]![0]}</b><span>${P[0]![1]}</span></p></div>
<div class="row r2"><div class="wrap">${cloud}<p class="rcap"><b>${P[1]![0]}</b><span>${P[1]![1]}</span></p></div></div>
<div class="row r3"><div class="wrap"><div class="pair2" >${ipad(c)}${mac(c)}</div>
<p class="rcap"><b>${P[2]![0]}</b><span>${P[2]![1]}</span></p></div></div>
<div class="row r4"><div class="wrap"><div class="pair3" data-loop="agent">${agentCard(c, lang)}<p class="rcap side"><b>${P[3]![0]}</b><span>${P[3]![1]}</span></p></div>${agentStrip(c, lang)}
<p class="fine">${c.fine}</p></div></div>
</section>`;
}
