/**
 * The animated parts of the home page and the changelog.
 * - liveWatch: the real watch recording screen; pressing the crown (or tapping the watch) goes to the watch face
 *   while recording continues, as on the watch. Driven by site-client/main.mjs.
 * - chain: the whole data path, Watch → your iCloud → iPhone (on-device) → your agent, played step by step.
 * Screens are real simulator screenshots from the app's CI (`screenshots` job, Apple Watch Series 12 46 mm,
 * iPhone 6.9"), with the mark painted out of the watch screen so the animated mark can sit in its place.
 */
type Lang = "zh" | "en";

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

function pic(src: string, alt: string, cls: string, lazy = true) {
  return `<picture class="${cls}"><source type="image/webp" srcset="${src}.webp"><img src="${src}.png" alt="${alt}" decoding="async"${lazy ? ' loading="lazy"' : ""}></picture>`;
}

const MIC = '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="9" y="3" width="6" height="11" rx="3" fill="currentColor"/><path d="M6 11a6 6 0 0 0 12 0M12 17v3" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/></svg>';

/** The watch face the crown press returns to: time, date, the Phemo complication and the microphone indicator. */
function face(zh: boolean) {
  return `<div class="wface" aria-hidden="true">
<span class="wmic">${MIC}</span>
<span class="fdate">${zh ? "周四 27" : "THU 27"}</span>
<span class="ftime">10:09</span>
<span class="fcomp"><svg data-mark data-state="speak" data-weight="1.25" viewBox="0 0 120 120"></svg></span>
<span class="fcap">${zh ? "Phemo · 录音中" : "Phemo · Recording"}</span>
</div>`;
}

/** The recording screen with the animated mark, the watch face behind it, and (interactive) a crown that presses in. */
export function liveWatch(lang: Lang, opts: { lazy?: boolean; interactive?: boolean } = {}) {
  const zh = lang === "zh";
  const lazy = opts.lazy ?? true;
  const alt = zh ? "Apple Watch 上的 Phemo：正在录制说话，已录 2 小时 13 分，2 个标记" : "Phemo on Apple Watch: recording speech, 2 h 13 min, 2 marks";
  // Interactive: the crown is its own image (cut out of the bezel) so it can move when pressed.
  const bezel = opts.interactive ? "/bezels/watch-s11-46-natural-nocrown" : "/bezels/watch-s11-46-natural";
  const crown = opts.interactive
    ? `<button class="crown" type="button" aria-label="${zh ? "按一下表冠：回到表盘，录音继续" : "Press the Digital Crown: back to the watch face, recording continues"}">${pic("/bezels/watch-crown", "", "cimg", lazy)}</button><span class="hint" aria-hidden="true">${zh ? "按表冠" : "Press"}</span>`
    : "";
  return `<figure class="dev watch live"${opts.interactive ? " data-watch" : ""}>
<div class="scrwrap">
${face(zh)}
<div class="wapp">${pic(`/screens/watch-rec-nomark-${lang}`, alt, "scr", lazy)}<svg class="wmark2" data-mark data-state="speak" data-weight="1.15" viewBox="0 0 120 120" aria-hidden="true"></svg></div>
</div>
${pic(bezel, "", "bez", lazy)}${crown}
</figure>`;
}

const CLOUD = '<svg viewBox="0 0 120 84" aria-hidden="true"><path d="M94 76H30A22 22 0 0 1 27.5 32 31 31 0 0 1 87 26a24.5 24.5 0 0 1 7 50z" fill="#fff" stroke="currentColor" stroke-width="2.6" stroke-linejoin="round"/><g transform="translate(48 38)"><rect x="2" y="12" width="20" height="15" rx="3" fill="currentColor"/><path d="M6.5 12V8a5.5 5.5 0 0 1 11 0v4" stroke="currentColor" stroke-width="2.6" fill="none"/></g></svg>';
const LOCK = '<svg viewBox="0 0 16 16" aria-hidden="true"><rect x="3" y="7" width="10" height="7" rx="1.6" fill="currentColor"/><path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2" stroke="currentColor" stroke-width="1.5" fill="none"/></svg>';
const SERVER = '<svg viewBox="0 0 32 32" aria-hidden="true"><rect x="6" y="5" width="20" height="9" rx="2" fill="none" stroke="currentColor" stroke-width="1.6"/><rect x="6" y="18" width="20" height="9" rx="2" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="10.5" cy="9.5" r="1.2" fill="currentColor"/><circle cx="10.5" cy="22.5" r="1.2" fill="currentColor"/><path d="M3 29L29 3" stroke="#C2452D" stroke-width="2.2" stroke-linecap="round"/></svg>';
const WAVE = '<svg viewBox="0 0 40 16" aria-hidden="true"><g fill="currentColor">' + [3, 7, 11, 6, 13, 9, 4, 10, 6, 3].map((h, i) => `<rect x="${1 + i * 4}" y="${8 - h / 2}" width="2.2" height="${h}" rx="1.1"/>`).join("") + "</g></svg>";

