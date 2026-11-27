/** Page content, zh-Hans and en. Bodies are trusted HTML; {{BASE}} is replaced with the site origin at render time. */
export type Lang = "zh" | "en";
export type PageId = "home" | "privacy" | "terms" | "support" | "agents";

export interface PageText {
  title: string;
  description: string;
  body: string;
}

/** A picture with a WebP source and a PNG fallback. */
function pic(src: string, alt: string, cls: string, lazy = true) {
  return `<picture class="${cls}"><source type="image/webp" srcset="${src}.webp"><img src="${src}.png" alt="${alt}" decoding="async"${lazy ? ' loading="lazy"' : ""}></picture>`;
}

/**
 * Apple product bezels (Apple Design Resources) shown "as is", with the app's screen in the transparent screen area.
 * Screen areas measured on the original PNGs: iPhone 17 Pro 1350×2760, screen 1206×2622 at (72, 69);
 * Apple Watch Series 11 46 mm 560×880, screen 416×496 at (72, 192).
 */
function iphone(screen: string, alt: string, lazy = true) {
  return `<figure class="dev iphone">${pic(`/screens/${screen}`, alt, "scr", lazy)}${pic("/bezels/iphone-17-pro-silver", "", "bez", lazy)}</figure>`;
}
function watch(screen: string, alt: string, opts: { mark?: string; lazy?: boolean } = {}) {
  const mark = opts.mark ? `<svg class="wmark" data-mark ${opts.mark} data-weight="1.15" viewBox="0 0 120 120" aria-hidden="true"></svg>` : "";
  return `<figure class="dev watch"><div class="scrwrap">${pic(`/screens/${screen}`, alt, "scr", opts.lazy ?? true)}${mark}</div>${pic("/bezels/watch-s11-46-natural", "", "bez", opts.lazy ?? true)}</figure>`;
}

interface Feature { title: string; text: string; visual: string }
interface HomeCopy {
  title: string; description: string;
  h1: string; sub: string; soon: string; reqLine: string;
  heroPhoneAlt: string; heroWatchAlt: string;
  featH: string; features: Feature[];
  reqH: string; req: [string, string][];
  faqH: string; faq: [string, string][];
}

/** A day on the wrist: speech segments (start, end in hours) between 07:00 and 21:00. */
const SPEECH: [number, number][] = [[7.6, 7.8], [8.9, 9.05], [9.2, 9.55], [10.1, 10.2], [11.6, 11.75], [12.9, 13.3], [14.0, 14.1], [15.45, 15.8], [16.4, 16.5], [17.75, 17.85], [18.3, 18.55], [19.5, 19.9], [20.4, 20.5]];
function dayTimeline(zh: boolean) {
  const x = (h: number) => (((h - 7) / 14) * 100).toFixed(2);
  const segs = SPEECH.map(([a, b]) => `<rect x="${x(a)}%" y="10" width="${(((b - a) / 14) * 100).toFixed(2)}%" height="28" rx="2"/>`).join("");
  const ticks = [7, 12, 17, 21].map((h) => `<span style="left:${x(h)}%">${h}:00</span>`).join("");
  return `<div class="viz viz-day">
<div class="kv"><div><b>${zh ? "14 小时" : "14 h"}</b><small>${zh ? "戴在手上" : "on the wrist"}</small></div><div><b class="ink">${zh ? "2 小时 10 分" : "2 h 10 min"}</b><small>${zh ? "录下的人声" : "of speech kept"}</small></div></div>
<svg class="track" viewBox="0 0 100 48" preserveAspectRatio="none" aria-hidden="true"><rect x="0" y="22" width="100%" height="4" rx="2" class="quiet"/><g class="speech">${segs}</g></svg>
<div class="ticks" aria-hidden="true">${ticks}</div>
<p class="legend"><span><i class="sw ink"></i>${zh ? "有人说话：编码、转写、存好" : "Speech: encoded, transcribed, saved"}</span><span><i class="sw quiet"></i>${zh ? "安静：不编码、不存、不上传" : "Silence: not encoded, stored or uploaded"}</span></p>
</div>`;
}

function callStrip(zh: boolean) {
  const phone = '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M6.6 3.5l2.6 3.4-1.6 2.3a12 12 0 0 0 7.2 7.2l2.3-1.6 3.4 2.6-1.4 3a3 3 0 0 1-3 1.6C9.6 21.2 2.8 14.4 2 7.9a3 3 0 0 1 1.6-3z" fill="currentColor"/></svg>';
  const steps = zh
    ? [["15:28", "录音", "speak"], ["15:30", "来电 · 暂停", "call"], ["15:36", "挂断", "end"], ["15:36", "自动续录", "speak"]]
    : [["15:28", "Recording", "speak"], ["15:30", "Call · paused", "call"], ["15:36", "Hung up", "end"], ["15:36", "Resumes by itself", "speak"]];
  const cell = ([t, label, kind]: string[]) => {
    const glyph = kind === "speak"
      ? `<svg class="m" data-mark data-state="speak" viewBox="0 0 120 120" aria-hidden="true"></svg>`
      : `<span class="ph${kind === "end" ? " end" : ""}">${phone}</span>`;
    return `<li class="${kind}">${glyph}<b>${label}</b><small>${t}</small></li>`;
  };
  return `<div class="viz viz-call"><ol>${steps.map(cell).join("")}</ol>
<svg class="wave" viewBox="0 0 100 20" preserveAspectRatio="none" aria-hidden="true"><path d="M0 10 Q2 2 4 10 T8 10 T12 10 T16 10 T20 10 T24 10" class="w"/><rect x="26" y="9" width="40" height="2" class="gap"/><path d="M68 10 Q70 2 72 10 T76 10 T80 10 T84 10 T88 10 T92 10 T96 10 T100 10" class="w"/></svg>
<p class="legend">${zh ? "通话时 watchOS 占用麦克风；挂断后不用你动手" : "watchOS holds the microphone during the call; afterwards you don't lift a finger"}</p></div>`;
}

