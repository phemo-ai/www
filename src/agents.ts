/**
 * Agents that can read Phemo through the local MCP server (@phemo/mcp, started with npx) or the skill.
 * Each agent has an id (shared with the app's "AI assistants" list, which hands https://phemo.app/agents#<id>
 * to the Mac), its primary one-step action, and the config fallback. Link formats:
 * Cursor https://cursor.com/docs/mcp/install-links, LM Studio https://lmstudio.ai/docs/app/mcp/deeplink,
 * VS Code vscode.dev/redirect/mcp/install, Goose goose://extension, Cherry Studio cherrystudio://mcp/install.
 */
import { ICONS } from "./icons";
import { useCases } from "./usecases";

type Lang = "zh" | "en";

const PKG = "@phemo/mcp";
const STDIO = { command: "npx", args: ["-y", PKG] };
const b64 = (o: unknown) => Buffer.from(JSON.stringify(o)).toString("base64");
const ARGS = `["-y", "${PKG}"]`;
const MCP_JSON = `{\n  "mcpServers": {\n    "phemo": { "command": "npx", "args": ${ARGS} }\n  }\n}`;

type Action =
  | { kind: "link"; href: string; label: [string, string] }
  | { kind: "cmd"; cmd: string }
  | { kind: "prompt"; text: [string, string] };

interface Agent {
  id: string;
  name: string;
  group: "intl" | "cn";
  form: [string, string];
  action: Action;
  /** Where the JSON goes, if the agent also takes a config file or a settings dialog. */
  config?: { where: [string, string]; body?: string };
}

const desktop: [string, string] = ["桌面 App", "Desktop app"];
const editor: [string, string] = ["编辑器", "Editor"];
const cli: [string, string] = ["终端", "Terminal"];

const cmd = (c: string): Action => ({ kind: "cmd", cmd: c });

