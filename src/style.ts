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
.brand .wordmark{width:auto;height:35px;margin:1px 0 0 -3px;fill:currentColor;stroke:currentColor;stroke-width:.9;stroke-linejoin:round;overflow:visible}
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

.amark{flex:none;color:#000}
.agent-card h3 .amark{margin-right:10px;vertical-align:-3px}

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
@media(max-width:760px){
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
/* Home hero: one open figure for a whole recorded day. The day's timeline on top; under it Watch → your iCloud → iPhone,
   then the Phemo library in iCloud Drive (skill / MCP) → your agent. Device sizes follow the viewport height
   (--ph is the phone's height) so everything fits the first screen; the phone UI scales with its screen. */
.vendor-mark{display:inline-block;object-fit:contain;vertical-align:middle}
.lm-vendor{background:#000;border-radius:4px;padding:2px}
.journey{--reserve:330px;--ph:min(clamp(430px,calc(100vh - var(--reserve)),600px),38vw);--pw:calc(var(--ph) * .489);--ww:calc(var(--pw) * .68);--sage:#4f7462;--sage2:#a9bbaf;--tint:#e4ece5;max-width:1480px;margin:0 auto;padding:16px clamp(20px,2.8vw,40px) 30px}
@supports (height:100svh){.journey{--ph:min(clamp(430px,calc(100svh - var(--reserve)),600px),38vw)}}
.j-head{display:flex;align-items:flex-end;justify-content:space-between;gap:24px;margin-bottom:18px}
.j-head h1{font-size:clamp(32px,3.5vw,50px);line-height:1.15;letter-spacing:-.03em}
:lang(zh-Hans) .j-head h1{letter-spacing:.01em}
.j-head h1 span{display:inline-block;white-space:pre}
.j-sub{margin-top:8px;max-width:62em;font-size:16px;line-height:1.6;color:var(--ink2)}
.j-cta{flex:none;display:flex;flex-direction:column;align-items:flex-end;gap:8px;padding-bottom:4px}
.j-cta small{font-size:14px;color:var(--ink2);white-space:nowrap}
.j-cta .pill{padding:9px 18px;white-space:nowrap}

.stage{position:relative;display:grid;grid-template-columns:auto 104px auto minmax(190px,1fr) minmax(350px,min(33vw,500px));grid-template-rows:auto 1fr;row-gap:16px}
.rails{position:absolute;inset:0;width:100%;height:100%;overflow:visible;pointer-events:none;z-index:0}
.rail{fill:none;stroke:var(--sage2);stroke-width:1.5;stroke-linecap:round;opacity:.55}
.rail-on{fill:none;stroke:var(--sage);stroke-width:1.5;stroke-linecap:round;stroke-dasharray:1;stroke-dashoffset:1;transition:stroke-dashoffset .6s ease}
.rail-on.is-on{stroke-dashoffset:0}
.rails circle{fill:var(--sage)}
.st{position:relative;z-index:1;display:flex;flex-direction:column;min-width:0}
.icloud{display:block}

/* The day: everything the watch has kept since morning, up to now. Silence is a dot; speech is a bar. */
.day{grid-column:1/-1;position:relative;z-index:1}
.day-top{display:flex;align-items:baseline;justify-content:space-between;gap:16px;font-size:14px;line-height:1.4;color:var(--ink2);white-space:nowrap}
.day-top p{display:flex;align-items:baseline;gap:12px;min-width:0}
.day-top p>b{font-size:17px;font-weight:500;color:var(--ink)}
.day-top p>b span+span{font-variant-numeric:tabular-nums}
.day-lib{align-items:center!important;gap:8px!important}
.day-lib .icloud{width:22px;flex:none}
.day-lib b{font-weight:500;color:var(--ink)}
.day-track{position:relative;height:40px;margin-top:6px}
.day-wave{position:absolute;inset:0}
.day-wave svg{display:block;width:100%;height:100%;overflow:visible}
.day-wave .w110{display:none}
.day-wave path{fill:none;stroke-width:2;stroke-linecap:round;vector-effect:non-scaling-stroke}
.day-rest path{stroke:var(--sage2);opacity:.7}
.day-past{transition:clip-path .7s cubic-bezier(.3,.7,.2,1)}
.day-past path{stroke:var(--ink)}
.day-now{position:absolute;top:-3px;bottom:-3px;width:0;border-left:1.5px solid var(--sage);transition:left .7s cubic-bezier(.3,.7,.2,1)}
.day-now::after{content:"";position:absolute;left:-5px;top:50%;width:9px;height:9px;margin-top:-4.5px;border-radius:50%;background:var(--sage);box-shadow:0 0 0 3px var(--paper)}
.journey[data-stage=recording] .day-now::after{background:#FF9F0A;animation:pulse .6s ease-in-out infinite alternate}
.day-now time{position:absolute;left:8px;top:-1px;font:12px/1.3 var(--mono);color:var(--sage);background:var(--paper);padding:0 4px;border-radius:4px}
.day-axis{position:relative;height:18px;margin-top:2px;font:12px/18px var(--mono);color:var(--mute)}
.day-axis span{position:absolute;top:0}
.st-body{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center}

/* 1 · Watch: what is being said, the watch, the trigger */
.st-watch{width:calc(var(--ww) + 64px)}
.bubble{position:relative;width:100%;background:#fff;border:1px solid var(--line);border-radius:16px;padding:9px 14px 11px;margin-bottom:14px}
.bubble::after{content:"";position:absolute;left:50%;bottom:-7px;width:12px;height:12px;background:#fff;border-right:1px solid var(--line);border-bottom:1px solid var(--line);transform:translateX(-50%) rotate(45deg)}
.bubble-top{display:flex;align-items:center;gap:8px;height:20px}
.bubble time{flex:none;font:13px var(--mono);color:var(--mute)}
.bubble-ctx{flex:1;min-width:0;font-size:13px;color:var(--ink2);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.bubble-top .bars{flex:none}
.bubble p{margin-top:2px;font-size:16px;line-height:1.45;min-height:2.9em}
:lang(en) .bubble p{min-height:4.35em}
.bars{display:flex;align-items:center;gap:2px;height:16px}
.bars i{width:2px;height:var(--h);border-radius:2px;background:var(--sage);transform:scaleY(.2);opacity:.4}
.journey[data-stage=recording] .bars i{opacity:1;animation:bar .48s ease-in-out infinite alternate;animation-delay:calc(var(--i) * -83ms)}
@keyframes bar{to{transform:scaleY(1)}}
.wdev{display:flex;flex-direction:column;align-items:center}
.journey .watch{margin:0 auto}
.journey .watch-hint,.journey .flag{display:none}
.journey .crown{left:93.93%;top:31.82%;width:6.07%;height:11.82%;min-width:0;min-height:0;z-index:3;overflow:visible}
.journey .crown::before{content:"";position:absolute;left:50%;top:50%;width:44px;height:44px;transform:translate(-50%,-50%)}
.journey .crown::after{content:"";position:absolute;left:50%;top:50%;width:26px;height:26px;margin:-13px;border-radius:50%;border:1.5px solid var(--sage);opacity:0;pointer-events:none;animation:crown-hint 3.6s ease-out 2.4s infinite}
.journey .crown.pressed::after{animation:none}
@keyframes crown-hint{0%{opacity:.75;transform:scale(.5)}35%,100%{opacity:0;transform:scale(1.5)}}
.journey .crown picture,.journey .crown img{width:100%;height:100%;object-fit:contain}
.journey .fcomp::before{content:"";position:absolute;inset:-8px;min-width:44px;min-height:44px}
.simulate{display:inline-flex;align-items:center;gap:8px;margin-top:12px;border:0;border-radius:999px;background:var(--ink);color:var(--paper);font:500 15px/1.3 var(--sans);padding:11px 20px 11px 16px;min-height:44px;cursor:pointer;box-shadow:0 6px 18px rgba(27,43,44,.18);transition:transform .15s}
.simulate svg{width:18px;height:18px;transition:color .2s}
.simulate:hover{transform:translateY(-1px)}
.simulate:active{transform:scale(.97)}
.journey[data-stage=recording] .simulate svg{color:#FF9F0A}
.st-hint{margin-top:8px;font-size:14px;line-height:1.4;color:var(--mute);text-align:center}

/* 2 · iPhone: the Today screen, drawn in em so it scales with the screen (16.6 pt ≈ 1em) */
.st-phone .iphone{width:var(--pw)}
.journey .iphone .scr{border-radius:13%/6.2%;background:#f2f2f7;container-type:inline-size}
.pui{height:100%;display:flex;flex-direction:column;padding:0 1.05em .7em;font-size:5.5cqw;line-height:1.35;color:#151719;font-family:-apple-system,BlinkMacSystemFont,var(--sans)}
.pui-status{display:flex;justify-content:space-between;align-items:center;height:3.5em;padding:.8em .7em 0;font-size:.95em;font-weight:600}
.pui-batt{width:1.7em;height:.8em;border-radius:.25em;background:#151719}
.pui header{display:flex;align-items:baseline;justify-content:space-between;gap:.5em;margin-top:.8em}
.pui header b{font-size:2.05em;font-weight:700;letter-spacing:-.02em}
.pui header span{min-width:0;font-size:.88em;color:#73747c;font-variant-numeric:tabular-nums;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.pui-live{display:flex;align-items:center;gap:.5em;margin:.8em 0 .65em;padding:.5em .8em;border-radius:999px;background:#fff;font-size:.88em;color:#3c3d43}
.pui-live svg{flex:none;width:1.5em;height:1.5em;color:#151719}
.pui-live .bars{margin-left:auto;height:1.1em;gap:.14em}
.pui-live .bars i{width:.14em}
.pui-entry{background:#fff;border-radius:1.1em;padding:.75em .95em .85em;margin-bottom:.6em}
.pui-meta{display:flex;justify-content:space-between;align-items:center;margin-bottom:.25em;font-size:.82em;color:#73747c}
.pui-meta time{font-family:var(--mono)}
.pui-meta span{color:var(--sage)}
.pui-entry p{font-size:.92em;color:#55575e}
.pui-now{box-shadow:0 .15em .9em rgba(21,23,25,.07)}
.pui-now p{font-size:1.3em;line-height:1.4;color:#151719;min-height:4.2em;transition:color .3s}
.journey:not(.s-heard) .pui-now p{color:#8e9398}
.journey:not(.s-heard) .pui-meta span{color:#8e9398}
.pui-saved{margin-top:auto;display:flex;align-items:center;gap:.45em;padding:.5em .2em 0;font-size:.82em;color:#73747c;transition:opacity .3s}
.pui-saved code{margin-left:auto;font:1em var(--mono);color:#3c3d43}
.pui-tick{display:grid;place-items:center;width:1.5em;height:1.5em;border-radius:50%;background:var(--sage);color:#fff;font-size:.8em}
.journey:not(.s-saved) .pui-saved{opacity:.25}
.pui-home{flex:none;width:36%;height:.32em;border-radius:1em;background:#151719;margin:.8em auto 0}

/* Your iCloud joins the watch and the phone; the Phemo library in iCloud Drive joins the phone and the agent. */
.cloud{position:relative;display:flex;flex-direction:column;align-items:center}
.cloud-disc{position:relative;flex:none;display:grid;place-items:center;width:62px;height:62px;border-radius:23%;background:#fff;box-shadow:0 0 0 1px rgba(27,43,44,.07),0 6px 18px rgba(27,43,44,.1)}
.cloud-disc svg{width:68%;height:auto}
.cloud-disc::after{content:"";position:absolute;inset:-1px;border-radius:inherit;border:1.5px solid #3d9df7;opacity:0}
.journey[data-stage=recording] .cloud-disc::after{animation:ring 1.1s ease-out infinite}
@keyframes ring{0%{opacity:.8;transform:scale(1)}100%{opacity:0;transform:scale(1.5)}}
.cloud-text{position:absolute;top:100%;left:50%;width:132px;transform:translateX(-50%);padding-top:8px;display:flex;flex-direction:column;align-items:center;text-align:center}
.cloud-text b{font-size:15px;font-weight:500;line-height:1.4}
.cloud-text small{font-size:14px;line-height:1.4;color:var(--ink2)}
.cloud-sync{font-size:14px;line-height:1.4;color:var(--sage)}
.st-lib{padding:0 16px}
.lib{width:100%;max-width:200px;display:flex;flex-direction:column;gap:9px;background:#fff;border:1px solid var(--line);border-radius:18px;padding:12px 13px;transition:border-color .3s,box-shadow .3s}
.journey[data-stage=saving] .lib,.journey[data-stage=reading] .lib{border-color:var(--sage);box-shadow:0 8px 26px rgba(79,116,98,.16)}
.lib-head{display:flex;align-items:center;gap:8px}
.lib-head .icloud{flex:none;width:26px}
.lib-head p{min-width:0;display:flex;flex-direction:column;line-height:1.35}
.lib-head b{font-size:14px;font-weight:500;white-space:nowrap}
.lib-head small{font-size:13px;color:var(--ink2);white-space:nowrap}
.lib-total{font-size:15px;font-weight:500;line-height:1.3;white-space:nowrap;font-variant-numeric:tabular-nums}
.lib-rows{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:4px}
.lib-rows li{display:flex;align-items:center;gap:8px;font-size:14px;line-height:1.3;color:var(--ink);background:var(--card);border-radius:8px;padding:5px 9px}
.lib-rows li::before{content:"";flex:none;width:5px;height:5px;border-radius:50%;background:var(--sage2)}
.journey[data-stage=reading] .lib-rows li{animation:lib-hit .55s ease-out both;animation-delay:calc(var(--i) * .15s)}
@keyframes lib-hit{0%,100%{background:var(--card)}35%{background:var(--tint);transform:translateX(3px)}}
.lib-via{display:flex;flex-wrap:wrap;align-items:center;gap:5px;font-size:13px;color:var(--ink2)}
.lib-via b{font:500 12px/1 var(--mono);color:var(--ink);border:1px solid var(--line);border-radius:6px;padding:4px 6px}
.lib-via small{flex-basis:100%;font-size:13px;line-height:1.35}

/* 4 · The agent: who does it, what you ask, what comes back; then every outcome and every agent */
.st-agent .st-body{align-items:stretch}
.panel{flex:1;min-width:0;display:flex;flex-direction:column;gap:12px;background:#fff;border:1px solid var(--line);border-radius:22px;padding:16px;box-shadow:0 14px 40px rgba(27,43,44,.06)}
.tile{display:grid;place-items:center;aspect-ratio:1;padding:0;border-radius:26%;background:#fff;border:1px solid var(--line)}
.tile.dark{background:#111;border-color:#111}
.tile .lm-vendor{background:none;padding:0;border-radius:0}
.tile img{width:62%;height:62%}
.pa-head{display:flex;align-items:center;gap:10px}
.pa-head .tile{flex:none;width:42px;background:var(--card)}
.pa-head .tile.dark{background:#111}
.pa-head>div{flex:1;min-width:0;display:flex;flex-direction:column;line-height:1.35}
.pa-head b{font-size:16px;font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.pa-status{display:flex;align-items:center;gap:7px;font-size:14px;color:var(--sage);white-space:nowrap}
.pa-status::before{content:"";flex:none;width:6px;height:6px;border-radius:50%;background:currentColor}
.journey[data-stage=reading] .pa-status::before,.journey[data-stage=working] .pa-status::before{animation:pulse .6s ease-in-out infinite alternate}
@keyframes pulse{to{transform:scale(1.7);opacity:.5}}
.journey:not(.s-asked) .pa-status{color:var(--mute)}
.pa-head a{flex:none;font-size:14px;line-height:1.3;color:var(--ink2);text-decoration:none;border:1px solid var(--line);border-radius:999px;padding:6px 12px}
.pa-head a:hover{border-color:var(--ink);color:var(--ink)}
.pa-ask{display:flex;align-items:flex-end;justify-content:flex-end;gap:8px}
.pa-ask p{transition:background .35s,color .35s,box-shadow .35s}
.pa-ask .copy{transition:opacity .35s}
.journey:not(.s-asked) .pa-ask p{background:transparent;color:transparent;box-shadow:inset 0 0 0 1px var(--line)}
.journey:not(.s-asked) .pa-ask .copy{opacity:0;pointer-events:none}
.pa-ask p{min-width:0;background:var(--ink);color:var(--paper);border-radius:16px 16px 4px 16px;padding:9px 13px 10px;font-size:14px;line-height:1.5}
.pa-tag{display:block;font-size:12px;opacity:.62}
.pa-ask [data-prompt-text]{display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:3;overflow:hidden}
.pa-ask .copy{flex:none;border:1px solid var(--line);background:transparent;color:var(--ink);border-radius:999px;font:14px/1.3 var(--sans);padding:6px 12px;min-height:32px;cursor:pointer}
.pa-ask .copy:hover{border-color:var(--ink)}
.pa-ask .copy.done{background:var(--ink);border-color:var(--ink);color:var(--paper)}
.pa-trace{display:flex;align-items:center;gap:6px;font-size:14px;line-height:1.35;color:var(--ink2);white-space:nowrap;transition:opacity .35s}
.pa-trace svg{flex:none;width:18px;height:18px;color:var(--sage)}
.pa-trace span:first-of-type{flex:none;color:var(--sage)}
.pa-trace [data-reads]{min-width:0;overflow:hidden;text-overflow:ellipsis}
.journey:not(.s-asked) .pa-trace{opacity:0}
.pa-result{position:relative;flex:1;display:flex;flex-direction:column;min-height:148px;background:var(--card);border-radius:16px;padding:13px 16px 14px}
.pa-result-top{display:flex;align-items:baseline;justify-content:space-between;gap:10px}
.home .pa-result h2{flex:1;min-width:0;font-size:17px;font-weight:500;line-height:1.35;letter-spacing:0;margin:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.pa-result-top span{flex:none;font-size:12px;color:var(--mute)}
.pa-result-body{flex:1;display:flex;flex-direction:column;justify-content:center;gap:10px;padding-top:10px;transition:opacity .4s,transform .4s}
.journey:not(.s-done) .pa-result-body{opacity:0;transform:translateY(8px)}
.pa-skel{position:absolute;left:16px;right:16px;top:54px;display:grid;gap:11px;opacity:0;pointer-events:none;transition:opacity .25s}
.pa-skel i{height:12px;border-radius:6px;background:linear-gradient(90deg,#e9e5dd 25%,#f4f1eb 50%,#e9e5dd 75%);background-size:200% 100%}
.pa-skel i:nth-child(2){width:72%}
.pa-skel i:nth-child(3){width:46%}
.journey:not(.s-done) .pa-skel{opacity:1}
.journey[data-stage=working] .pa-skel i{animation:shimmer 1s linear infinite}
@keyframes shimmer{to{background-position:-200% 0}}
.file-chip i.k-w{background:#e6edf8;border-color:#cfdcf0;color:#2b579a}
.file-chip i.k-x{background:#e4f1e8;border-color:#cde3d4;color:#1e7145}
.pa-result .result-files{gap:8px}
.pa-result .file-chip{gap:8px;font-size:13.5px;background:#fff;border:1px solid var(--line);border-radius:10px;padding:5px 11px 5px 5px}
.pa-result .file-chip i{width:24px;height:28px;font-size:12px;border-radius:5px}
.pa-result .result-row{gap:10px;align-items:center}
.pa-result .result-row b{font-size:15px;line-height:1.4}
.pa-result .result-row div>span,.pa-result .result-note{font-size:14px;line-height:1.45;margin-top:1px}
.pa-result .result-check{width:26px;height:26px}
.pa-result .pr-preview{gap:6px}
.pa-result .pr-preview b{font-size:16px}
.pa-cases{display:grid;grid-template-columns:repeat(4,1fr);gap:6px}
.pa-cases button{appearance:none;height:30px;padding:0 4px;border:1px solid var(--line);border-radius:999px;background:transparent;color:var(--ink2);font:14px/1 var(--sans);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;cursor:pointer;transition:background .2s,color .2s,border-color .2s}
.pa-cases button:hover{border-color:var(--ink2)}
.pa-cases button[aria-pressed=true]{background:var(--ink);border-color:var(--ink);color:var(--paper)}
.pa-wall p{font-size:14px;line-height:1.4;color:var(--ink2);margin-bottom:6px}
.wall{display:grid;grid-template-columns:repeat(11,1fr);gap:5px}
.wall .tile{width:100%;cursor:pointer;transition:transform .15s,border-color .2s,box-shadow .2s}
.wall .tile:hover{transform:translateY(-2px);border-color:var(--ink2)}
.wall .tile[aria-pressed=true]{border-color:var(--ink);box-shadow:0 0 0 1.5px var(--ink)}

/* Short screens (laptops): a lower header and tighter chrome leave the height to the devices. */
@media (max-height:880px) and (min-width:1200px){
.home .top .wrap{height:56px}.home main{padding-top:56px}
.journey{--reserve:268px;--ph:min(clamp(400px,calc(100vh - var(--reserve)),600px),38vw);padding-top:8px;padding-bottom:16px}
.j-head{margin-bottom:12px}.j-head h1{font-size:clamp(28px,2.9vw,40px)}.j-sub{margin-top:4px;font-size:15px}
.stage{row-gap:10px}
.day-track{height:32px;margin-top:4px}
.st-hint{display:none}
.lib{gap:7px;padding:10px 11px}.lib-rows li{padding:4px 9px}
.panel{gap:8px;padding:12px 14px}
.pa-tag,.pa-wall p{display:none}
.pa-ask [data-prompt-text]{-webkit-line-clamp:2}
.pa-result{min-height:120px;padding:10px 14px 12px}
.pa-result-body{gap:8px;padding-top:8px}
.pa-skel{top:46px;left:14px;right:14px}
.pa-result .file-chip{padding:3px 10px 3px 4px}
.pa-cases button{height:28px}
.pa-wall p{margin-bottom:4px}
}
@media (max-height:700px) and (min-width:1200px){
.journey{--reserve:212px;padding-bottom:8px}
.stage{row-gap:8px}
.j-sub,.day-axis{display:none}
.panel{gap:6px;padding:10px 14px}
.j-cta{flex-direction:row-reverse;align-items:center;gap:14px;padding:0}
}
/* Narrow: the day and what is said on top, Watch · iCloud · iPhone in a row, the library under them, then the agent. */
@media (max-width:1199px){
.journey{--ph:400px;--ww:164px;max-width:680px}
.j-head{flex-direction:column;align-items:flex-start;gap:12px}
.j-cta{flex-direction:row;flex-wrap:wrap;align-items:center;gap:6px 12px;padding:0}
.stage{grid-template-columns:1fr 112px auto;grid-template-areas:"day day day" "say say say" "watch cloud phone" "sim sim phone" "lib lib lib" "agent agent agent";grid-template-rows:auto auto 1fr auto;column-gap:8px;row-gap:14px}
.day{grid-area:day}
.day-wave .w220{display:none}.day-wave .w110{display:block}
.st-hint{display:none}
.st-watch,.st-watch .st-body,.wdev{display:contents}
.bubble{grid-area:say;margin:0;position:relative;z-index:1}
.bubble::after{left:22%}
.wdev>[data-anchor]{grid-area:watch;align-self:center;justify-self:center;position:relative;z-index:1}
.simulate{grid-area:sim;justify-self:center;margin-top:0;position:relative;z-index:1}
.st-cloud{grid-area:cloud;padding:0}
.st-phone{grid-area:phone}
.st-lib{grid-area:lib;padding:0}
.st-agent{grid-area:agent}
.lib{max-width:none;flex-direction:row;flex-wrap:wrap;align-items:center;gap:8px 14px;padding:10px 12px}
.lib-rows{flex:1 1 320px;flex-direction:row;flex-wrap:wrap;gap:5px}
.lib-rows li{padding:4px 10px;border-radius:999px;white-space:nowrap}
.lib-via small{flex-basis:auto}
.pa-trace{white-space:normal;align-items:flex-start}
.pa-result{min-height:0}
.wall{grid-template-columns:repeat(11,minmax(0,44px));justify-content:space-between}
.pa-long{display:none}
.home .pa-result h2{white-space:normal}
.pa-ask [data-prompt-text]{-webkit-line-clamp:4}
}
@media (min-width:1200px){.pa-short{display:none}}
@media (max-width:760px){
.home .top .wrap{height:52px}.home main{padding-top:52px}
.journey{--ph:270px;--ww:112px;padding:6px 14px 18px}
.j-head{gap:8px;margin-bottom:10px}
.j-head h1{font-size:25px;line-height:1.25}
.j-sub{display:none}
.j-cta .pill{padding:5px 12px;font-size:14px}
.stage{grid-template-columns:1fr 84px auto;column-gap:6px;row-gap:12px}
.bubble{border-radius:14px;padding:7px 12px 8px}
.bubble-top{display:none}
.bubble p{margin:0;font-size:15px;line-height:1.4;min-height:2.8em}
:lang(en) .bubble p{min-height:2.8em}
.simulate{min-height:40px;padding:8px 14px 8px 10px;font-size:14px;white-space:nowrap}
.brand .wordmark{height:30px}
.cloud-disc{width:46px;height:46px}
.day-top{font-size:13px;white-space:normal}.day-top p{gap:2px 8px;flex-wrap:wrap}.day-top p>b{font-size:15px}
.day-lib{display:none!important}
.day-track{height:28px}
.day-axis span:nth-child(even){display:none}
.lib-rows li{font-size:13px;padding:3px 9px}
.lib-rows li::before{display:none}
.cloud-text{width:84px;padding-top:5px}
.cloud-text b{font-size:14px;line-height:1.3;white-space:nowrap}
.cloud-text small{display:none}
.pui{font-size:6cqw}
.pui-entry:last-of-type{display:none}
.panel{gap:8px;padding:12px;border-radius:18px}
.pa-head .tile{width:36px}
.pa-head b{font-size:15px}
.pa-head a{padding:4px 10px}
.pa-tag{display:none}
.pa-ask p{padding:7px 11px 8px;line-height:1.4}
.pa-result{padding:10px 12px}
.pa-result-body{min-height:84px;padding-top:8px;gap:6px}
.pa-skel{left:12px;right:12px;top:44px;gap:9px}
.pa-cases{display:flex;gap:6px;overflow-x:auto;scrollbar-width:none;margin:0 -12px;padding:0 12px}
.pa-cases::-webkit-scrollbar{display:none}
.pa-cases button{flex:none;padding:0 12px}
.pa-wall p{display:none}
.wall{gap:4px}
}
@media (prefers-reduced-motion:reduce){.journey *,.journey *::before,.journey *::after{animation:none!important;transition:none!important}}
`;