function flow(zh: boolean) {
  return `<div class="viz viz-flow">
<div class="node">Apple Watch<small>${zh ? "只录有人说话的片段" : "speech-only chunks"}</small></div>
<div class="arrow" aria-hidden="true"></div>
<div class="node pass">iPhone<small>${zh ? "在手机上转写，不经过我们" : "transcribes on the phone, never through us"}</small></div>
<div class="arrow" aria-hidden="true"></div>
<div class="node home">${zh ? "你的 iCloud" : "Your iCloud"}<small>${zh ? "录音 · 文字 · 要点 · 待办" : "audio · text · highlights · to-dos"}</small></div>
<div class="fan"><span>${zh ? "你的设备" : "Your devices"}</span><span>Mac · ${zh ? "你的 AI 助手" : "your AI assistant"}</span></div>
</div>`;
}

function todosCard(zh: boolean) {
  const items = zh
    ? [["把修改后的合同发给张经理", "周五", "15:31"], ["和设计组确认新手引导文案", "下周一", "09:16"], ["订周六晚七点妈妈生日的餐厅", "周六", "13:05"]]
    : [["Send the revised contract to Mr. Zhang", "Fri", "15:31"], ["Confirm onboarding copy with design", "Mon", "09:16"], ["Book a table for Mom's birthday, Sat 7 pm", "Sat", "13:05"]];
  return `<div class="viz viz-todos"><div class="ui">
<div class="ui-h">${zh ? "总结" : "Summary"}</div>
<p class="ui-sum">${zh ? "合同付款条款改为 30 天，周五前发给张经理；周一 15:00 陈医生复诊。" : "Contract terms now 30 days, to Mr. Zhang by Friday; Dr. Chen on Monday at 3 pm."}</p>
<div class="ui-h">${zh ? "待办" : "To-dos"}</div>
${items.map(([t, d]) => `<div class="ui-todo"><i></i><div><span>${t}</span><small>${d}</small></div></div>`).join("")}
</div></div>`;
}

function agentViz(zh: boolean) {
  return `<div class="viz viz-agent">
<div class="win"><div class="bar"><i></i><i></i><i></i><span>${zh ? "iCloud 云盘" : "iCloud Drive"} › Phemo › 2026 › 11</span></div>
<div class="files"><ul><li>2026-11-24.md</li><li>2026-11-25.md</li><li class="on">2026-11-26.md</li><li>todos.md</li></ul>
<pre>## ${zh ? "To-dos" : "To-dos"}
- [ ] ${zh ? "把合同发给张经理 (due 11-27)" : "Contract to Mr. Zhang (due 11-27)"}
- [ ] ${zh ? "确认新手引导文案 (due 11-30)" : "Onboarding copy (due 11-30)"}</pre></div></div>
<div class="chat"><p class="q">${zh ? "今天我答应了谁什么？" : "What did I promise today, and to whom?"}</p>
<p class="a">${zh ? "两件：明天之前把合同发给<b>张经理</b>；下周一前和<b>设计组</b>确认新手引导文案。<small>来自 2026-11-26.md</small>" : "Two things: the contract to <b>Mr. Zhang</b> by tomorrow, and the onboarding copy with <b>design</b> by Monday.<small>From 2026-11-26.md</small>"}</p></div>
</div>`;
}

