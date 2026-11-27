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
/* Live watch: real recording screen with the animated mark; the crown press goes to the face. */
.live .wapp,.live .wface{position:absolute;inset:0}
.live .wapp{transition:transform .5s cubic-bezier(.3,.75,.25,1),opacity .35s ease;transform-origin:50% 42%}
.live .wapp .scr{position:static}
.wmark2{position:absolute;left:49.88%;top:42.24%;width:34.6%;height:auto;aspect-ratio:1;transform:translate(-50%,-50%);color:#fff}
.wface{background:#000;color:#fff;font-family:-apple-system,"SF Pro Rounded","Inter",sans-serif;opacity:0;transform:scale(1.06);transition:opacity .45s ease .12s,transform .55s cubic-bezier(.3,.75,.25,1) .08s}
.wmic{position:absolute;top:4.5%;left:50%;transform:translateX(-50%);width:7.5cqw;height:7.5cqw;border-radius:50%;background:#FF9F0A;color:#000;display:grid;place-items:center}
.wmic svg{width:72%;height:72%}
.fdate{position:absolute;top:15%;left:11%;font-size:7.4cqw;font-weight:600;color:#FF9F0A;letter-spacing:.02em}
.ftime{position:absolute;top:22%;left:9%;font-size:27cqw;font-weight:200;line-height:1;letter-spacing:-.02em}
.fcomp{position:absolute;bottom:13%;left:50%;width:30cqw;height:30cqw;transform:translateX(-50%);border-radius:50%;background:#1C1C1E;display:grid;place-items:center;color:#fff}
.fcomp svg{width:74%;height:74%}
.fcap{position:absolute;bottom:5%;left:0;right:0;text-align:center;font-size:6cqw;color:#9A9A9F}
.live[data-state=face] .wapp{transform:scale(.18);opacity:0}
.live[data-state=face] .wface{opacity:1;transform:none}

/* Interactive crown: its own image, pressed in on click. */
.crown{position:absolute;z-index:2;left:93.93%;top:31.82%;width:6.07%;height:11.82%;padding:0;border:0;background:none;cursor:pointer;transition:transform .12s ease,filter .2s}
.crown picture,.crown img{display:block;width:100%;height:100%}
.crown:hover{filter:brightness(1.18)}
.crown::after{content:"";position:absolute;left:50%;top:50%;width:26px;height:26px;margin:-13px 0 0 -13px;border-radius:50%;border:1.5px solid var(--ink);opacity:0;pointer-events:none}
.live:not([data-state=face]) .crown::after{animation:beckon 1.8s ease-out infinite}
@keyframes beckon{0%{opacity:.7;transform:scale(.5)}100%{opacity:0;transform:scale(1.5)}}
.live.press .crown{transform:translateX(-26%);filter:brightness(.85)}
.hint{position:absolute;z-index:2;left:104%;top:37.6%;transform:translateY(-50%);white-space:nowrap;font-size:12px;line-height:1;color:var(--ink);background:var(--paper);border:1px solid var(--ink);border-radius:999px;padding:5px 10px;transition:opacity .3s}
.hint::before{content:"";position:absolute;left:-5px;top:50%;width:8px;height:8px;margin-top:-4px;background:var(--paper);border-left:1px solid var(--ink);border-bottom:1px solid var(--ink);transform:rotate(45deg)}
.live[data-state=face] .hint{opacity:0}
[data-watch] .scrwrap{cursor:pointer}

/* The data path: one animated scene inside "your Apple Account". */
.chain{padding:clamp(56px,7vw,100px) 0;border-top:1px solid var(--line)}
.chain h2{font-size:clamp(26px,2.6vw,36px);line-height:1.25}
.chain .lead{margin:12px 0 clamp(30px,4vw,48px);color:var(--ink2);font-size:16px}
.stage{position:relative;display:grid;grid-template-columns:1.15fr 1fr 1fr 1.15fr;align-items:center;gap:16px;padding:58px clamp(16px,2.4vw,32px) 44px;border:1.5px dashed #C9C3B8;border-radius:30px}
.acct-tag,.nosrv{position:absolute;top:-14px;display:flex;align-items:center;gap:7px;background:var(--paper);padding:3px 12px;font-size:13.5px;line-height:1.4}
.acct-tag{left:clamp(18px,2.4vw,32px);color:var(--ink)}
.acct-tag svg{width:13px;height:13px}
.nosrv{right:clamp(18px,2.4vw,32px);color:var(--mute)}
.nosrv svg{width:20px;height:20px;color:var(--mute)}
.node{position:relative;z-index:1;display:flex;flex-direction:column;align-items:center;gap:14px;opacity:.4;transition:opacity .5s ease}
.node.on,.n-watch{opacity:1}
.nl{font-size:13px;color:var(--mute);letter-spacing:.01em;transition:color .4s}
.node.on .nl{color:var(--ink)}
.n-watch .watch{--ww:168px}
.rings{position:absolute;left:50%;top:calc(50% - 14px);width:0;height:0;pointer-events:none}
.rings i{position:absolute;left:-90px;top:-90px;width:180px;height:180px;border-radius:50%;border:1.5px solid var(--ink);opacity:0;animation:ring 2.7s ease-out infinite}
.rings i:nth-child(2){animation-delay:.9s}.rings i:nth-child(3){animation-delay:1.8s}
@keyframes ring{0%{opacity:.32;transform:scale(.75)}100%{opacity:0;transform:scale(1.35)}}
.cloudbox{width:132px;color:var(--ink)}
.cloudbox svg{display:block;width:100%}
.n-cloud.pulse .cloudbox{animation:pulse .8s ease}
@keyframes pulse{0%{transform:scale(1)}35%{transform:scale(1.1)}100%{transform:scale(1)}}
.phone2{position:relative;width:180px;height:336px;border-radius:36px;background:#fff;border:1.5px solid var(--ink);padding:12px 14px;overflow:hidden;box-shadow:0 10px 30px rgba(27,43,44,.08)}
.island{display:block;width:56px;height:16px;border-radius:9px;background:#1D1D1F;margin:0 auto 14px}
.phone2 b{display:block;font-size:21px;font-weight:700;letter-spacing:-.01em}
.pwave{position:absolute;left:14px;right:14px;top:96px;height:64px;display:flex;align-items:center;gap:2.5px;opacity:0;transition:opacity .4s,transform .55s cubic-bezier(.5,0,.3,1)}
.pwave i{flex:1;height:calc(var(--h) * 100%);border-radius:2px;background:var(--ink)}
.s-wave .pwave{opacity:1}
.s-wave .pwave i{animation:bar .55s ease-in-out infinite alternate;animation-delay:calc(var(--i) * -41ms)}
@keyframes bar{from{transform:scaleY(.3)}to{transform:scaleY(1)}}
.s-text .pwave{opacity:0;transform:scaleY(.04);transition:opacity .35s .35s,transform .5s cubic-bezier(.5,0,.3,1)}
.plines{list-style:none;margin:14px 0 0;padding:0}
.plines li{display:flex;align-items:flex-start;gap:0;margin:0;padding:8px 0;border:0;border-bottom:1px solid #EEE9E1;font-size:12.5px;line-height:1.45;color:var(--ink);clip-path:inset(0 100% 0 0)}
.s-text .plines li{clip-path:inset(0 0 0 0);transition:clip-path .75s steps(16) calc(.45s + var(--i) * .5s)}
.ck{flex:none;width:0;height:14px;margin-top:1px;border-radius:50%;border:0 solid var(--ink);opacity:0;transition:width .35s,opacity .35s,margin .35s}
.s-todo .todo .ck{width:14px;border-width:1.4px;margin-right:8px;opacity:1;transition-delay:calc(var(--i) * .3s)}
.s-todo .note span{color:var(--mute)}
.s-todo .todo span{font-weight:500}
.pai svg{width:10px;height:10px;vertical-align:-1px;margin-right:4px}
.pai{position:absolute;left:12px;right:12px;bottom:14px;text-align:center;font-size:10.5px;color:var(--mute);border-top:1px dashed var(--line);padding-top:9px;opacity:0;transition:opacity .4s}
.s-todo .pai{opacity:1}
.mac{width:100%;max-width:246px;border-radius:12px;overflow:hidden;background:#1E2523;color:#E9E5DD;box-shadow:0 10px 30px rgba(27,43,44,.16)}
.mac .bar{display:flex;align-items:center;gap:5px;padding:8px 10px;background:#2B3331;font-size:11px;color:#9AA39F}
.mac .bar i{width:8px;height:8px;border-radius:50%;background:#56605C}
.mac .bar span{margin-left:6px}
.term{position:relative;min-height:132px;padding:12px 12px 14px;font:11.5px/1.65 var(--mono)}
.term p{opacity:0;transform:translateY(4px)}
.term p+p{color:#A6DDB0}
.s-agent .term p{opacity:1;transform:none;transition:opacity .35s calc(var(--i) * .85s),transform .35s calc(var(--i) * .85s)}
.cursor{display:inline-block;width:7px;height:13px;background:#E9E5DD;vertical-align:-2px;animation:blink 1s steps(1) infinite}
@keyframes blink{50%{opacity:0}}
.tok{position:absolute;z-index:3;left:0;top:0;width:46px;height:30px;margin:-15px 0 0 -23px;opacity:0;pointer-events:none}
.tok .g{position:absolute;inset:0;display:grid;place-items:center;transition:opacity .25s}
.tok .ga{border-radius:15px;background:var(--ink);color:#F1EEE9;box-shadow:0 6px 18px rgba(27,43,44,.28)}
.tok .ga svg{width:30px}
.tok .gd{opacity:0;border-radius:8px;background:var(--ink);color:#F1EEE9;font:700 11px/1 var(--mono);letter-spacing:.04em;box-shadow:0 6px 18px rgba(27,43,44,.28)}
.tok.doc .ga{opacity:0}.tok.doc .gd{opacity:1}
.now{display:flex;justify-content:center;align-items:center;gap:14px;min-height:40px;margin-top:20px;font-size:15px;color:var(--mute)}
.now [data-cap]{color:var(--ink);font-weight:500}
.replay{border:1px solid var(--line);background:transparent;border-radius:999px;padding:4px 12px;font:inherit;font-size:12.5px;color:var(--ink2);cursor:pointer}
.no-js .now{display:none}
@media (max-width:900px){
.stage{grid-template-columns:1fr;gap:40px;padding:54px 16px 36px}
.nosrv span{display:none}
.now{flex-direction:column;gap:8px;text-align:center}
}
@media (prefers-reduced-motion:reduce){
.node{opacity:1}.plines li{clip-path:none}.pwave{display:none}.todo .ck{width:14px;border-width:1.4px;margin-right:8px;opacity:1}.pai,.term p{opacity:1;transform:none}
.rings,.tok,.now,.crown::after{display:none}
.live .wapp,.wface{transition:none}
}

/* Changelog */
.releases{margin-top:8px}
.rel{padding:26px 0 22px;border-top:1px solid var(--line)}
.rel header{display:flex;align-items:baseline;gap:12px;margin-bottom:10px}
.rel .tag{font-size:12.5px;border:1px solid var(--ink);border-radius:999px;padding:2px 10px;color:var(--ink)}
.rel.next .tag{border-style:dashed;border-color:var(--faint);color:var(--ink2)}
.rel time{font-size:14px;color:var(--mute)}
.rel ul{margin:0;padding-left:1.15em}
.rel li{margin:5px 0}
`;
