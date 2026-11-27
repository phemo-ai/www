/**
 * Runs only for "/" and "/lang/*" (wrangler.jsonc run_worker_first); every other path is a static asset.
 * "/" follows the visitor's language: a saved choice (cookie) first, then the browser's preference.
 */
interface Env {
  ASSETS: { fetch(request: Request): Promise<Response> };
}

const COOKIE = "phemo_lang";

type Lang = "zh" | "en";

export function preferredLang(header: string | null): Lang {
  if (!header) return "zh";
  const first = header
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().split(";");
      const q = Number(params.find((p) => p.trim().startsWith("q="))?.split("=")[1] ?? 1);
      return { tag: (tag ?? "").toLowerCase(), q: Number.isFinite(q) ? q : 0 };
    })
    .filter((x) => x.tag && x.tag !== "*")
    .sort((a, b) => b.q - a.q)[0];
  return !first || first.tag.startsWith("zh") ? "zh" : "en";
}

function cookieLang(header: string | null): Lang | null {
  const m = /(?:^|;\s*)phemo_lang=(zh|en)/.exec(header ?? "");
  return (m?.[1] as Lang | undefined) ?? null;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    const lang = /^\/lang\/(zh|en)$/.exec(url.pathname)?.[1] as Lang | undefined;
    if (lang) {
      const next = url.searchParams.get("next");
      const target = next && /^\/(?!\/)[\w\-/]*$/.test(next) ? next : lang === "en" ? "/en/" : "/";
      return new Response(null, {
        status: 302,
        headers: {
          Location: target,
          "Set-Cookie": `${COOKIE}=${lang}; Max-Age=31536000; Path=/; SameSite=Lax; Secure`,
        },
      });
    }

    if (url.pathname === "/") {
      const want = cookieLang(request.headers.get("Cookie")) ?? preferredLang(request.headers.get("Accept-Language"));
      if (want === "en") return new Response(null, { status: 302, headers: { Location: "/en/", Vary: "Accept-Language, Cookie" } });
      const res = await env.ASSETS.fetch(request);
      const out = new Response(res.body, res);
      out.headers.append("Vary", "Accept-Language, Cookie");
      return out;
    }

    return env.ASSETS.fetch(request);
  },
};