const HOME: Record<Lang, HomeCopy> = {
  zh: {
    title: "Phemo · Apple Watch 上的全天录音，只留你说过的话",
    description: "戴上就录，表盘照常；只录人声，自动整理成文字、要点和待办，全部存在你自己的 iCloud。",
    h1: '<span class="nb">Apple Watch</span> 上的全天录音，<br>只留你说过的话。',
    sub: "戴上就录，表盘照常。文字、要点和待办自动整理好，全部存在你自己的 iCloud。",
    soon: "即将上架 App Store",
    reqLine: "watchOS 26 · iOS 27",
    heroPhoneAlt: "iPhone 上的 Phemo：今天的总结、要点和带时间的转写",
    heroWatchAlt: "Apple Watch 上的 Phemo：正在录制说话，已录 2 小时 13 分",
    featH: "它能做什么",
    features: [
      { title: "一键开始，表盘照常", text: "表盘上点一下 Phemo 就开始录，放下手腕仍是你的表盘。", visual: watch("watch-face-zh", "表盘上的 Phemo 复杂功能，顶部是麦克风使用标志") },
      { title: "只录人声，撑一整天", text: "手表自己判断有没有人说话，安静时什么都不做。", visual: dayTimeline(true) },
      { title: "来电后自动续录", text: "通话、Siri 结束后自己接着录，接不上会轻震提醒。", visual: callStrip(true) },
      { title: "只存在你自己的 iCloud", text: "在 iPhone 上转写，不经过任何 Phemo 服务器。", visual: flow(true) },
      { title: "每天的要点和待办", text: "用 iPhone 上的 Apple 智能，或你自己选的 AI 服务整理，待办带着截止时间。", visual: todosCard(true) },
      { title: "你的 AI 助手也能读", text: "每天一份 Markdown，放在 iCloud 云盘，助手在你授权时读取。", visual: agentViz(true) },
    ],
    reqH: "需要什么",
    req: [["手表", "Apple Watch，watchOS 26 或更新"], ["手机", "iPhone，iOS 27 或更新"], ["iCloud", "登录 Apple 账户并打开 iCloud 云盘"], ["要点和待办", "支持 Apple 智能的 iPhone，或你自己的 AI 服务 Key（OpenAI、Anthropic、通义千问、豆包等）"]],
    faqH: "常见问题",
    faq: [
      ["会很耗电吗？", "安静时手表只在判断有没有人说话，不编码也不上传；有人说话时才处理。实际续航取决于机型、电池状况和说话多少，建议先戴一个工作日试试。"],
      ["会录到别人吗？", "会。Phemo 录的是你身边的人声，录音时手表顶部会一直显示麦克风标志。请遵守当地法律，需要时告知对方并取得同意。"],
      ["你们能看到我的录音吗？", "看不到。Phemo 没有处理你数据的服务器：录音在你的 iPhone 上转成文字，全部内容只存在你的 iCloud。生成要点和待办时，要么用 iPhone 上的 Apple 智能，要么由 iPhone 直接发给你自己选的 AI 服务。"],
      ["iPhone 不在身边也能用吗？", "能。录音先存在手表上，能联网时存进 iCloud；回到 iPhone 身边后，iPhone 再把它转成文字。"],
      ["怎样让 AI 助手读取？", `在 Mac 上把助手指向 iCloud 云盘里的 Phemo 文件夹即可，步骤见<a href="/agents">连接 AI 助手</a>。`],
    ],
  },
  en: {
    title: "Phemo · All-day recording on Apple Watch that keeps only what was said",
    description: "Wear it and it records, with your watch face as usual. Speech only, turned into text, highlights and to-dos — all stored in your own iCloud.",
    h1: 'All-day recording on <span class="nb">Apple Watch</span> <br>that keeps only what was said.',
    sub: "Tap once and keep your watch face. Text, highlights and to-dos sort themselves out — all stored in your own iCloud.",
    soon: "Coming to the App Store",
    reqLine: "watchOS 26 · iOS 27",
    heroPhoneAlt: "Phemo on iPhone: today's summary, highlights and timed transcript",
    heroWatchAlt: "Phemo on Apple Watch: recording speech, 2 h 13 min so far",
    featH: "What it does",
    features: [
      { title: "One tap, your watch face stays", text: "Tap Phemo on your watch face to start; lower your wrist and it's still your face.", visual: watch("watch-face-en", "The Phemo complication on a watch face, with the microphone indicator at the top") },
      { title: "Speech only, all day", text: "The watch decides whether anyone is talking and does nothing in silence.", visual: dayTimeline(false) },
      { title: "Picks up again after calls", text: "After a call or Siri it resumes on its own, and taps your wrist if it can't.", visual: callStrip(false) },
      { title: "Stored only in your own iCloud", text: "Transcribed on your iPhone, never through a Phemo server.", visual: flow(false) },
      { title: "Highlights and to-dos, daily", text: "Sorted by Apple Intelligence on your iPhone or the AI provider you choose, with due dates on the to-dos.", visual: todosCard(false) },
      { title: "Readable by your AI assistant", text: "One Markdown file a day in iCloud Drive, read by your assistant when you allow it.", visual: agentViz(false) },
    ],
    reqH: "What you need",
    req: [["Watch", "Apple Watch on watchOS 26 or later"], ["Phone", "iPhone on iOS 27 or later"], ["iCloud", "Signed in, with iCloud Drive on"], ["Highlights and to-dos", "An iPhone with Apple Intelligence, or your own AI provider key (OpenAI, Anthropic, Qwen, Doubao and others)"]],
    faqH: "Questions",
    faq: [
      ["Does it drain the battery?", "In silence the watch only checks whether someone is talking — nothing is encoded or uploaded. Real battery life depends on the model, battery health and how much is said; try it for a working day."],
      ["Does it record other people?", "Yes — Phemo records voices around you, and the microphone indicator shows while it does. Follow local law and tell people or get consent where required."],
      ["Can you see my recordings?", "No. Phemo has no server that handles your data: audio is transcribed on your iPhone and everything lives only in your iCloud. Highlights and to-dos come from Apple Intelligence on your iPhone, or your iPhone sends the text straight to the AI provider you chose."],
      ["Does it work without my iPhone nearby?", "Yes. Audio waits on the watch and goes to iCloud when the watch is online; your iPhone transcribes it once it's back in reach."],
      ["How does my AI assistant read it?", `Point your assistant on the Mac at the Phemo folder in iCloud Drive — see <a href="/en/agents">Connect an AI assistant</a>.`],
    ],
  },
};

function home(lang: Lang): PageText {
  const c = HOME[lang];
  const sfx = lang === "zh" ? "zh" : "en";
  return {
    title: c.title,
    description: c.description,
    body: `<section class="hero"><div class="wrap hero-grid">
<div class="hero-txt">
<h1>${c.h1}</h1>
<p class="sub">${c.sub}</p>
<div class="actions"><span class="pill">${c.soon}</span></div>
<p class="req-line">${c.reqLine}</p>
</div>
<div class="duo">${watch(`watch-recording-${sfx}`, c.heroWatchAlt, { mark: 'data-state="idle" data-cycle="idle:2.6,speak:4.2,saved:1.3"', lazy: false })}${iphone(`iphone-today-${sfx}`, c.heroPhoneAlt, false)}</div>
</div></section>

<section class="features" id="features"><div class="wrap">
<h2>${c.featH}</h2>
<div class="fgrid">${c.features.map((f) => `<div class="feat"><div class="vis">${f.visual}</div><h3>${f.title}</h3><p>${f.text}</p></div>`).join("")}</div>
</div></section>

<section class="more"><div class="wrap more-grid">
<div>
<h2>${c.reqH}</h2>
<dl class="req">${c.req.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join("")}</dl>
</div>
<div>
<h2>${c.faqH}</h2>
<div class="faq">${c.faq.map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join("")}</div>
</div>
</div></section>`,
  };
}

const UPDATED = { zh: "生效日期：2026 年 11 月 27 日", en: "Effective 27 November 2026" };