export const AGENTS: Agent[] = [
  { id: "claude-code", name: "Claude Code", group: "intl", form: cli, action: cmd(`claude mcp add phemo -- npx -y ${PKG}`) },
  { id: "claude-desktop", name: "Claude Desktop", group: "intl", form: desktop, action: { kind: "link", href: "/downloads/phemo.mcpb", label: ["下载扩展，双击安装", "Download the extension, double-click it"] }, config: { where: ["或者写进 ~/Library/Application Support/Claude/claude_desktop_config.json", "Or put it in ~/Library/Application Support/Claude/claude_desktop_config.json"] } },
  { id: "codex", name: "Codex", group: "intl", form: cli, action: cmd(`codex mcp add phemo -- npx -y ${PKG}`), config: { where: ["或者写进 ~/.codex/config.toml", "Or put it in ~/.codex/config.toml"], body: `[mcp_servers.phemo]\ncommand = "npx"\nargs = ["-y", "${PKG}"]` } },
  { id: "cursor", name: "Cursor", group: "intl", form: editor, action: { kind: "link", href: `cursor://anysphere.cursor-deeplink/mcp/install?name=phemo&config=${encodeURIComponent(b64(STDIO))}`, label: ["在 Cursor 中添加", "Add to Cursor"] }, config: { where: ["或者写进 ~/.cursor/mcp.json", "Or put it in ~/.cursor/mcp.json"] } },
  { id: "vscode", name: "VS Code · GitHub Copilot", group: "intl", form: editor, action: { kind: "link", href: `https://vscode.dev/redirect/mcp/install?name=phemo&config=${encodeURIComponent(JSON.stringify({ type: "stdio", ...STDIO }))}`, label: ["在 VS Code 中添加", "Add to VS Code"] } },
  { id: "windsurf", name: "Windsurf", group: "intl", form: editor, action: { kind: "prompt", text: ["打开 Cascade → MCP → 查看原始配置，粘贴下面的 JSON", "Open Cascade → MCP → View raw config and paste the JSON below"] }, config: { where: ["~/.codeium/windsurf/mcp_config.json", "~/.codeium/windsurf/mcp_config.json"] } },
  { id: "gemini-cli", name: "Gemini CLI", group: "intl", form: cli, action: cmd(`gemini mcp add phemo npx -y ${PKG}`) },
  { id: "zed", name: "Zed", group: "intl", form: editor, action: { kind: "prompt", text: ["在 Zed 的 settings.json 里加入下面的配置", "Add this to Zed's settings.json"] }, config: { where: ["~/.config/zed/settings.json", "~/.config/zed/settings.json"], body: `{\n  "context_servers": {\n    "phemo": { "command": "npx", "args": ${ARGS} }\n  }\n}` } },
  { id: "cline", name: "Cline", group: "intl", form: editor, action: { kind: "prompt", text: ["Cline → MCP Servers → Configure，粘贴下面的 JSON", "Cline → MCP Servers → Configure, paste the JSON below"] }, config: { where: ["cline_mcp_settings.json", "cline_mcp_settings.json"] } },
  { id: "kiro", name: "Kiro", group: "intl", form: editor, action: { kind: "prompt", text: ["把下面的 JSON 写进 Kiro 的 MCP 配置", "Put the JSON below into Kiro's MCP config"] }, config: { where: ["~/.kiro/settings/mcp.json", "~/.kiro/settings/mcp.json"] } },
  { id: "goose", name: "Goose", group: "intl", form: desktop, action: { kind: "link", href: `goose://extension?cmd=npx&arg=-y&arg=${encodeURIComponent(PKG)}&id=phemo&name=Phemo&description=${encodeURIComponent("Your Phemo notes in iCloud Drive (read-only)")}`, label: ["在 Goose 中添加", "Add to Goose"] } },
  { id: "lm-studio", name: "LM Studio", group: "intl", form: desktop, action: { kind: "link", href: `lmstudio://add_mcp?name=phemo&config=${encodeURIComponent(b64(STDIO))}`, label: ["在 LM Studio 中添加", "Add to LM Studio"] }, config: { where: ["或者写进 ~/.lmstudio/mcp.json", "Or put it in ~/.lmstudio/mcp.json"] } },
  { id: "jetbrains", name: "JetBrains AI Assistant", group: "intl", form: editor, action: { kind: "prompt", text: ["设置 → 工具 → AI Assistant → MCP → 添加，粘贴下面的 JSON", "Settings → Tools → AI Assistant → MCP → Add, paste the JSON below"] }, config: { where: ["设置里的 MCP 对话框", "The MCP dialog in Settings"] } },

  { id: "workbuddy", name: "WorkBuddy", group: "cn", form: desktop, action: { kind: "prompt", text: ["把这句话发给 WorkBuddy：「帮我添加一个 MCP 服务，名字 phemo，命令 npx，参数 -y @phemo/mcp」", "Send WorkBuddy: “Add an MCP server named phemo, command npx, args -y @phemo/mcp”"] }, config: { where: ["或者：设置 → 连接器 → 添加服务，或写进 ~/.workbuddy/mcp.json，然后点「信任」", "Or Settings → Connectors → Add, or ~/.workbuddy/mcp.json, then click Trust"] } },
  { id: "codebuddy", name: "CodeBuddy", group: "cn", form: cli, action: cmd(`codebuddy mcp add phemo -s user -- npx -y ${PKG}`) },
  { id: "trae", name: "Trae", group: "cn", form: editor, action: { kind: "prompt", text: ["设置 → MCP → 添加 → 手动配置，粘贴下面的 JSON", "Settings → MCP → Add → Manual, paste the JSON below"] }, config: { where: ["~/Library/Application Support/Trae/User/mcp.json", "~/Library/Application Support/Trae/User/mcp.json"] } },
  { id: "qoder", name: "Qoder · 通义灵码", group: "cn", form: cli, action: cmd(`qodercli mcp add phemo -s user -- npx -y ${PKG}`), config: { where: ["通义灵码插件：个人设置 → MCP 服务 → 添加，粘贴下面的 JSON", "Lingma plugin: Personal Settings → MCP → Add, paste the JSON below"] } },
  { id: "kimi-code", name: "Kimi Code", group: "cn", form: cli, action: { kind: "prompt", text: ["把下面的 JSON 写进 Kimi Code 的 MCP 配置", "Put the JSON below into Kimi Code's MCP config"] }, config: { where: ["~/.kimi-code/mcp.json", "~/.kimi-code/mcp.json"] } },
  { id: "qwen-code", name: "Qwen Code", group: "cn", form: cli, action: cmd(`qwen mcp add phemo npx -y ${PKG}`) },
  { id: "iflow", name: "iFlow CLI", group: "cn", form: cli, action: cmd(`iflow mcp add phemo npx -y ${PKG}`), config: { where: ["或者写进 ~/.iflow/settings.json", "Or put it in ~/.iflow/settings.json"] } },
  { id: "cherry-studio", name: "Cherry Studio", group: "cn", form: desktop, action: { kind: "link", href: `cherrystudio://mcp/install?servers=${encodeURIComponent(b64({ mcpServers: { phemo: { name: "Phemo", type: "stdio", isActive: true, ...STDIO } } }))}`, label: ["在 Cherry Studio 中添加", "Add to Cherry Studio"] } },
  { id: "comate", name: "文心快码 Comate", group: "cn", form: editor, action: { kind: "prompt", text: ["插件设置 → MCP → 添加，粘贴下面的 JSON", "Plugin settings → MCP → Add, paste the JSON below"] } },
];

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const copyBtn = (text: string, zh: boolean) => `<button type="button" class="copy" data-copy="${esc(text)}">${zh ? "复制" : "Copy"}</button>`;