interface ChainCopy {
  h2: string; lead: string; account: string; noServer: string; replay: string;
  labels: [string, string, string, string];
  caps: string[];
  phoneHead: string; lines: [string, boolean][]; ai: string;
  agentTitle: string; term: string[];
}

const CHAIN: Record<Lang, ChainCopy> = {
  zh: {
    h2: "从手腕到你的 agent，<br>数据不离开你自己的设备和 iCloud",
    lead: "按一下表冠试试。",
    account: "你的 Apple 账户",
    noServer: "Phemo 服务器：无",
    replay: "再看一遍",
    labels: ["Apple Watch", "你的 iCloud", "iPhone · 本地", "你的 agent"],
    caps: ["正在录音 · 按一下表冠", "回到表盘，录音继续", "一段说完：经 Apple 加密链路送出", "声音到了 iPhone", "在 iPhone 本地转成文字", "整理成要点和待办", "写成 Markdown，存进你的 iCloud 云盘", "你的 agent 接手跟进", "全程都在你的 Apple 账户里"],
    phoneHead: "今天",
    lines: [["上午站会：iOS 中午前发 TestFlight", false], ["周五前把合同发给张经理", true], ["周一 15:00 陈医生复诊", true]],
    ai: "Apple 智能 · 或你的 Key",
    agentTitle: "Claude Code",
    term: ["› 读取 Phemo/2026-11-27.md", "✓ 提醒事项：周五前发合同给张经理", "✓ 日历：周一 15:00 陈医生复诊"],
  },
  en: {
    h2: "From your wrist to your agent,<br>without leaving your devices and your iCloud",
    lead: "Press the crown to try it.",
    account: "Your Apple Account",
    noServer: "Phemo server: none",
    replay: "Play again",
    labels: ["Apple Watch", "Your iCloud", "iPhone · on device", "Your agent"],
    caps: ["Recording · press the crown", "Back to your face, still recording", "A chunk ends: off over Apple's encrypted link", "The audio reaches your iPhone", "Turned into text on your iPhone", "Sorted into highlights and to-dos", "Written as Markdown to your iCloud Drive", "Your agent follows up", "All inside your Apple Account"],
    phoneHead: "Today",
    lines: [["Stand-up: iOS build to TestFlight", false], ["Contract to Mr. Zhang, Fri", true], ["Dr. Chen, Mon 3 pm", true]],
    ai: "Apple Intelligence or your key",
    agentTitle: "Claude Code",
    term: ["› read Phemo/2026-11-27.md", "✓ Reminder: contract to Mr. Zhang, Fri", "✓ Calendar: Dr. Chen, Mon 3 pm"],
  },
};

/**
 * The data path as one animated scene inside "your Apple Account": the watch records (sound rings), the crown goes
 * to the face, an audio token flies through your iCloud to the iPhone, the waveform turns into text and then into
 * to-dos, a Markdown token flies through iCloud Drive to the agent, which acts. Timing in site-client/main.mjs.
 */
export function chain(lang: Lang) {
  const c = CHAIN[lang];
  const bars = Array.from({ length: 28 }, (_, i) => `<i style="--h:${(0.25 + 0.75 * Math.abs(Math.sin(i * 1.7) * Math.cos(i * 0.6))).toFixed(2)};--i:${i}"></i>`).join("");
  return `<section class="chain" id="how" data-chain data-caps="${esc(JSON.stringify(c.caps))}"><div class="wrap">
<h2>${c.h2}</h2>
<p class="lead">${c.lead}</p>
<div class="stage" data-stage data-step="0">
<p class="acct-tag">${LOCK}${c.account}</p>
<p class="nosrv">${SERVER}<span>${c.noServer}</span></p>
<div class="node n-watch"><div class="rings" aria-hidden="true"><i></i><i></i><i></i></div>${liveWatch(lang, { interactive: true })}<span class="nl">${c.labels[0]}</span></div>
<div class="node n-cloud"><div class="cloudbox">${CLOUD}</div><span class="nl">${c.labels[1]}</span></div>
<div class="node n-phone"><div class="phone2"><span class="island"></span><b>${c.phoneHead}</b>
<div class="pwave" aria-hidden="true">${bars}</div>
<ul class="plines">${c.lines.map(([t, todo], i) => `<li class="${todo ? "todo" : "note"}" style="--i:${i}"><i class="ck"></i><span>${t}</span></li>`).join("")}</ul>
<span class="pai"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 0l1.8 6.2L16 8l-6.2 1.8L8 16l-1.8-6.2L0 8l6.2-1.8z" fill="currentColor"/></svg>${c.ai}</span></div><span class="nl">${c.labels[2]}</span></div>
<div class="node n-mac"><div class="mac"><div class="bar"><i></i><i></i><i></i><span>${c.agentTitle}</span></div><div class="term">${c.term.map((t, i) => `<p style="--i:${i}">${t}</p>`).join("")}<span class="cursor"></span></div></div><span class="nl">${c.labels[3]}</span></div>
<span class="tok" aria-hidden="true"><span class="g ga">${WAVE}</span><span class="g gd">.md</span></span>
</div>
<div class="now"><span data-cap>${c.caps[0]}</span><button type="button" class="replay" data-replay>${c.replay}</button></div>
</div></section>`;
}