function privacy(lang: Lang): PageText {
  if (lang === "zh") {
    return {
      title: "隐私政策 · Phemo",
      description: "Phemo 的录音和文字只存在你自己的设备和 iCloud。Phemo 没有处理你数据的服务器。",
      body: `<article class="doc"><div class="narrow">
<h1>隐私政策</h1><p class="updated">${UPDATED.zh}</p>
<p>Phemo 由 Benchyard Co., Limited（香港，下称「我们」）提供。Phemo 会录下你身边的人声，这是非常私密的数据，所以我们的设计是：<strong>你的录音、文字、要点和待办只存在你自己的设备和 iCloud 里。Phemo 没有处理你数据的服务器，我们看不到也拿不到这些内容。</strong>下面用平实的语言说明数据怎么流转。</p>

<h2>存在你自己 iCloud 里的数据</h2>
<div class="tablewrap"><table>
<tr><th>数据</th><th>内容</th></tr>
<tr><td>录音片段</td><td>Apple Watch 检测到有人说话时录下的音频（AAC，单声道 16 kHz）。安静的部分不录。可能包含你和身边其他人的声音。</td></tr>
<tr><td>转写文字</td><td>录音转成的文字和每句话的时间</td></tr>
<tr><td>要点和待办</td><td>根据当天文字生成的总结、要点和待办，以及你的修改</td></tr>
<tr><td>Markdown 文件</td><td>iPhone 把每天的内容写进 iCloud 云盘的 Phemo 文件夹，方便你和你设置的 AI 助手读取</td></tr>
</table></div>
<p>这些数据保存在你 Apple 账户的 iCloud 中（CloudKit 私有数据库和 iCloud 云盘），由 Apple 按其 iCloud 条款存储和加密；中国大陆的 iCloud 由云上贵州运营。我们无法访问你的 iCloud。</p>

<h2>在你设备上完成的处理</h2>
<ul>
<li><strong>转写</strong>：录音在你的 iPhone 上用 Apple 的语音识别转成文字，音频不会发给我们或任何语音识别服务。</li>
<li><strong>要点和待办（Apple 智能）</strong>：如果你的 iPhone 支持并打开了 Apple 智能，Phemo 用 iPhone 上的 Apple 模型生成要点和待办，文字不离开设备。</li>
</ul>

<h2>你选择的 AI 服务</h2>
<p>你也可以在设置里填写自己的 AI 服务（例如 OpenAI、Anthropic、阿里云通义千问、火山引擎豆包，或你自己运行的模型）的地址和 API Key。这样设置后，生成要点、待办和每日总结时，<strong>你的 iPhone 会把当天的转写文字（不含音频）直接发给这个服务</strong>，不经过我们。它如何处理数据、是否传到境外，取决于你选的服务，适用它自己的条款和隐私政策。API Key 只保存在你设备的钥匙串里。</p>

<h2>我们收集的数据</h2>
<p>无。Phemo 不需要注册账号，不收集位置、通讯录或健康数据，不使用广告标识符，不接入任何第三方统计或广告 SDK。如果你给我们写信，我们只用你提供的信息回复你。</p>

<h2>其他会接触数据的一方</h2>
<ul>
<li><strong>Apple</strong>：iCloud 存储你的数据；语音识别和 Apple 智能在你的设备上运行。</li>
<li><strong>你选择的 AI 服务</strong>：见上文。</li>
<li><strong>你设置的 AI 助手</strong>：只有你自己在电脑上把助手指向 iCloud 云盘里的 Phemo 文件夹，它才能读取这些文件。它如何处理数据，适用它自己的隐私政策。</li>
</ul>
<p>我们不会出售数据，也不会用你的录音或文字训练 AI 模型。</p>

<h2>你的权利</h2>
<ul>
<li><strong>删除</strong>：在 iPhone 的 Phemo 中打开「设置 → 删除全部数据」，会删除你 iCloud 里的全部 Phemo 数据（录音、文字、要点、待办和云盘文件）。你也可以在 iPhone 的「设置 → Apple 账户 → iCloud → 管理储存空间」里自行删除。</li>
<li><strong>停止</strong>：随时在手表上停止录音；在设置里删除 AI 服务的 Key 即可停止向它发送文字；在电脑上移除 AI 助手的配置即可停止它读取。</li>
<li><strong>访问和导出</strong>：所有内容都在你的 iCloud 里，云盘中的 Markdown 文件可以直接复制带走。</li>
</ul>

<h2>录下他人的声音</h2>
<p>Phemo 会录到你身边其他人说的话。请遵守所在地的法律，在需要时告知对方并取得同意，不要在法律禁止的场合使用。</p>

<h2>儿童</h2>
<p>Phemo 不面向 14 周岁以下的儿童，我们不会有意收集儿童的数据。</p>

<h2>变更</h2>
<p>本政策如有重要变更，我们会在 App 内或本页面提前告知。</p>

<h2>联系我们</h2>
<p>邮箱：<a href="mailto:support@benchyard.cn">support@benchyard.cn</a><br>Benchyard Co., Limited，香港旺角花园街 2-16 号好景商业中心 27 楼 18 室</p>
</div></article>`,
    };
  }
  return {
    title: "Privacy Policy · Phemo",
    description: "Phemo keeps your recordings and transcripts only on your devices and in your own iCloud. Phemo has no server that handles your data.",
    body: `<article class="doc"><div class="narrow">
<h1>Privacy Policy</h1><p class="updated">${UPDATED.en}</p>
<p>Phemo is provided by Benchyard Co., Limited, Hong Kong ("we"). Phemo records voices around you, which is very personal data, so it is designed this way: <strong>your audio, transcripts, highlights and to-dos live only on your devices and in your own iCloud. Phemo has no server that handles your data, so we cannot see or get to any of it.</strong> Here is how data moves, in plain words.</p>

<h2>Data in your own iCloud</h2>
<div class="tablewrap"><table>
<tr><th>Data</th><th>What it is</th></tr>
<tr><td>Audio chunks</td><td>Audio your Apple Watch records while it detects speech (AAC, mono 16 kHz). Silence is not recorded. It may contain your voice and the voices of people near you.</td></tr>
<tr><td>Transcripts</td><td>The text of the audio and the time of each sentence</td></tr>
<tr><td>Highlights and to-dos</td><td>Summaries, highlights and to-dos made from the day's text, and your edits</td></tr>
<tr><td>Markdown files</td><td>Your iPhone writes each day into the Phemo folder in iCloud Drive, so you and AI assistants you set up can read it</td></tr>
</table></div>
<p>This data is stored in your Apple Account's iCloud (CloudKit private database and iCloud Drive) and is stored and encrypted by Apple under its iCloud terms; in mainland China, iCloud is operated by GCBD (Guizhou-Cloud Big Data). We cannot access your iCloud.</p>

<h2>Processing on your devices</h2>
<ul>
<li><strong>Transcription</strong>: audio is turned into text on your iPhone with Apple's speech recognition. It is never sent to us or to any speech recognition service.</li>
<li><strong>Highlights and to-dos (Apple Intelligence)</strong>: if your iPhone supports Apple Intelligence and it is on, Phemo uses Apple's on-device model, and the text stays on the device.</li>
</ul>

<h2>AI providers you choose</h2>
<p>You can also enter your own AI provider (for example OpenAI, Anthropic, Alibaba Cloud Qwen, Volcano Engine Doubao, or a model you run yourself) with its address and API key. Then, for highlights, to-dos and daily summaries, <strong>your iPhone sends the day's transcript text (no audio) straight to that provider</strong>, never through us. What it does with the text, and where it processes it, depends on the provider you chose and is governed by its own terms and privacy policy. API keys stay in your device's keychain.</p>

<h2>Data we collect</h2>
<p>None. Phemo needs no account, collects no location, contacts or health data, uses no advertising identifier and includes no third-party analytics or advertising SDK. If you email us, we use what you send only to reply.</p>

<h2>Others who handle data</h2>
<ul>
<li><strong>Apple</strong>: iCloud stores your data; speech recognition and Apple Intelligence run on your devices.</li>
<li><strong>AI providers you choose</strong>: see above.</li>
<li><strong>AI assistants you set up</strong> can read the files only if you point them at the Phemo folder in iCloud Drive on your computer. Their own privacy policies govern what they do with it.</li>
</ul>
<p>We never sell data and do not train AI models on your recordings or transcripts.</p>

<h2>Your choices</h2>
<ul>
<li><strong>Delete</strong>: in Phemo on your iPhone, open Settings → Delete all data. It deletes all Phemo data from your iCloud (audio, transcripts, highlights, to-dos and iCloud Drive files). You can also remove it yourself in iPhone Settings → Apple Account → iCloud → Manage Storage.</li>
<li><strong>Stop</strong>: stop recording on the watch at any time; remove the AI provider key in Settings to stop sending text to it; remove an assistant's configuration on your computer to stop it reading.</li>
<li><strong>Access and export</strong>: everything is in your iCloud, and the Markdown files in iCloud Drive can simply be copied.</li>
</ul>

<h2>Recording other people</h2>
<p>Phemo records what people near you say. Follow the law where you are, tell people and get their consent where required, and don't use it where recording is prohibited.</p>

<h2>Children</h2>
<p>Phemo is not directed at children under 14 and we do not knowingly collect their data.</p>

<h2>Changes</h2>
<p>We will announce material changes to this policy in the app or on this page in advance.</p>

<h2>Contact</h2>
<p>Email: <a href="mailto:support@benchyard.cn">support@benchyard.cn</a><br>Benchyard Co., Limited, Rm 18, 27/F, Ho King Commercial Centre, 2-16 Fa Yuen Street, Mongkok, Hong Kong</p>
</div></article>`,
  };
}