function card(a: Agent, zh: boolean) {
  const L = (p: [string, string]) => (zh ? p[0] : p[1]);
  let primary = "";
  if (a.action.kind === "link") primary = `<a class="pill go" href="${esc(a.action.href)}">${L(a.action.label)}</a>`;
  else if (a.action.kind === "cmd") primary = `<div class="cmdline"><code>${esc(a.action.cmd)}</code>${copyBtn(a.action.cmd, zh)}</div>`;
  else primary = `<p class="how">${esc(L(a.action.text))}</p>`;
  const body = a.config?.body ?? MCP_JSON;
  const showJson = a.action.kind === "prompt" || a.config;
  const json = showJson
    ? `<details${a.action.kind === "prompt" ? " open" : ""}><summary>${a.config ? esc(L(a.config.where)) : zh ? "配置 JSON" : "Config JSON"}</summary><div class="cfg"><pre>${esc(body)}</pre>${copyBtn(body, zh)}</div></details>`
    : "";
  return `<section class="agent-card" id="${a.id}"><header><h3>${agentMark(a.id, 18)}${esc(a.name)}</h3><span class="form">${L(a.form)}</span></header>${primary}${json}</section>`;
}

export function agentsDirectory(lang: Lang) {
  const zh = lang === "zh";
  const group = (g: Agent["group"]) => AGENTS.filter((a) => a.group === g).map((a) => card(a, zh)).join("");
  const prompt = zh
    ? "读取 https://phemo.app/skill.md，把它装成你的 skill，然后看看我今天在 Phemo 里说了什么。"
    : "Read https://phemo.app/skill.md, install it as a skill, then look at what I said today in Phemo.";
  return `<div class="agents-dir">
${useCases(lang, true)}
<h2>${zh ? "一键连接" : "Connect in one step"}</h2>
<p>${zh ? "在 iPhone 的 Phemo「连接你的 agent」里点一个 agent，Mac 上会通过接力或隔空投送打开这里对应的一项。按钮直接添加；命令粘贴到终端运行一次即可。所有 agent 都用同一个只读的本地服务 <span class=\"inline\">npx -y @phemo/mcp</span>（需要 Node 20+）。" : "Tap an agent in Phemo's “Connect your agent” on your iPhone and your Mac opens the matching entry here (Handoff or AirDrop). Buttons add it directly; commands run once in Terminal. Every agent uses the same read-only local server <span class=\"inline\">npx -y @phemo/mcp</span> (Node 20+)."}</p>
<h3 class="grp">${zh ? "国际" : "International"}</h3><div class="agent-grid">${group("intl")}</div>
<h3 class="grp">${zh ? "国内" : "China"}</h3><div class="agent-grid">${group("cn")}</div>
<h3 class="grp">${zh ? "其他 agent" : "Any other agent"}</h3>
<div class="agent-grid">
<section class="agent-card" id="skill"><header><h3>${zh ? "能读网页、能写文件的 agent" : "Agents that read the web and write files"}</h3><span class="form">Skill</span></header><p class="how">${zh ? "把这句话发给它：" : "Send it this:"}</p><div class="cmdline"><code>${esc(prompt)}</code>${copyBtn(prompt, zh)}</div></section>
<section class="agent-card" id="mcp-json"><header><h3>${zh ? "支持 MCP 的其他工具" : "Other MCP clients"}</h3><span class="form">MCP</span></header><div class="cfg"><pre>${esc(MCP_JSON)}</pre>${copyBtn(MCP_JSON, zh)}</div></section>
</div>
<p class="fine">${zh ? "工具名称和标志归各自所有者所有，这里仅说明兼容性，不代表官方背书或合作关系。" : "Tool names and marks belong to their owners. These are compatibility references; no endorsement or partnership is implied."} ${zh ? "各家工具的设置入口会随版本变化；按钮不起作用时，用卡片里的 JSON 配置。只在网页里运行的 AI 读不到你 Mac 上的文件，可以在 iPhone 上把某一天的 Markdown 分享给它。" : "Settings menus change between versions; if a button doesn't work, use the card's JSON. AI that only runs in a web page can't read files on your Mac — share a day's Markdown to it from your iPhone instead."}</p>
</div>`;
}

/** Only reviewed marks render; all other agents appear by name. See NOTICE.md. */
const MARK: Record<string, string> = { zed: "zedindustries" };
export function agentMark(id: string, size = 20) {
  if (id === "windsurf") return `<span class="amark official-mark" style="width:${size}px;height:${size}px" aria-hidden="true"><img class="mark-black" src="/agent-marks/windsurf-black.svg" width="${size}" height="${size}" alt=""><img class="mark-white" src="/agent-marks/windsurf-white.svg" width="${size}" height="${size}" alt=""></span>`;
  if (id === "lm-studio") return `<span class="amark lm-mark" aria-hidden="true"><img src="/agent-marks/lmstudio-white.svg" width="${size}" height="${size}" alt=""></span>`;
  const slug = MARK[id];
  const icon = slug ? ICONS[slug] : undefined;
  return icon ? `<svg class="amark" viewBox="0 0 24 24" width="${size}" height="${size}" aria-hidden="true"><path d="${icon.d}" fill="currentColor"/></svg>` : "";
}