/** Version history, newest first. Only what has shipped to testers, plus one clearly marked "in progress" entry. */
interface Release { tag: string; date: string; items: string[] }
export const CHANGELOG: Record<Lang, { title: string; description: string; h1: string; lead: string; next: Release; releases: Release[] }> = {
  zh: {
    title: "更新日志 · Phemo",
    description: "Phemo 每个版本的新功能和改进。",
    h1: "更新日志",
    lead: "Phemo 目前在 TestFlight 内测，正式版即将上架 App Store。",
    next: { tag: "开发中", date: "下一个版本", items: ["不再需要任何 Phemo 服务器：要点和待办由 iPhone 上的 Apple 智能，或你自己选择的 AI 服务（OpenAI、Anthropic、通义千问、豆包、本地模型）生成", "不需要注册账号", "每天的内容自动同步到 iCloud 云盘，agent 随时读到最新", "iPhone 桌面小组件：今天的待办和要点"] },
    releases: [
      { tag: "内测版", date: "2026 年 11 月 27 日", items: ["转写改在你的 iPhone 上完成，录音不再经过任何服务器", "手表：轻点开始、轻点标记重点、长按停止；iPhone 时间线上显示标记", "全新 iOS 27 和 watchOS 26 界面，采用 Liquid Glass", "录音、文字、要点和待办只存在你自己的 iCloud"] },
      { tag: "首个内测版", date: "2026 年 11 月 26 日", items: ["Apple Watch 全天录音，只录有人说话的片段", "来电、Siri 结束后自动续录", "iPhone 上的今天、待办和搜索", "通过 skill 和 MCP 让你的 AI 助手读取"] },
    ],
  },
  en: {
    title: "What's new · Phemo",
    description: "New features and improvements in each Phemo release.",
    h1: "What's new",
    lead: "Phemo is in TestFlight beta; the first release is coming to the App Store soon.",
    next: { tag: "In progress", date: "Next release", items: ["No Phemo server at all: highlights and to-dos from Apple Intelligence on your iPhone, or the AI provider you choose (OpenAI, Anthropic, Qwen, Doubao, a local model)", "No account to sign up for", "Each day syncs to iCloud Drive automatically, so your agent always reads the latest", "iPhone home-screen widgets: today's to-dos and highlights"] },
    releases: [
      { tag: "Beta", date: "27 November 2026", items: ["Transcription now happens on your iPhone; audio no longer passes through any server", "Watch: tap to start, tap to mark a moment, hold to stop; marks show on the iPhone timeline", "New iOS 27 and watchOS 26 design with Liquid Glass", "Audio, text, highlights and to-dos live only in your own iCloud"] },
      { tag: "First beta", date: "26 November 2026", items: ["All-day recording on Apple Watch, keeping only the parts where someone speaks", "Resumes by itself after calls and Siri", "Today, To-dos and Search on iPhone", "Let your AI assistant read it through a skill or MCP"] },
    ],
  },
};

export function changelogBody(lang: Lang) {
  const c = CHANGELOG[lang];
  const rel = (r: Release, next = false) => `<section class="rel${next ? " next" : ""}"><header><span class="tag">${r.tag}</span><time>${r.date}</time></header><ul>${r.items.map((i) => `<li>${i}</li>`).join("")}</ul></section>`;
  return `<article class="doc"><div class="narrow">
<h1>${c.h1}</h1><p class="updated">${c.lead}</p>
<div class="releases">${rel(c.next, true)}${c.releases.map((r) => rel(r)).join("")}</div>
</div></article>`;
}