function terms(lang: Lang): PageText {
  if (lang === "zh") {
    return {
      title: "使用条款 · Phemo",
      description: "使用 Phemo 的条款。",
      body: `<article class="doc"><div class="narrow">
<h1>使用条款</h1><p class="updated">${UPDATED.zh}</p>
<p>欢迎使用 Phemo。Phemo 由 Benchyard Co., Limited（下称「我们」）提供。下载或使用 Phemo，即表示你同意本条款和<a href="/privacy">隐私政策</a>。</p>
<h2>1. 服务内容</h2>
<p>Phemo 在 Apple Watch 上录下人声，在你的 iPhone 上转成文字，用 iPhone 上的 Apple 智能或你自己选择的 AI 服务生成要点和待办，并把全部内容存进你自己的 iCloud；你也可以让自己的 AI 助手读取这些内容。语音识别和 AI 生成的结果可能有错误或遗漏，请勿将其作为唯一依据做出重要决定。</p>
<h2>2. 合法使用</h2>
<p>你对使用 Phemo 录下的内容负责。你承诺遵守所在地关于录音、隐私和个人信息保护的法律，在需要时告知被录音的人并取得同意；不在法律或场所规定禁止录音的地方使用；不将 Phemo 用于偷录、跟踪、骚扰或其他侵害他人权益的行为。</p>
<h2>3. 你的内容</h2>
<p>你录下的音频、文字和由此生成的总结归你所有。内容存放在你自己的设备和 iCloud 中，我们不接触也不处理你的内容。你在设置里填写的 AI 服务由你选择，你的 iPhone 直接把文字发给它，适用它自己的条款。</p>
<h2>4. 设备与账户</h2>
<p>Phemo 不需要注册账号。请妥善保管你的设备和 Apple 账户；你让 AI 助手读取 Phemo 文件、或在设置里填写 AI 服务的 Key，视为你的操作，相关费用由你和该服务商结算。Phemo 目前免费提供。</p>
<h2>5. 系统限制</h2>
<p>Phemo 受 watchOS 的限制：通话、Siri 等会暂时中断录音；系统可能因电量、内存或更新结束 App；录音需要在 App 前台开始。我们会尽力自动恢复，但不能保证录下所有内容。</p>
<h2>6. 服务变更与中止</h2>
<p>我们可能更新、调整或停止部分功能。若停止整个服务，我们会提前通知；你 iCloud 里的内容仍归你所有并可继续访问。如你违反本条款，我们可以暂停或终止你的使用。</p>
<h2>7. 免责与责任限制</h2>
<p>在法律允许的范围内，Phemo 按「现状」提供。对于录音遗漏、识别错误、AI 生成内容不准确，或因此造成的间接损失，我们不承担责任。我们对你的赔偿总额不超过港币 100 元。</p>
<h2>8. 第三方</h2>
<p>你使用的第三方 AI 助手由其提供方负责，适用其自身的条款和隐私政策。Apple 不是本条款的一方，不对 Phemo 负责，但有权作为第三方受益人执行本条款。</p>
<h2>9. 适用法律</h2>
<p>本条款适用香港特别行政区法律。因本条款产生的争议，双方应先友好协商；协商不成的，提交香港有管辖权的法院解决。</p>
<h2>10. 联系</h2>
<p><a href="mailto:support@benchyard.cn">support@benchyard.cn</a></p>
</div></article>`,
    };
  }
  return {
    title: "Terms of Use · Phemo",
    description: "Terms for using Phemo.",
    body: `<article class="doc"><div class="narrow">
<h1>Terms of Use</h1><p class="updated">${UPDATED.en}</p>
<p>Welcome to Phemo, provided by Benchyard Co., Limited ("we"). By downloading or using Phemo you agree to these terms and our <a href="/en/privacy">Privacy Policy</a>.</p>
<h2>1. The service</h2>
<p>Phemo records speech on your Apple Watch, transcribes it on your iPhone, writes highlights and to-dos with Apple Intelligence on your iPhone or an AI provider you choose, and stores everything in your own iCloud; you may also let your own AI assistants read it. Transcripts and AI output can contain mistakes or omissions — don't rely on them alone for important decisions.</p>
<h2>2. Lawful use</h2>
<p>You are responsible for what you record with Phemo. You agree to follow the recording, privacy and data-protection laws that apply to you, to tell people and obtain their consent where required, not to use Phemo where recording is prohibited by law or by the venue, and not to use it for covert recording, stalking, harassment or anything that harms others.</p>
<h2>3. Your content</h2>
<p>The audio you record, its transcripts and the summaries made from them belong to you. They stay on your devices and in your own iCloud; we never receive or process them. An AI provider you enter in Settings is your choice: your iPhone sends text straight to it, under its own terms.</p>
<h2>4. Devices and accounts</h2>
<p>Phemo needs no account. Keep your devices and Apple Account safe; letting an AI assistant read your Phemo files, or entering an AI provider key in Settings, counts as your own action, and any charges are between you and that provider. Phemo is currently free.</p>
<h2>5. System limits</h2>
<p>Phemo works within watchOS limits: calls and Siri interrupt recording for a while, the system may end the app for battery, memory or updates, and recording has to be started from the app. We resume automatically where we can but cannot guarantee that everything is recorded.</p>
<h2>6. Changes and termination</h2>
<p>We may update, change or remove features. If we shut down the whole service we will tell you in advance; what is in your iCloud stays yours and remains accessible. We may suspend or end your use if you break these terms.</p>
<h2>7. Disclaimers and liability</h2>
<p>To the extent the law allows, Phemo is provided "as is". We are not liable for missed recordings, transcription errors, inaccurate AI output or indirect losses arising from them. Our total liability to you is limited to HK$100.</p>
<h2>8. Third parties</h2>
<p>Third-party AI assistants you use are the responsibility of their providers and governed by their own terms and policies. Apple is not a party to these terms and is not responsible for Phemo, but may enforce these terms as a third-party beneficiary.</p>
<h2>9. Governing law</h2>
<p>These terms are governed by the laws of the Hong Kong SAR. Disputes are first to be settled by good-faith negotiation, failing which the competent courts of Hong Kong decide.</p>
<h2>10. Contact</h2>
<p><a href="mailto:support@benchyard.cn">support@benchyard.cn</a></p>
</div></article>`,
  };
}

