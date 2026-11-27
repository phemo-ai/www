/** Site stylesheet (inlined into every page). Echo brand: paper, ink, light grotesk, lots of air. */
export const SITE_CSS = String.raw`
@font-face{font-family:"Inter";font-style:normal;font-weight:300 500;font-display:swap;src:url(/fonts/inter-latin-wght.woff2) format("woff2");unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}
:root{--paper:#F1EEE9;--card:#F7F5F1;--ink:#1B2B2C;--ink2:#3E4B4B;--mute:#8A8F8A;--faint:#B8B5AE;--line:#D9D4CB;
--sans:"Inter",-apple-system,BlinkMacSystemFont,"PingFang SC","Hiragino Sans GB","Noto Sans SC","Noto Sans CJK SC","Microsoft YaHei",sans-serif;
--mono:ui-monospace,"SF Mono",Menlo,Consolas,monospace;--pad:clamp(22px,5vw,72px)}
*{box-sizing:border-box}
html{-webkit-text-size-adjust:100%;scroll-behavior:smooth}
@media (prefers-reduced-motion:reduce){html{scroll-behavior:auto}}
body{margin:0;background:var(--paper);color:var(--ink);font:400 16px/1.7 var(--sans);-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;font-feature-settings:"ss01","cv11"}
a{color:inherit;text-decoration-thickness:1px;text-underline-offset:3px;text-decoration-color:var(--faint)}
a:hover{text-decoration-color:var(--ink)}
img{display:block;max-width:100%}
h1,h2,h3{font-weight:300;letter-spacing:-.022em;margin:0}
:lang(zh-Hans) h1,:lang(zh-Hans) h2{letter-spacing:.01em}
p{margin:0}
.mute{color:var(--mute)}
.wrap{max-width:1240px;margin:0 auto;padding:0 var(--pad)}
:focus-visible{outline:1.5px solid var(--ink);outline-offset:3px;border-radius:4px}

/* header */
.top{position:fixed;inset:0 0 auto;z-index:40;transition:background .5s,backdrop-filter .5s}
.scrolled .top{background:rgba(241,238,233,.78);-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px)}
.top .wrap{display:flex;align-items:center;justify-content:space-between;height:68px;max-width:none}
.brand{display:flex;align-items:center;gap:8px;text-decoration:none;font-weight:400;font-size:19px;letter-spacing:-.01em}
.brand svg{width:26px;height:26px;color:var(--ink)}
.nav{display:flex;align-items:center;gap:clamp(14px,2.4vw,30px);font-size:14px}
.nav a{text-decoration:none;color:var(--ink2)}
.nav a:hover,.nav a[aria-current]{color:var(--ink)}
.lang{border:1px solid var(--line);border-radius:999px;padding:4px 12px;font-size:12.5px;letter-spacing:.02em}
@media (max-width:640px){.nav .opt{display:none}}

/* buttons */
.pill{display:inline-flex;align-items:center;gap:8px;background:var(--ink);color:var(--paper);border-radius:999px;padding:11px 20px;font-size:14px;text-decoration:none;letter-spacing:.01em}
.pill svg{width:15px;height:15px}
.pill.soft{background:transparent;color:var(--ink);border:1px solid var(--line)}
a.pill:hover{opacity:.88}

/* home: hero */
.home main{padding-top:68px}
.nb{white-space:nowrap}
.hero{padding:clamp(36px,6vw,84px) 0 clamp(48px,6vw,84px)}
.hero-grid{display:grid;grid-template-columns:1fr auto;gap:clamp(28px,5vw,80px);align-items:center}
.hero h1{font-size:clamp(34px,4.2vw,58px);line-height:1.14}
:lang(zh-Hans) .hero h1{line-height:1.28}
.hero .sub{margin-top:22px;max-width:30em;font-size:clamp(16px,1.35vw,19px);line-height:1.75;color:var(--ink2)}
.actions{margin-top:30px;display:flex;gap:12px;align-items:center;flex-wrap:wrap}
.req-line{margin-top:16px;font-size:13.5px;color:var(--mute)}

/* Apple product bezels, used as is; the screen sits in the bezel's transparent screen area */
.dev{position:relative;margin:0;flex:none}
.dev picture,.dev img{display:block;width:100%;height:auto}
.dev .bez{position:relative;z-index:1}
.dev .scr,.dev .scrwrap{position:absolute;z-index:0;overflow:hidden}
.iphone{width:var(--pw,290px)}
.iphone .scr{left:5.3333%;top:2.5%;width:89.3333%;height:95%}
.iphone .scr img{width:100%;height:100%}
.watch{width:var(--ww,170px)}
.watch .scrwrap{left:12.8571%;top:21.8182%;width:74.2857%;height:56.3636%;background:#000}
.watch .scrwrap .scr{position:static}
.watch .scrwrap img{width:100%;height:100%}
.wmark{position:absolute;left:50%;top:33.87%;width:34.6%;height:auto;aspect-ratio:1;transform:translate(-50%,-50%);color:#F1EEE9}
/* Both products at the same physical scale: watch width = 0.5853 × phone width (460 vs 326 ppi screens). */
.duo{--pw:290px;--ww:calc(var(--pw) * .5853);display:flex;align-items:flex-end;gap:clamp(16px,2.4vw,34px)}
@media (max-width:900px){.hero-grid{grid-template-columns:1fr}.duo{justify-content:center}}
.hero-grid>*{min-width:0}
/* Phones: the watch would fall below Apple's 200 px minimum next to the phone, so the hero shows the phone alone (the watch is in the first feature). */
@media (max-width:600px){.hero h1 br{display:none}.duo{--pw:min(64vw,250px)}.duo .watch{display:none}}

/* features */
.features,.more{padding:clamp(56px,7vw,100px) 0;border-top:1px solid var(--line)}
.home h2{font-size:clamp(26px,2.6vw,36px);line-height:1.2;margin-bottom:clamp(24px,3vw,40px)}
.fgrid{display:grid;grid-template-columns:repeat(3,1fr);gap:clamp(18px,2vw,28px)}
.feat{background:var(--card);border-radius:22px;padding:18px 18px 24px;display:flex;flex-direction:column}
.feat .vis{min-height:300px;flex:1;display:grid;place-items:center;margin-bottom:18px;border-radius:14px}
.feat>h3{font-size:18px;font-weight:400;line-height:1.4;padding:0 4px}
.feat>p{margin-top:6px;font-size:14.5px;line-height:1.7;color:var(--ink2);padding:0 4px}
.feat .watch{--ww:180px}
@media (max-width:1060px){.fgrid{grid-template-columns:1fr 1fr}}
@media (max-width:640px){.fgrid{grid-template-columns:1fr}.feat .vis{min-height:220px;padding:8px 0}}

.viz{width:100%;padding:6px 8px;font-size:13px;color:var(--ink2)}
.viz small{display:block;font-size:12px;color:var(--mute)}
.legend{margin-top:14px;font-size:12px;color:var(--mute);line-height:1.5}
.legend span{display:flex;align-items:center;gap:8px}
.legend span+span{margin-top:4px}
.sw{display:inline-block;width:14px;height:8px;border-radius:2px}
.sw.ink{background:var(--ink)}.sw.quiet{background:#D6D1C8}

.viz-day .kv{display:flex;gap:28px;margin-bottom:18px}
.viz-day .kv b{display:block;font-weight:300;font-size:26px;letter-spacing:-.01em;color:var(--mute)}
.viz-day .kv b.ink{color:var(--ink)}
.viz-day .track{width:100%;height:48px;display:block}
.viz-day .quiet{fill:#D6D1C8}.viz-day .speech{fill:var(--ink)}
.viz-day .ticks{position:relative;height:18px;margin-top:4px}
.viz-day .ticks span{position:absolute;transform:translateX(-50%);font-size:10.5px;color:var(--mute)}
.viz-day .ticks span:first-child{transform:none}.viz-day .ticks span:last-child{transform:translateX(-100%)}

.viz-call ol{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(4,1fr);gap:6px;text-align:center}
.viz-call li{display:flex;flex-direction:column;align-items:center;gap:6px}
.viz-call li b{font-weight:400;font-size:13px;color:var(--ink);line-height:1.3}
.viz-call .m{width:44px;height:44px;color:var(--ink)}
.viz-call .ph{width:44px;height:44px;border-radius:22px;display:grid;place-items:center;background:#E4DED4;color:var(--ink2)}
.viz-call .ph.end{background:transparent;border:1px dashed var(--faint);color:var(--mute)}
.viz-call .ph.end svg{transform:rotate(135deg)}
.viz-call .wave{width:100%;height:28px;margin-top:16px;display:block}
.viz-call .w{fill:none;stroke:var(--ink);stroke-width:1.6;vector-effect:non-scaling-stroke}
.viz-call .gap{fill:#D6D1C8}

.viz-flow{display:flex;flex-direction:column;align-items:stretch;gap:0;max-width:320px}
.viz-flow .node{border:1px solid var(--line);background:#fff;border-radius:12px;padding:8px 12px;font-size:14px;color:var(--ink)}
.viz-flow .node.pass{background:transparent;border-style:dashed;color:var(--ink2)}
.viz-flow .node.home{background:var(--ink);border-color:var(--ink);color:var(--paper)}
.viz-flow .node.home small{color:#B9C0BC}
.viz-flow .arrow{height:16px;width:1px;background:var(--faint);margin:0 auto;position:relative}
.viz-flow .arrow::after{content:"";position:absolute;bottom:0;left:-3px;border:3.5px solid transparent;border-top:5px solid var(--faint);border-bottom:0}
.viz-flow .fan{display:flex;gap:8px;margin-top:10px}
.viz-flow .fan span{flex:1;text-align:center;font-size:12.5px;color:var(--ink);border-top:1px solid var(--ink);padding-top:6px}

.viz-todos .ui{background:#fff;border-radius:18px;padding:14px 16px;max-width:330px;margin:0 auto;box-shadow:0 1px 0 rgba(0,0,0,.03)}
.ui-h{font-size:11.5px;font-weight:500;color:var(--mute);margin:2px 0 6px}
.ui-sum{font-size:13.5px;line-height:1.6;color:var(--ink);padding-bottom:10px;border-bottom:1px solid #ECE8E1;margin-bottom:8px}
.ui-todo{display:flex;gap:10px;align-items:flex-start;padding:7px 0;font-size:13.5px;color:var(--ink);line-height:1.45}
.ui-todo+.ui-todo{border-top:1px solid #ECE8E1}
.ui-todo i{flex:none;width:16px;height:16px;border:1.4px solid #A8ABA6;border-radius:50%;margin-top:1px}

.viz-agent{display:flex;flex-direction:column;gap:8px}
.viz-agent .win{width:100%;background:#fff;border-radius:12px;border:1px solid var(--line);overflow:hidden;font-size:11.5px}
.viz-agent .bar{display:flex;align-items:center;gap:5px;padding:7px 10px;border-bottom:1px solid #ECE8E1;color:var(--mute)}
.viz-agent .bar i{width:8px;height:8px;border-radius:50%;background:#DDD8CF}
.viz-agent .bar span{margin-left:8px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.viz-agent .files{display:grid;grid-template-columns:38% 1fr}
.viz-agent ul{list-style:none;margin:0;padding:6px;border-right:1px solid #ECE8E1;color:var(--ink2)}
.viz-agent li{padding:4px 6px;border-radius:5px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.viz-agent li.on{background:var(--ink);color:var(--paper)}
.viz-agent pre{margin:0;padding:8px 10px;font:10.5px/1.6 var(--mono);color:var(--ink2);white-space:pre-wrap}
.viz-agent .chat{align-self:flex-end;width:82%;display:flex;flex-direction:column;gap:6px}
.viz-agent .q{align-self:flex-end;background:var(--ink);color:var(--paper);border-radius:14px 14px 4px 14px;padding:7px 11px;font-size:12.5px}
.viz-agent .a{background:#fff;border:1px solid var(--line);border-radius:14px 14px 14px 4px;padding:8px 11px;font-size:12.5px;line-height:1.55;color:var(--ink)}
.viz-agent .a b{font-weight:500}
.viz-agent .a small{margin-top:3px}

.more-grid{display:grid;grid-template-columns:1fr 1.5fr;gap:clamp(28px,6vw,96px)}
.req{margin:0;border-top:1px solid var(--line)}
.req div{display:grid;grid-template-columns:5em 1fr;gap:14px;padding:13px 0;border-bottom:1px solid var(--line);font-size:15px}
.req dt{color:var(--mute)}.req dd{margin:0}
.faq details p{color:var(--ink2);font-size:15px;line-height:1.8}
.faq summary{font-size:16px;padding:14px 34px 14px 0}
@media (max-width:760px){.more-grid{grid-template-columns:1fr}}
.legal{flex-basis:100%;font-size:11.5px;color:var(--faint)}

/* footer */
footer{padding:34px 0 46px;font-size:13px;color:var(--mute);background:#E9E4DC}
footer .wrap{display:flex;flex-wrap:wrap;gap:12px 28px;justify-content:space-between;max-width:none}
footer nav{display:flex;flex-wrap:wrap;gap:8px 22px}
footer a{text-decoration:none}footer a:hover{color:var(--ink)}
.doc~footer,.page footer{background:transparent;border-top:1px solid var(--line)}
.home footer{background:transparent;border-top:1px solid var(--line)}

/* documents: privacy, terms, support, agents */
.doc{padding:clamp(130px,14vw,190px) var(--pad) clamp(80px,10vw,140px)}
.narrow{max-width:700px;margin:0 auto}
.doc h1{font-size:clamp(36px,5vw,60px);line-height:1.15}
.doc .updated{margin:18px 0 44px;color:var(--mute);font-size:15px;line-height:1.75}
.doc h2{font-size:clamp(21px,2.1vw,26px);font-weight:400;margin:56px 0 16px;padding-top:26px;border-top:1px solid var(--line)}
.doc p,.doc li{font-size:16.5px;line-height:1.85;color:var(--ink2)}
.doc p+p{margin-top:14px}
.doc strong{font-weight:500;color:var(--ink)}
.doc ul,.doc ol{padding-left:1.3em;margin:12px 0}
.doc li{margin:8px 0}
.doc li::marker{color:var(--mute)}
.tablewrap{overflow-x:auto;margin:18px 0}
.doc table{border-collapse:collapse;width:100%;font-size:14.5px;line-height:1.65}
.doc th{text-align:left;font-weight:400;color:var(--mute);font-size:12.5px;letter-spacing:.04em;padding:10px 14px 10px 0;border-bottom:1px solid var(--ink2)}
.doc td{vertical-align:top;padding:13px 14px 13px 0;border-bottom:1px solid var(--line);color:var(--ink2)}
.doc td:first-child{color:var(--ink);white-space:nowrap}
@media (max-width:640px){
  .doc table,.doc tbody,.doc tr,.doc td{display:block;width:100%}
  .doc tr:first-child{display:none}
  .doc tr{padding:14px 0;border-bottom:1px solid var(--line)}
  .doc td{border:0;padding:2px 0}
  .doc td:first-child{font-weight:500;white-space:normal}
}
.doc td .inline{white-space:nowrap;word-break:normal}
.inline{font-family:var(--mono);font-size:.86em;background:#E8E3DB;border-radius:5px;padding:2px 6px;color:var(--ink);word-break:normal;overflow-wrap:anywhere}
.code{font-family:var(--mono);font-size:13.5px;line-height:1.7;background:#1B2B2C;color:#E9E4DC;border-radius:10px;padding:16px 18px;margin:12px 0;white-space:pre-wrap;word-break:break-all}
.note{margin:22px 0;padding:4px 0 4px 18px;border-left:2px solid var(--ink);color:var(--ink2);font-size:15.5px;line-height:1.8}
details{border-bottom:1px solid var(--line)}
details:first-of-type{border-top:1px solid var(--line)}
summary{cursor:pointer;list-style:none;padding:18px 34px 18px 0;font-size:17px;position:relative}
summary::-webkit-details-marker{display:none}
summary::after{content:"";position:absolute;right:4px;top:50%;width:9px;height:9px;border-right:1px solid var(--ink2);border-bottom:1px solid var(--ink2);transform:translateY(-70%) rotate(45deg);transition:transform .3s}
details[open] summary::after{transform:translateY(-30%) rotate(-135deg)}
details p{padding:0 0 20px}
`;
