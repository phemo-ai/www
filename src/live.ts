/**
 * Pieces shared by the home page and the changelog.
 * - liveWatch: the real watch recording screen (CI screenshot with the mark painted out, the animated mark on top)
 *   and the watch face with the Phemo complication behind it; data-state="face" | "app" picks one.
 * - CHANGELOG / changelogBody: the /changelog page.
 */
type Lang = "zh" | "en";

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

function pic(src: string, alt: string, cls: string, lazy = true) {
  const [w,h] = src.includes("watch-crown") ? [34,104] : src.includes("bezels") ? [560,880] : [416,496];
  return `<picture class="${cls}"><source type="image/webp" srcset="${src}.webp"><img src="${src}.png" alt="${alt}" width="${w}" height="${h}" decoding="async"${lazy ? ' loading="lazy"' : ""}></picture>`;
}

const MIC = '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="9" y="3" width="6" height="11" rx="3" fill="currentColor"/><path d="M6 11a6 6 0 0 0 12 0M12 17v3" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/></svg>';

/** The watch face: time, date, the Phemo complication and (while recording) the microphone indicator. */
function face(zh: boolean, interactive: boolean) {
  return `<div class="wface">
<span class="wmic">${MIC}</span>
<span class="fdate">${zh ? "周六 28" : "SAT 28"}</span>
<span class="ftime">10:09</span>
<${interactive ? 'button type="button"' : "span"} class="fcomp"${interactive ? ' data-act="comp" aria-label="Phemo"' : ""}><svg data-mark data-state="${interactive ? "still" : "speak"}" data-weight="1.25" viewBox="0 0 120 120"></svg></${interactive ? "button" : "span"}>
<span class="fcap"><i class="rec">${zh ? "Phemo · 录音中" : "Phemo · Recording"}</i><i class="idle">Phemo</i></span>
</div>`;
}

/**
 * The watch: recording screen (CI screenshot, mark painted out, animated mark on top) over the watch face.
 * data-state="face" | "app", data-rec="1" while recording. Interactive: the complication, the screen and the
 * crown are buttons; the hint bubble (data-hint) is filled in by site-client/main.mjs.
 */
export function liveWatch(lang: Lang, opts: { lazy?: boolean; interactive?: boolean } = {}) {
  const zh = lang === "zh";
  const lazy = opts.lazy ?? false;
  const alt = zh ? "Apple Watch 上的 Phemo：正在录制说话，已录 2 小时 13 分，2 个标记" : "Phemo on Apple Watch: recording speech, 2 h 13 min, 2 marks";
  const bezel = opts.interactive ? "/bezels/watch-s11-46-natural-nocrown" : "/bezels/watch-s11-46-natural";
  const extra = opts.interactive
    ? `<button type="button" class="crown" data-act="crown" aria-label="${zh ? "按表冠回到表盘" : "Press the Digital Crown to return to the watch face"}">${pic("/bezels/watch-crown", "", "cimg", lazy)}</button><span class="watch-hint" data-hint aria-live="polite"></span><span class="flag" role="status" data-message="⚑ ${zh ? "已标记" : "Marked"}"></span>`
    : "";
  const screen = opts.interactive ? `<button type="button" class="tapscr" data-act="screen" aria-label="${zh ? "轻点标记" : "Tap to mark"}"></button>` : "";
  return `<figure class="dev watch live" data-state="${opts.interactive ? "face" : "app"}" data-rec="${opts.interactive ? "0" : "1"}"${opts.interactive ? " data-watch" : ""}>
<div class="scrwrap">
${face(zh, !!opts.interactive)}
<div class="wapp"${opts.interactive ? ' inert aria-hidden="true"' : ""}>${pic(`/screens/watch-rec-nomark-${lang}`, alt, "scr", lazy)}<svg class="wmark2" data-mark${opts.interactive ? ' data-role="watch-mark"' : ""} data-state="${opts.interactive ? "still" : "speak"}" data-weight="1.15" viewBox="0 0 120 120" aria-hidden="true"></svg>${screen}</div>
</div>
${pic(bezel, "", "bez", lazy)}${extra}
</figure>`;
}

/** Version history, newest first. Dated releases and product updates, plus one clearly marked "in progress" entry. */
interface Release { tag: string; date: string; items: string[] }
export const CHANGELOG: Record<Lang, { title: string; description: string; h1: string; lead: string; next: Release; releases: Release[] }> = {
  zh: {
    title: "更新日志 · Phemo",
    description: "Phemo 每个版本的新功能和改进。",
    h1: "更新日志",
    lead: "Phemo 目前在 TestFlight 内测，正式版即将上架 App Store。",
    next: { tag: "开发中", date: "下一个版本", items: ["不再需要任何 Phemo 服务器：内置要点和待办仅由支持并启用 Apple 智能的 iPhone 生成（中国区版本不提供）", "不需要注册账号", "每天的内容自动同步到 iCloud 云盘，agent 随时读到最新", "iPhone 桌面小组件：今天的待办和要点"] },
    releases: [
      { tag: "产品更新", date: "2026 年 11 月 28 日", items: ["内置总结、要点和待办仅使用支持的 iPhone 上的 Apple 智能，不再提供 AI 服务配置", "未启用 Apple 智能时，以及在中国区版本中，连接你的 agent 读取 Markdown，由它总结并完成工作"] },
      { tag: "内测版", date: "2026 年 11 月 27 日", items: ["转写改在你的 iPhone 上完成，录音不再经过任何服务器", "手表：轻点开始、轻点标记重点、长按停止；iPhone 时间线上显示标记", "全新 iOS 27 和 watchOS 26 界面，采用 Liquid Glass", "录音、文字、要点和待办只存在你自己的 iCloud"] },
      { tag: "首个内测版", date: "2026 年 11 月 26 日", items: ["Apple Watch 全天录音，只录有人说话的片段", "来电、Siri 结束后自动续录", "iPhone 上的今天、待办和搜索", "通过 skill 和 MCP 让你的 AI 助手读取"] },
    ],
  },
  en: {
    title: "What's new · Phemo",
    description: "New features and improvements in each Phemo release.",
    h1: "What's new",
    lead: "Phemo is in TestFlight beta; the first release is coming to the App Store soon.",
    next: { tag: "In progress", date: "Next release", items: ["No Phemo server at all: built-in highlights and to-dos use only Apple Intelligence on supported iPhones with it enabled (unavailable in the China storefront)", "No account to sign up for", "Each day syncs to iCloud Drive automatically, so your agent always reads the latest", "iPhone home-screen widgets: today's to-dos and highlights"] },
    releases: [
      { tag: "Product update", date: "28 November 2026", items: ["Built-in summaries, highlights and to-dos now use only Apple Intelligence on supported iPhones; AI service configuration has been removed", "Without Apple Intelligence, and in the China storefront, connect your agent to read the Markdown, summarise it and do the work"] },
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