function qa(q: string, a: string) {
  return `<details><summary>${q}</summary><p>${a}</p></details>`;
}

function support(lang: Lang): PageText {
  if (lang === "zh") {
    return {
      title: "帮助与支持 · Phemo",
      description: "Phemo 常见问题与联系方式。",
      body: `<article class="doc"><div class="narrow">
<h1>帮助与支持</h1><p class="updated">找不到答案？写信给 <a href="mailto:support@benchyard.cn">support@benchyard.cn</a>，附上手表型号、watchOS 版本和问题发生的大致时间。</p>
<h2>常见问题</h2>
${qa("支持哪些设备？", "Apple Watch，watchOS 26 或更新；配对的 iPhone 需 iOS 27 或更新。要点和待办需要支持 Apple 智能的 iPhone，或你自己的 AI 服务 Key。")}
${qa("怎样最快开始录音？", "长按表盘 → 编辑 → 复杂功能，加入 Phemo。之后点一下表盘上的 Phemo 就会打开并开始录音，放下手腕即可。")}
${qa("录音时可以回到表盘吗？", "可以。开始录音后按数码表冠或放下手腕，录音会在后台继续，屏幕顶部会显示麦克风标志。")}
${qa("来电话时会怎样？", "通话、Siri 等会暂时占用麦克风，录音会中断（watchOS 不允许 App 录通话内容）。结束后 Phemo 会自动恢复；如果系统不允许恢复，手表会轻震并发通知，点一下即可继续。")}
${qa("续航怎么样？", "Phemo 只在有人说话时编码和存储，并分段在后台上传，以减少耗电。续航取决于机型、电池健康和说话多少；建议先在一个工作日里试用，观察耗电情况。")}
${qa("不在 iPhone 旁边或没网时会丢吗？", "不会立刻丢。录音片段先保存在手表上，手表能联网时存进你的 iCloud，回到 iPhone 身边后由 iPhone 转成文字。手表存储有限，长时间离线时请留意。")}
${qa("数据存在哪里？", "全部存在你自己的设备和 iCloud（需要登录 Apple 账户并打开 iCloud 云盘）。Phemo 没有处理你数据的服务器。详见<a href=\"/privacy\">隐私政策</a>。")}
${qa("能识别哪些语言？", "转写用的是 iPhone 上 Apple 的语音识别，支持普通话、英文等 Apple 提供的语言，跟随你的系统语言。")}
${qa("要点和待办什么时候出现？", "iPhone 在身边时，一段录音结束后一两分钟内就能看到原话。要点和待办由 iPhone 生成，用 Apple 智能或你在设置里填写的 AI 服务：打开 Phemo 时会更新，iPhone 也会在后台不定时更新。两者都没有时，设置里会提示你配置。")}
${qa("怎样删除我的数据？", "在 iPhone 的 Phemo 中打开「设置 → 删除全部数据」，会删除你 iCloud 里的全部 Phemo 数据，无法恢复。我们这边没有你的数据。")}
${qa("怎样让我的 AI 助手读取 Phemo？", `见 <a href="/agents">连接 AI 助手</a>。`)}
</div></article>`,
    };
  }
  return {
    title: "Help & Support · Phemo",
    description: "Phemo FAQ and contact.",
    body: `<article class="doc"><div class="narrow">
<h1>Help &amp; Support</h1><p class="updated">Can't find an answer? Email <a href="mailto:support@benchyard.cn">support@benchyard.cn</a> with your watch model, watchOS version and roughly when the problem happened.</p>
<h2>Frequently asked</h2>
${qa("Which devices are supported?", "An Apple Watch on watchOS 26 or later, paired with an iPhone on iOS 27 or later. Highlights and to-dos need an iPhone with Apple Intelligence, or your own AI provider key.")}
${qa("What's the fastest way to start?", "Touch and hold your watch face → Edit → Complications, and add Phemo. Then one tap on Phemo opens it and starts recording; lower your wrist.")}
${qa("Can I go back to my watch face while recording?", "Yes. Press the Digital Crown or lower your wrist; recording continues in the background and the microphone indicator shows at the top.")}
${qa("What happens when a call comes in?", "Calls, Siri and similar take the microphone and recording pauses (watchOS never lets apps record calls). Phemo resumes afterwards; if the system won't allow it, the watch taps your wrist and shows a notification — one tap continues.")}
${qa("How is battery life?", "Phemo only encodes and stores audio while someone speaks and uploads it in chunks in the background to save power. Battery life depends on the model, battery health and how much is said; try it for a working day and watch the battery.")}
${qa("What if my iPhone or the internet is away?", "Chunks are kept on the watch until it can reach the internet through the iPhone, Wi-Fi or cellular; they are saved to your iCloud, and your iPhone transcribes them once it is back in reach. Watch storage is limited, so keep an eye on long offline periods.")}
${qa("Where is my data stored?", "Only on your devices and in your own iCloud (sign in to your Apple Account and turn on iCloud Drive). Phemo has no server that handles your data. See the <a href=\"/en/privacy\">Privacy Policy</a>.")}
${qa("Which languages are recognised?", "Transcription uses Apple's speech recognition on your iPhone, so it covers the languages Apple supports, including Mandarin Chinese and English, following your system language.")}
${qa("When do highlights and to-dos appear?", "With your iPhone nearby, what was said shows up a minute or two after a chunk ends. Highlights and to-dos are made by your iPhone with Apple Intelligence or the AI provider in Settings: they update when you open Phemo, and from time to time in the background. If neither is available, Settings shows how to set one up.")}
${qa("How do I delete my data?", "In Phemo on your iPhone, open Settings → Delete all data. It deletes all Phemo data in your iCloud and cannot be undone. We hold none of your data.")}
${qa("How do I let my AI assistant read Phemo?", `See <a href="/en/agents">Connect an AI assistant</a>.`)}
</div></article>`,
  };
}

