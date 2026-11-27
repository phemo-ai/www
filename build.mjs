// Builds the static site into dist/: pages from src/ (rendered for SITE_ORIGIN), public/ assets, and site.js.
// node build.mjs            → https://phemo.ai
// SITE_ORIGIN=… node build.mjs
import { cpSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { build } from "esbuild";

const root = path.dirname(new URL(import.meta.url).pathname);
const dist = path.join(root, "dist");
const origin = (process.env.SITE_ORIGIN ?? "https://phemo.ai").replace(/\/$/, "");

rmSync(dist, { recursive: true, force: true });
cpSync(path.join(root, "public"), dist, { recursive: true });

// The mark motion on the watch mock-up.
await build({
  entryPoints: [path.join(root, "site-client/main.mjs")],
  bundle: true,
  minify: true,
  format: "iife",
  target: ["safari15", "chrome100", "firefox100"],
  outfile: path.join(dist, "site.js"),
  legalComments: "none",
  logLevel: "warning",
});

// Render the pages with the TypeScript sources, bundled on the fly.
const bundled = await build({
  entryPoints: [path.join(root, "src/render.ts")],
  bundle: true,
  platform: "node",
  format: "esm",
  write: false,
  logLevel: "warning",
});
const url = `data:text/javascript;base64,${Buffer.from(bundled.outputFiles[0].text).toString("base64")}`;
const { renderSite } = await import(url);

const files = renderSite(origin, path.join(root, "public"));
for (const [p, body] of files) {
  const file = path.join(dist, p);
  mkdirSync(path.dirname(file), { recursive: true });
  writeFileSync(file, body);
}
console.log(`dist/: ${files.size} generated files for ${origin}`);
