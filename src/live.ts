/**
 * Pieces shared by the home page and the changelog.
 * - liveWatch: the real watch recording screen (CI screenshot with the mark painted out, the animated mark on top)
 *   and the watch face with the Phemo complication behind it; data-state="face" | "app" picks one.
 * - CHANGELOG / changelogBody: the /changelog page.
 */
type Lang = "zh" | "en";

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

function pic(src: string, alt: string, cls: string, lazy = true) {
  return `<picture class="${cls}"><source type="image/webp" srcset="${src}.webp"><img src="${src}.png" alt="${alt}" decoding="async"${lazy ? ' loading="lazy"' : ""}></picture>`;
}

const MIC = '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="9" y="3" width="6" height="11" rx="3" fill="currentColor"/><path d="M6 11a6 6 0 0 0 12 0M12 17v3" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/></svg>';

/** The watch face: time, date, the Phemo complication and the microphone indicator. */
function face(zh: boolean) {
  return `<div class="wface" aria-hidden="true">
<span class="wmic">${MIC}</span>
<span class="fdate">${zh ? "周四 27" : "THU 27"}</span>
<span class="ftime">10:09</span>
<span class="fcomp"><svg data-mark data-state="speak" data-weight="1.25" viewBox="0 0 120 120"></svg></span>
<span class="fcap">${zh ? "Phemo · 录音中" : "Phemo · Recording"}</span>
</div>`;
}

/** The recording screen with the animated mark, and the watch face behind it (data-state=face|app). */
export function liveWatch(lang: Lang, opts: { lazy?: boolean } = {}) {
  const zh = lang === "zh";
  const lazy = opts.lazy ?? true;
  const alt = zh ? "Apple Watch 上的 Phemo：正在录制说话，已录 2 小时 13 分，2 个标记" : "Phemo on Apple Watch: recording speech, 2 h 13 min, 2 marks";
  return `<figure class="dev watch live">
<div class="scrwrap">
${face(zh)}
<div class="wapp">${pic(`/screens/watch-rec-nomark-${lang}`, alt, "scr", lazy)}<svg class="wmark2" data-mark data-state="speak" data-weight="1.15" viewBox="0 0 120 120" aria-hidden="true"></svg></div>
</div>
${pic("/bezels/watch-s11-46-natural", "", "bez", lazy)}
</figure>`;
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