const DIR = "~/Library/Mobile Documents/iCloud~ai~phemo~app/Documents/Phemo";
const SAMPLE = `---
date: 2026-11-26
timezone: Asia/Shanghai
---
# 2026-11-26

## Summary
…

## To-dos
- [ ] 把合同发给张经理 (due 2026-11-27)

## Transcript
- 10:02 明天下午 3 点开会，记得带上季度报告。`;
const TOOLS: [string, string, string][] = [
  ["list_days", "有内容的日期", "Days that have content"],
  ["get_day", "某一天的转写、要点和待办", "A day's transcript, highlights and to-dos"],
  ["search", "按关键词在所有日子里查找", "Search every day for a phrase"],
  ["list_todos", "全部未完成的待办", "All open to-dos"],
  ["get_recent", "最近一段时间说过的话", "What was said recently"],
];

function agents(lang: Lang): PageText {
  const zh = lang === "zh";
  const esc = (t: string) => t.replace(/&/g, "&amp;").replace(/</g, "&lt;");
  const desktop = `{
  "mcpServers": {
    "phemo": { "command": "phemo-mcp" }
  }
}`;
  const install = "npm install -g phemo-mcp";
  const code = "claude mcp add phemo -- phemo-mcp";
  const skill = `mkdir -p ~/.claude/skills/phemo
curl -fsSL {{BASE}}/skill.md -o ~/.claude/skills/phemo/SKILL.md`;
  const tools = `<div class="tablewrap"><table><tr><th>${zh ? "工具" : "Tool"}</th><th>${zh ? "作用" : "What it does"}</th></tr>${TOOLS.map(([n, z, e]) => `<tr><td><span class="inline">${n}</span></td><td>${zh ? z : e}</td></tr>`).join("")}</table></div>`;
  const T = zh
    ? {
        title: "连接 AI 助手 · Phemo", description: "Phemo 每天的内容是 iCloud 云盘里的 Markdown 文件。用 skill 或本地 MCP，让你电脑上的 AI 助手读取。",
        h1: "连接 AI 助手", lead: "Phemo 把每天的转写、要点和待办写成 iCloud 云盘里的 Markdown 文件。你 Mac 上的 AI 助手读这些文件，就能回顾你说过的话、整理待办。数据不经过我们的服务器，也只有你配置过的助手能读。",
        h2a: "1. 找到文件", find: "iPhone 上的 Phemo 会自动把内容同步到 <strong>iCloud 云盘 › Phemo</strong>。在登录了同一 Apple 账户的 Mac 上，它的位置是：",
        tree: "每天一个文件，按年月分文件夹，另有一份全部未完成待办：", sample: "每个日期文件长这样：",
        h2b: "2. 任选一种方式接入",
        skillP: "<strong>方式一：Skill</strong>（Claude Code、Codex 等能读文件的助手）。把 Phemo 的 skill 放进助手的 skills 目录，它就知道去哪里找、怎么读：",
        mcpP: "<strong>方式二：本地 MCP</strong>（Claude Desktop、Claude Code、Cursor 等支持 MCP 的助手）。<span class=\"inline\">phemo-mcp</span> 在你的 Mac 上运行，只读上面的文件夹。先安装（phemo-mcp 发布到 npm 之后可用）：",
        dirP: "默认读取上面的文件夹；放在别处时加参数 <span class=\"inline\">--dir &lt;文件夹&gt;</span>。",
        desk: "Claude Desktop：编辑 <span class=\"inline\">claude_desktop_config.json</span>", cc: "Claude Code：", cur: "Cursor：把同样的 <span class=\"inline\">mcpServers</span> 配置写进 <span class=\"inline\">~/.cursor/mcp.json</span>。",
        h2c: "MCP 提供的工具", note: "目前是只读的：助手不能修改或删除你的内容。想停止读取，删掉上面的配置即可。只能在网页里运行的云端助手读不到这些文件，这是有意的设计。",
      }
    : {
        title: "Connect an AI assistant · Phemo", description: "Phemo keeps each day as Markdown in iCloud Drive. Let the AI assistant on your Mac read it through a skill or a local MCP server.",
        h1: "Connect an AI assistant", lead: "Phemo writes each day's transcript, highlights and to-dos as Markdown files in iCloud Drive. An AI assistant on your Mac can read them to look back at what was said or sort out to-dos. Nothing goes through our server, and only assistants you configure can read them.",
        h2a: "1. Find the files", find: "Phemo on your iPhone keeps them in sync at <strong>iCloud Drive › Phemo</strong>. On a Mac signed in to the same Apple Account they are at:",
        tree: "One file per day in year/month folders, plus all open to-dos:", sample: "A day file looks like this:",
        h2b: "2. Connect, either way",
        skillP: "<strong>Option 1: Skill</strong> (Claude Code, Codex and other assistants that read files). Put Phemo's skill into the assistant's skills folder so it knows where to look and how to read:",
        mcpP: "<strong>Option 2: local MCP</strong> (Claude Desktop, Claude Code, Cursor and other MCP clients). <span class=\"inline\">phemo-mcp</span> runs on your Mac and only reads that folder. Install it first (available once phemo-mcp is published to npm):",
        dirP: "It reads the folder above by default; add <span class=\"inline\">--dir &lt;folder&gt;</span> if yours is elsewhere.",
        desk: "Claude Desktop: edit <span class=\"inline\">claude_desktop_config.json</span>", cc: "Claude Code:", cur: "Cursor: put the same <span class=\"inline\">mcpServers</span> block into <span class=\"inline\">~/.cursor/mcp.json</span>.",
        h2c: "MCP tools", note: "Read-only for now: assistants can't change or delete your content. Remove the configuration to stop it. Assistants that only run in a web browser can't read these files — by design.",
      };
  return {
    title: T.title,
    description: T.description,
    body: `<article class="doc"><div class="narrow">
<h1>${T.h1}</h1><p class="updated">${T.lead}</p>
<h2>${T.h2a}</h2>
<p>${T.find}</p>
<div class="code">${DIR}</div>
<p>${T.tree}</p>
<div class="code">Phemo/
  2026/11/2026-11-26.md
  todos.md
  README.md</div>
<p>${T.sample}</p>
<div class="code">${esc(SAMPLE)}</div>
<h2>${T.h2b}</h2>
<p>${T.skillP}</p>
<div class="code">${skill}</div>
<p>${T.mcpP}</p>
<div class="code">${install}</div>
<p>${T.dirP}</p>
<p>${T.desk}</p>
<div class="code">${esc(desktop)}</div>
<p>${T.cc}</p>
<div class="code">${esc(code)}</div>
<p>${T.cur}</p>
<h2>${T.h2c}</h2>
${tools}
<div class="note">${T.note}</div>
</div></article>`,
  };
}

export const PAGES: Record<PageId, (lang: Lang) => PageText> = { home, privacy, terms, support, agents };
