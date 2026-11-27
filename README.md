# phemo-www

The Phemo website (zh at `/`, en at `/en/`): static pages on Cloudflare Workers static assets, Worker `phemo-www`.
A tiny worker (`worker/index.ts`) runs only for `/` (picks the language from the saved choice, then the browser) and `/lang/*` (remembers the choice).

- `src/content.ts` — page text and HTML, both languages. `src/style.ts` — CSS. `src/render.ts` — page shell, robots, sitemap.
- `site-client/main.mjs` + `brand/phemo-mark.mjs` — the mark motion, bundled into `site.js`.
- `public/` — assets copied as is; `_headers` (CSP) and `_redirects`. `skill.md` is the agent skill from the app repo (`skill/SKILL.md`).

```sh
npm ci
npm run build                         # dist/ for https://phemo.app
SITE_ORIGIN=http://localhost:8787 npm run dev
```

Deploys only through `.github/workflows/deploy.yml`: push to `main` goes live, a pull request uploads a preview version.
Needs repo secret `CLOUDFLARE_API_TOKEN` (Workers Scripts: Edit; for the custom domain also Zone: Workers Routes: Edit on phemo.app) and repo variable `CLOUDFLARE_ACCOUNT_ID`.
Custom domain: `phemo.app` (route in `wrangler.jsonc`; the zone is on the same Cloudflare account).
