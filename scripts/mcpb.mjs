// Builds dist/downloads/phemo.mcpb (Claude Desktop extension) from the published @phemo/mcp package:
// npm install (with production deps) → manifest.json → `mcpb pack`. Skips (exit 0) if the package
// isn't on npm yet. MCPB_TARBALL=<path> uses a local tarball instead (for testing before a release).
import { execFileSync } from "node:child_process";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

const root = path.dirname(path.dirname(new URL(import.meta.url).pathname));
const out = path.join(root, "dist/downloads/phemo.mcpb");
const work = mkdtempSync(path.join(tmpdir(), "phemo-mcpb-"));
const run = (cmd, args, cwd = work) => execFileSync(cmd, args, { cwd, stdio: ["ignore", "pipe", "inherit"] }).toString().trim();

try {
  // The package (or a local tarball) installed with its production dependencies under bundle/server.
  const spec = process.env.MCPB_TARBALL ? path.resolve(process.env.MCPB_TARBALL) : "@phemo/mcp";
  if (!process.env.MCPB_TARBALL) {
    try {
      run("npm", ["view", "@phemo/mcp", "version"]);
    } catch {
      console.warn("mcpb: @phemo/mcp is not on npm yet, skipping the Claude Desktop extension");
      process.exit(0);
    }
  }
  const server = path.join(work, "bundle/server");
  mkdirSync(server, { recursive: true });
  writeFileSync(path.join(server, "package.json"), JSON.stringify({ private: true, type: "module" }));
  run("npm", ["install", spec, "--omit=dev", "--ignore-scripts", "--no-audit", "--no-fund", "--no-package-lock"], server);
  const pkgDir = path.join(server, "node_modules/@phemo/mcp");
  const pkg = JSON.parse(readFileSync(path.join(pkgDir, "package.json"), "utf8"));
  const manifest = {
    manifest_version: "0.3",
    name: "phemo",
    display_name: "Phemo",
    version: pkg.version,
    description: "Your Phemo notes in iCloud Drive, read-only: daily transcripts, highlights and to-dos.",
    author: { name: "Benchyard Co., Limited", url: "https://phemo.app" },
    homepage: "https://phemo.app/agents",
    license: "MIT",
    server: {
      type: "node",
      entry_point: "server/node_modules/@phemo/mcp/dist/cli.js",
      mcp_config: { command: "node", args: ["${__dirname}/server/node_modules/@phemo/mcp/dist/cli.js"] },
    },
    tools: [
      { name: "list_days", description: "Days with notes, newest first" },
      { name: "get_day", description: "One day: summary, to-dos, timed transcript" },
      { name: "search", description: "Search transcripts, summaries and to-dos" },
      { name: "list_todos", description: "Open or done to-dos across days" },
      { name: "get_recent", description: "The last few days" },
    ],
    compatibility: { platforms: ["darwin"], runtimes: { node: ">=20.0.0" } },
  };
  writeFileSync(path.join(work, "bundle/manifest.json"), JSON.stringify(manifest, null, 2));
  mkdirSync(path.dirname(out), { recursive: true });
  run("npx", ["-y", "@anthropic-ai/mcpb", "pack", path.join(work, "bundle"), out]);
  if (!existsSync(out)) throw new Error("mcpb pack produced no file");
  console.log(`mcpb: ${path.relative(root, out)} (${pkg.name}@${pkg.version})`);
} finally {
  rmSync(work, { recursive: true, force: true });
}
