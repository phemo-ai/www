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
.feat .watch{--ww:200px}
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

/* Watch screen follows the display's rounded corners (measured on the bezel: ~110 px radius on 416×496). */
.watch .scrwrap{border-radius:26.4%/22.2%;container-type:inline-size}
/* Live watch: real recording screen with the animated mark, or the watch face (data-state). */
.live .wapp,.live .wface{position:absolute;inset:0}
.live .wapp{transition:transform .5s cubic-bezier(.3,.75,.25,1),opacity .35s ease;transform-origin:50% 42%}
.live .wapp .scr{position:static}
.wmark2{position:absolute;left:50%;top:42.45%;width:37.5%;height:auto;aspect-ratio:1;transform:translate(-50%,-50%);color:#fff}
.wface{background:#000;color:#fff;font-family:-apple-system,"SF Pro Rounded","Inter",sans-serif;opacity:0;transform:scale(1.06);transition:opacity .45s ease .12s,transform .55s cubic-bezier(.3,.75,.25,1) .08s}
.live[data-rec="0"] .wmic{display:none}
.fcap .rec,.live[data-rec="0"] .fcap .idle{display:inline}
.fcap .idle,.live[data-rec="0"] .fcap .rec{display:none}
.fcap i{font-style:normal}
.live[data-rec="0"] .fcomp svg{opacity:.85}
.wmic{position:absolute;top:4.5%;left:50%;transform:translateX(-50%);width:7.5cqw;height:7.5cqw;border-radius:50%;background:#FF9F0A;color:#000;display:grid;place-items:center}
.wmic svg{width:72%;height:72%}
.fdate{position:absolute;top:15%;left:11%;font-size:7.4cqw;font-weight:600;color:#FF9F0A;letter-spacing:.02em}
.ftime{position:absolute;top:22%;left:9%;font-size:27cqw;font-weight:200;line-height:1;letter-spacing:-.02em}
.fcomp{position:absolute;bottom:13%;left:50%;width:30cqw;height:30cqw;transform:translateX(-50%);border-radius:50%;border:0;padding:0;background:#1C1C1E;display:grid;place-items:center;color:#fff;cursor:pointer}
.fcomp:active{transform:translateX(-50%) scale(.94)}
.fcomp svg{width:74%;height:74%}
.fcap{position:absolute;bottom:5%;left:0;right:0;text-align:center;font-size:6cqw;color:#9A9A9F}
.live[data-state=face] .wapp{transform:scale(.18);opacity:0}
.live[data-state=face] .wface{opacity:1;transform:none}

/* Changelog */
.releases{margin-top:8px}
.rel{padding:26px 0 22px;border-top:1px solid var(--line)}
.rel header{display:flex;align-items:baseline;gap:12px;margin-bottom:10px}
.rel .tag{font-size:12.5px;border:1px solid var(--ink);border-radius:999px;padding:2px 10px;color:var(--ink)}
.rel.next .tag{border-style:dashed;border-color:var(--faint);color:var(--ink2)}
.rel time{font-size:14px;color:var(--mute)}
.rel ul{margin:0;padding-left:1.15em}
.rel li{margin:5px 0}

/* Agents directory */
.agents-dir{max-width:1120px;margin:8px auto 0}
.agents-dir>h2{font-size:clamp(21px,2.1vw,26px);font-weight:400;margin:24px 0 10px}
.agents-dir>p{max-width:760px;color:var(--ink2);font-size:15.5px;line-height:1.8}
.agents-dir .grp{margin:34px 0 14px;font-size:13px;font-weight:500;letter-spacing:.08em;text-transform:uppercase;color:var(--mute)}
.agent-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:14px;align-items:start}
.agent-card{background:#fff;border:1px solid var(--line);border-radius:18px;padding:16px 16px 14px;display:flex;flex-direction:column;gap:12px;scroll-margin-top:96px;transition:box-shadow .3s,border-color .3s}
.agent-card:target{border-color:var(--ink);box-shadow:0 0 0 3px rgba(27,43,44,.12)}
.agent-card header{display:flex;align-items:baseline;justify-content:space-between;gap:10px}
.agent-card h3{font-size:16px;font-weight:500;margin:0}
.agent-card .form{flex:none;font-size:11.5px;color:var(--mute);border:1px solid var(--line);border-radius:999px;padding:1px 8px}
.agent-card .pill.go{align-self:flex-start;padding:9px 16px;font-size:13.5px}
.agent-card .how{margin:0;font-size:13.5px;line-height:1.6;color:var(--ink2)}
.cmdline,.cfg{position:relative;display:flex;align-items:flex-start;gap:8px;background:#1B2B2C;color:#E9E4DC;border-radius:10px;padding:10px 10px 10px 12px}
.cmdline code{flex:1;min-width:0;font:12.5px/1.6 var(--mono);white-space:pre-wrap;overflow-wrap:break-word}
.cfg pre{flex:1;min-width:0;margin:0;font:12px/1.55 var(--mono);white-space:pre-wrap;overflow-wrap:break-word}
.copy{flex:none;border:1px solid #4A5856;background:transparent;color:#E9E4DC;border-radius:7px;padding:3px 9px;font:inherit;font-size:12px;cursor:pointer}
.copy.done{background:#E9E4DC;color:#1B2B2C}
.agent-card details summary{font-size:12.5px;color:var(--mute);padding:2px 0 8px;cursor:pointer}
.agent-card details summary::after{display:none}
.agent-card details p{padding:0}
.agents-dir .fine{margin-top:22px;font-size:13px;color:var(--mute)}
.doc.wide .agents-dir{padding:0}

/* Fixed Apple artwork; screen-only, touch and keyboard controls. */
.dev .bez{pointer-events:none}
.live .wapp{transition:opacity .25s ease;transform:none}
.live[data-state=face] .wapp{transform:none;opacity:0;pointer-events:none}
.wface{transform:none;transition:opacity .25s ease}
.live[data-state=app] .wface{pointer-events:none}
.crown{position:absolute;z-index:3;left:92%;top:30%;width:10%;height:16%;min-width:44px;min-height:44px;padding:0;border:0;background:transparent;cursor:pointer}
.crown:focus-visible{outline:2px solid var(--ink);outline-offset:5px}
.tapscr:focus-visible{outline:2px solid #fff;outline-offset:-5px}
.tapscr{position:absolute;inset:0;border:0;background:transparent;cursor:pointer;border-radius:26%}
.watch-hint{position:absolute;left:50%;top:100%;width:300px;max-width:90vw;transform:translateX(-50%);text-align:center;font-size:14px;line-height:1.5;color:var(--ink2);padding:12px 0;transition:opacity .2s}
.watch-hint.dismissed{opacity:0}
.flag{position:absolute;z-index:3;left:50%;top:47%;transform:translate(-50%,-50%);white-space:nowrap;font-size:14px;color:#fff;background:#1B2B2C;border-radius:999px;padding:6px 12px;opacity:0;pointer-events:none}
.live.marked .flag{opacity:1}

/* All scenes are present at load; scrolling never controls the content. */
.home main{padding-top:68px}
.scene{padding-top:24px}
.row{padding:64px 0}
.row+.row{border-top:1px solid var(--line)}
.r1{padding-top:16px}
.r1g{display:grid;grid-template-columns:minmax(0,1fr) auto;align-items:center;gap:32px}
.sc-intro h1{font-size:clamp(34px,3.3vw,50px);line-height:1.22;letter-spacing:-.025em}
:lang(zh-Hans) .sc-intro h1{line-height:1.35}
.sc-intro .sub{max-width:29em;margin-top:22px;color:var(--ink2);font-size:17px;line-height:1.75}
.sc-intro .pill{margin-top:24px;font-size:14px}
.rcap{max-width:900px;margin:38px auto 0;padding:0 var(--pad);text-align:center;font-size:15px;line-height:1.75;color:var(--ink2)}
.rcap b{display:block;font-weight:500;font-size:22px;color:var(--ink);margin-bottom:8px}
.rcap.side{margin:0;padding:0;text-align:left;max-width:20em}
.pair1,.pair2,.pair3{display:flex;align-items:center;justify-content:center}
.pair1{--ph:350px;gap:16px;padding-bottom:48px}
.pair1 .iphone{--pw:var(--ph);width:var(--ph)}
.pair1 .watch{--ww:calc(var(--ph) * .5853)}
.pair1 .gap{width:32px;display:grid;place-items:center}
.echo{width:32px;height:48px;opacity:.4;transition:opacity .3s}
.echo path{fill:none;stroke:var(--ink);stroke-width:3;stroke-linecap:round}
.pair1.talking .echo{opacity:1}
.echo .e1{animation:ech 1.6s ease-in-out infinite}.echo .e2{animation:ech 1.6s ease-in-out .25s infinite}
@keyframes ech{0%,100%{opacity:.15}45%{opacity:1}}
.sc-phone .scr{overflow:hidden}
.sc-phone .simg{position:absolute;inset:0}
/* Simultaneously shown iPad and Mac retain Apple's relative scale. */
.pair2{--mw:min(600px,45vw);align-items:flex-end;gap:32px}
.pair2 .macf{width:var(--mw)}
.pair2 .ipadf{width:calc(var(--mw) * .7838)}
.ipadf .scr{left:4.1667%;top:5.6383%;width:91.6667%;height:88.7234%;border-radius:2.56%/3.72%;background:#fff}
.macf .scr{left:12.3529%;top:12.8571%;width:75.2941%;height:74.2857%;background:#fff}
.docscr{position:absolute;inset:0;container-type:size;display:flex;flex-direction:column;background:#fff;color:#1D1D1F;font-family:var(--sans)}
.dbar{flex:none;padding:2.5cqh 4cqw;font-size:clamp(10px,3.5cqh,14px);color:#6E6E73;border-bottom:1px solid #ECECEF}
.dbody{flex:1;min-height:0;display:flex}
.dfiles{width:26%;margin:0;padding:3cqh 2cqw;list-style:none;background:#F7F7F9;font-size:3.5cqh;color:#3A3A3C;overflow-wrap:anywhere}
.dfiles li{padding:1.4cqh 1cqw;border-radius:4px}
.dfiles li.on{background:#E4E4E9}
.dpage{flex:1;min-width:0;padding:4cqh 4cqw;font:3.5cqh/1.6 var(--mono);color:#2C2C2E}
.dpage h4{font:500 4.5cqh/1.4 var(--mono);margin:0 0 2cqh}
.dpage h5{font:500 3.5cqh/1.4 var(--mono);color:#6E6E73;margin:2cqh 0 1cqh}
.cloudmark{position:relative;display:flex;flex-direction:column;align-items:center;gap:6px;text-align:center}
.cloudmark .lk{position:relative;width:56px;height:56px;color:var(--ink)}
.cloudmark .lk svg{width:100%;height:100%}
.cloudmark .ring{position:absolute;left:50%;top:28px;width:120px;height:120px;margin:-60px 0 0 -60px;border-radius:50%;border:1px solid var(--line);animation:cloud-ring 3.2s ease-out infinite}
@keyframes cloud-ring{0%{transform:scale(.55);opacity:.9}100%{transform:scale(1.5);opacity:0}}
.cloudmark b{margin-top:10px;font-size:32px;font-weight:400}
.cloudmark small{font-size:14px;color:var(--ink2)}
.tree{margin:20px 0 0;text-align:left;font:14px/1.9 var(--mono);color:var(--ink2);white-space:pre-wrap}
.r2 .rcap{display:none}
.pair3{gap:64px;align-items:center}
.acard{flex:none;width:480px;min-width:0;border-radius:20px;background:#1E2523;color:#E9E5DD;box-shadow:0 16px 40px #1b2b2c12;text-align:left}
.atitle{position:relative;height:56px;background:#2A3230;border-radius:20px 20px 0 0}
.an{position:absolute;inset:0;display:flex;align-items:center;gap:12px;padding:0 24px;font-size:15px;opacity:0}
.an.is-on{opacity:1}
.an b{font-weight:500}
.aterm{padding:24px;font-size:15px;line-height:1.7}
.source-line{padding-bottom:22px;border-bottom:1px solid #43514b}
.agent-files{display:flex;flex-wrap:wrap;gap:10px;margin:22px 0}
.agent-files>span{display:flex;align-items:center;gap:8px;background:#303c36;padding:10px;border-radius:8px;font:14px var(--mono)}
.agent-files i{font-style:normal;color:#b3d6c1}
.email-result{font-size:14px;color:#b3d6c1}
.astrip{display:flex;flex-wrap:wrap;justify-content:center;align-items:center;gap:16px 24px;max-width:960px;margin:48px auto 0;font-size:14px;color:var(--ink2)}
.as{display:inline-flex;align-items:center;gap:9px;text-decoration:none}
.as i{font-style:normal}
.as.is-on{text-decoration:underline;text-underline-offset:6px}
.amark{flex:none;color:#000}
.acard .amark{color:#fff}
.official-mark{position:relative;display:inline-block;vertical-align:middle}
.official-mark img{position:absolute;inset:0;width:100%;height:100%}
.mark-white{display:none}
.acard .mark-black{display:none}.acard .mark-white{display:block}
.lm-mark{display:inline-flex;background:#000;border-radius:4px;padding:3px;vertical-align:middle}
.lm-mark img{display:block}

.agent-card h3 .amark{margin-right:10px;vertical-align:-3px}
.scene .fine{margin:32px 0 0;text-align:center;color:var(--ink2);font-size:14px}
[data-watch-scene] .echo path,[data-motion] .ring{animation-play-state:paused}
[data-watch-scene].motion-visible .echo path,[data-motion].motion-visible .ring{animation-play-state:running}

.dpage{position:relative;flex:1;min-height:0;overflow-y:auto;padding:10px 16px;font:14px/1.4 var(--sans);scrollbar-width:thin;scrollbar-color:#c9c9ce transparent;text-align:left}
.dpage:focus-visible{outline:2px solid #536d65;outline-offset:-3px}
.dpage h4{font:500 17px/1.4 var(--mono);margin:0 0 6px}
.dpage h5{font:500 14px/1.4 var(--mono);margin:6px 0 4px;color:#66706b}
.dpage p{margin:0}
.dpage ul{list-style:none;margin:0;padding:0}
.dpage li{margin:0 0 3px}
.day-sections{display:grid;grid-template-columns:1fr 1fr;gap:16px}
.day-sections section{min-width:0}
.day-sections li::before{content:"· ";color:#66706b}
.day-sections .day-todos li::before{content:none}
.day-todos span{display:inline-block;width:10px;height:10px;border:1px solid #8a938d;border-radius:2px;vertical-align:baseline}
.day-transcript li{display:flex;gap:8px}
.day-transcript time{flex:none;color:#66706b;font:14px/1.4 var(--mono)}
.dbar{display:flex;justify-content:space-between;align-items:center;font:14px/1.4 var(--mono);padding:6px 16px;background:#fafafa}
@container(max-width:360px){.day-sections{grid-template-columns:1fr;gap:0}.dpage{padding:10px 12px}.dbar{padding:5px 12px}}

/* Outcome cards share their exact prompts with /agents. */
.outcomes{padding:88px 0;border-top:1px solid var(--line);background:#e9e6df}
.outcomes-head{max-width:760px;margin-bottom:40px}
.eyebrow{font-size:14px;color:var(--ink2);margin-bottom:12px}
.home .outcomes h2,.outcomes h2{font-size:clamp(32px,3.5vw,48px);line-height:1.2;margin:0 0 20px}
.outcomes-head>p:not(.eyebrow){font-size:17px;line-height:1.7;color:var(--ink2)}
.outcomes-head .outcomes-tools{margin-top:18px;font-size:14px!important}
.outcomes-head small{display:block;font-size:14px;color:var(--ink2);margin-top:10px}
.outcome-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:20px}
.outcome{min-width:0;display:flex;flex-direction:column;background:var(--card);border:1px solid #fff9;border-radius:24px;padding:28px}
.outcome header{display:flex;align-items:baseline;gap:14px}
.case-number{font:14px var(--mono);color:var(--ink2)}
.outcome h3{font-size:22px;font-weight:400;line-height:1.4;letter-spacing:-.02em}
.outcome blockquote{margin:24px 0 18px;padding:0 0 0 16px;border-left:2px solid #bcb9b1}
.outcome time{display:block;font:14px var(--mono);color:var(--ink2);margin-bottom:6px}
.outcome blockquote p{font-size:19px;line-height:1.6}
.outcome .agent-action{font-size:15px;line-height:1.8;color:var(--ink2);margin-bottom:20px}
.deliverable{border:1px solid var(--line);border-radius:14px;padding:20px;background:#fff;min-height:154px;margin-top:auto;display:flex;flex-direction:column;justify-content:center;gap:16px}
.result-files{display:flex;flex-wrap:wrap;gap:10px}
.file-chip{display:inline-flex;align-items:center;gap:10px;align-self:flex-start;font:14px var(--mono);color:var(--ink);overflow-wrap:anywhere;max-width:100%}
.file-chip i{display:grid;place-items:center;font:500 14px var(--sans);font-style:normal;width:32px;height:38px;background:#edf1ed;border:1px solid #dbe3dc;border-radius:4px;color:#436650;flex:none}
.result-row{display:flex;align-items:flex-start;gap:12px}
.result-check{display:grid;place-items:center;width:28px;height:28px;border-radius:50%;background:#e9f0e8;color:#436650;flex:none}
.result-row b{display:block;font-size:16px;font-weight:500;line-height:1.5}
.result-row div>span,.result-note{display:block;font-size:14px;line-height:1.6;color:var(--ink2);margin-top:4px}
.pr-preview{display:flex;flex-direction:column;gap:10px}
.pr-badge{align-self:flex-start;background:#e7f1e9;color:#386246;padding:3px 9px;border-radius:999px;font-size:14px}
.pr-preview b{font-size:17px;font-weight:500}
.pr-preview code{font:14px var(--mono);overflow-wrap:anywhere}
.pr-preview code span{color:var(--mute)}
.prompt{display:flex;align-items:flex-start;gap:16px;padding-top:20px;margin-top:20px;border-top:1px solid var(--line)}
.prompt p{min-width:0;flex:1;font-size:14px;line-height:1.8;color:var(--ink2);margin:0}
.prompt .copy{font-size:14px;line-height:1.5;min-height:44px;min-width:60px;padding:9px 12px;border:1px solid var(--line);border-radius:999px;color:var(--ink);background:transparent}
.prompt .copy:hover{background:#e9e6df}
.prompt .copy.done{background:var(--ink);color:var(--paper)}
.outcomes>.wrap>.pill{margin-top:32px}
.outcomes.compact{padding:0 0 48px;background:none;border:0}
.doc .outcomes h2{border:0;padding:0;margin:0 0 16px}
.compact .outcomes-head{margin-bottom:24px}
.compact .outcome{padding:20px;border:1px solid var(--line);border-radius:16px}
.compact .outcome h3{font-size:18px}
.compact .outcome p{font-size:14px}
.compact .outcome header{justify-content:flex-start}
.compact .prompt{margin-top:auto;padding-top:16px;border:0}
.compact .outcomes-tools,.compact .outcomes-head small{display:none}
@media(max-width:1100px){.r1g{grid-template-columns:1fr}.sc-intro{max-width:700px}.pair1{margin-top:28px}.pair3{gap:32px}.acard{width:440px}}
@media(max-width:760px){
.row{padding:48px 0}.r1{padding-top:8px}.scene{padding-top:20px}
.sc-intro h1{font-size:36px}.sc-intro .sub{font-size:16px}
.pair1{--ph:342px;flex-direction:column;gap:48px;margin-top:40px;padding-bottom:0}
.pair1 .watch{--ww:calc(342px * .5853);margin-bottom:32px}
.pair1 .iphone{max-width:100%}.pair1 .gap{display:none}
.rcap{margin-top:28px;font-size:15px}.rcap b{font-size:21px}
.pair2{flex-direction:column;align-items:center;gap:40px;--mw:min(440px,100%)}
.pair2 .macf{width:min(440px,100%)}.pair2 .ipadf{width:min(344.872px,78.38%)}
.pair3{flex-direction:column;gap:28px}.acard{width:100%}.aterm{padding:22px}.atitle .an{padding:0 22px}
.rcap.side{text-align:center;max-width:30em}
.astrip{gap:14px 20px;margin-top:32px}.scene .fine{margin-top:24px}
.outcomes{padding:56px 0}.outcome-grid{grid-template-columns:1fr;gap:18px}
.outcomes-head{margin-bottom:28px}.outcome{padding:22px}.outcome h3{font-size:21px}
.outcome blockquote p{font-size:18px}.deliverable{padding:16px;min-height:148px}
.prompt{gap:12px}.agent-files{gap:8px}.agent-files>span{font-size:14px;padding:8px}
/* Page copy stays legible; the small type inside device illustrations is their UI at scale. */
.lang,.sc-intro .pill,.scene .fine,.req-line,footer,.legal,.req div,.feat p,.feat h3,.viz small,.legend,.viz-call li b,.ui-h,.ui-sum,.ui-todo,.viz-agent .q,.viz-agent .a,.agent-card .form,.agent-card .how,.agent-card .pill.go,.copy,.agent-card details summary,.agents-dir .grp,.agents-dir .fine,.cmdline code,.cfg pre,.doc th,.code{font-size:14px}
.viz-agent .files{grid-template-columns:1fr}.viz-agent ul{border-right:0;border-bottom:1px solid var(--line)}
.viz-agent .win,.viz-agent pre{font-size:14px}.viz-agent .bar{font-size:14px}.viz-day .ticks span{font-size:14px}
.feat .watch{--ww:200px}.feat .vis{min-height:330px}
.req div{grid-template-columns:6em 1fr}
}
@media(prefers-reduced-motion:reduce){
*,*::before,*::after{animation:none!important;transition:none!important;scroll-behavior:auto!important}
}
`;
