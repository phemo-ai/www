/** Renders the site to static files: zh at /, en at /en/, plus robots.txt and sitemap.xml. */
import { readFileSync } from "node:fs";
import { type Lang, PAGES, type PageId } from "./content";
import { SITE_CSS } from "./style";
import { WORDMARK } from "./wordmark";

export const PATH_OF: Record<PageId, string> = { home: "/", privacy: "/privacy", terms: "/terms", support: "/support", agents: "/agents", changelog: "/changelog" };
export const PAGE_IDS = Object.keys(PATH_OF) as PageId[];

export const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export const href = (lang: Lang, id: PageId) => (lang === "en" ? `/en${PATH_OF[id] === "/" ? "/" : PATH_OF[id]}` : PATH_OF[id]);

/** Header mark: the still Echo mark (mark.svg geometry), drawn in the current text colour. */
function markSvg(publicDir: string) {
  const still = readFileSync(`${publicDir}/mark.svg`, "utf8").replace(/^[\s\S]*?<g /, "<g ").replace(/<\/svg>\s*$/, "");
  return `<svg viewBox="0 0 120 120" aria-hidden="true">${still.replace(/fill="#[0-9A-Fa-f]{6}"/, 'fill="currentColor"')}</svg>`;
}

function nav(lang: Lang, current: PageId, mark: string) {
  const zh = lang === "zh";
  const link = (id: PageId, label: string, cls = "") =>
    `<a${cls ? ` class="${cls}"` : ""} href="${href(lang, id)}"${id === current ? ' aria-current="page"' : ""}>${label}</a>`;
  const other: Lang = zh ? "en" : "zh";
  // /lang/<lang> remembers the choice in a cookie (worker/index.ts), then goes to the same page in that language.
  const switchTo = `/lang/${other}?next=${encodeURIComponent(href(other, current))}`;
  return `<header class="top"><div class="wrap">
<a class="brand" href="${href(lang, "home")}" aria-label="Phemo">${mark}${WORDMARK}</a>
<nav class="nav">${link("agents", zh ? "连接你的 agent" : "Connect your agent", "opt")}${link("changelog", zh ? "更新日志" : "What's new", "opt")}${link("privacy", zh ? "隐私" : "Privacy", "opt")}${link("support", zh ? "帮助" : "Help")}<a class="lang" href="${switchTo}" hreflang="${other === "zh" ? "zh-Hans" : "en"}" lang="${other === "zh" ? "zh-Hans" : "en"}">${zh ? "English" : "中文"}</a></nav>
</div></header>`;
}

function footer(lang: Lang) {
  const zh = lang === "zh";
  return `<footer><div class="wrap"><span>Phemo · © 2026 Benchyard Co., Limited</span>
<nav><a href="${href(lang, "agents")}">${zh ? "连接你的 agent" : "Connect your agent"}</a><a href="${href(lang, "changelog")}">${zh ? "更新日志" : "What's new"}</a><a href="${href(lang, "privacy")}">${zh ? "隐私政策" : "Privacy"}</a><a href="${href(lang, "terms")}">${zh ? "使用条款" : "Terms"}</a><a href="${href(lang, "support")}">${zh ? "帮助与支持" : "Support"}</a><a href="mailto:support@benchyard.cn">support@benchyard.cn</a></nav>
<p class="legal">${zh ? "Apple、Apple Watch、iPhone、iCloud 和 Mac 是 Apple Inc. 在美国和其他国家/地区注册的商标。App Store 是 Apple Inc. 的服务商标。" : "Apple, Apple Watch, iPhone, iCloud and Mac are trademarks of Apple Inc., registered in the U.S. and other countries. App Store is a service mark of Apple Inc."}</p>
<p class="legal">${zh ? "各 agent 的名称与标志属于其各自所有者。无隶属或背书关系。" : "Agent names and marks belong to their owners. No affiliation or endorsement."}</p>
</div></footer>`;
}

export function renderPage(origin: string, id: PageId, lang: Lang, mark: string): string {
  const page = PAGES[id](lang);
  const url = origin + href(lang, id);
  const body = page.body.replaceAll("{{BASE}}", esc(origin));
  return `<!doctype html>
<html lang="${lang === "zh" ? "zh-Hans" : "en"}" class="no-js"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>${esc(page.title)}</title>
<meta name="description" content="${esc(page.description)}">
<meta name="theme-color" content="#F1EEE9">
<link rel="canonical" href="${esc(url)}">
<link rel="alternate" hreflang="zh-Hans" href="${esc(origin + href("zh", id))}">
<link rel="alternate" hreflang="en" href="${esc(origin + href("en", id))}">
<link rel="alternate" hreflang="x-default" href="${esc(origin + href("zh", id))}">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="preload" href="/fonts/inter-latin-wght.woff2" as="font" type="font/woff2" crossorigin>
<script src="/site.js" defer></script>
<meta property="og:type" content="website">
<meta property="og:site_name" content="Phemo">
<meta property="og:title" content="${esc(page.title)}">
<meta property="og:description" content="${esc(page.description)}">
<meta property="og:url" content="${esc(url)}">
<meta property="og:image" content="${esc(origin)}/og.png">
<meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">
<meta property="og:locale" content="${lang === "zh" ? "zh_CN" : "en_US"}">
<meta name="twitter:card" content="summary_large_image">
<style>${SITE_CSS}</style>
</head><body class="${id === "home" ? "home" : "page"}">
${nav(lang, id, mark)}
<main>${body}</main>
${footer(lang)}
</body></html>`;
}

/** Every file the site consists of, apart from the copied public/ assets: path → contents. */
export function renderSite(origin: string, publicDir: string): Map<string, string> {
  const mark = markSvg(publicDir);
  const out = new Map<string, string>();
  for (const id of PAGE_IDS) {
    for (const lang of ["zh", "en"] as Lang[]) {
      const p = href(lang, id);
      out.set(p.endsWith("/") ? `${p}index.html` : `${p}.html`, renderPage(origin, id, lang, mark));
    }
  }
  out.set("/robots.txt", `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`);
  const urls = PAGE_IDS.flatMap((id) => (["zh", "en"] as Lang[]).map((l) => `<url><loc>${esc(origin + href(l, id))}</loc></url>`)).join("");
  out.set("/sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`);
  return out;
}
