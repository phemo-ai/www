/** Shared outcome examples. Copy and prompts transcribed from the supplied usecases.md. */
type Lang = "zh" | "en";
interface UseCase { id: string; title: string[]; time: string[]; line: string[]; action: string[]; prompt: string[] }
export const USE_CASES: UseCase[] = [
  {
    "id": "proposal",
    "title": [
      "会后直接交付",
      "From meeting to proposal"
    ],
    "time": [
      "14:32",
      "14:32"
    ],
    "line": [
      "周五前给我们一版报价和方案。",
      "Send us a proposal and a quote by Friday."
    ],
    "action": [
      "起草方案和报价表，写好跟进邮件草稿，提议下次会议。",
      "Drafts the proposal and the quote sheet, writes the follow-up email draft, proposes the next meeting."
    ],
    "prompt": [
      "读取 Phemo 里今天下午和客户的会议，起草方案和报价表，再写一封跟进邮件草稿。",
      "Read today's afternoon client meeting in Phemo, draft the proposal and the quote, and write a follow-up email draft."
    ]
  },
  {
    "id": "bugfix",
    "title": [
      "站会提到的 bug，PR 已经开好",
      "Bug from standup, PR already open"
    ],
    "time": [
      "09:41",
      "09:41"
    ],
    "line": [
      "登录页在 iOS 27 上会闪退。",
      "The login screen crashes on iOS 27."
    ],
    "action": [
      "在仓库里找到原因、修复问题，打开引用原话的 PR。",
      "Finds the cause in the repo, fixes it, opens a PR that quotes the line."
    ],
    "prompt": [
      "看一下 Phemo 里今天站会提到的 bug，在这个仓库里修好并开一个 PR，PR 描述引用原话。",
      "Check the bugs mentioned in today's standup in Phemo, fix them in this repo and open a PR that quotes what was said."
    ]
  },
  {
    "id": "crm",
    "title": [
      "销售电话后 CRM 已更新",
      "CRM updated after the call"
    ],
    "time": [
      "11:05",
      "11:05"
    ],
    "line": [
      "预算三十万，下个月由 CTO 拍板。",
      "Budget is 300k, the CTO decides next month."
    ],
    "action": [
      "更新 CRM 的预算、决策人和时间线，准备报价和下次沟通提纲。",
      "Updates budget, decision maker and timeline in the CRM, makes the quote and the next-call outline."
    ],
    "prompt": [
      "根据 Phemo 里今天上午的销售电话，更新 CRM 里的客户信息，并准备报价单和下次沟通提纲。",
      "From this morning's sales call in Phemo, update the customer in the CRM and prepare a quote and an outline for the next call."
    ]
  },
  {
    "id": "research",
    "title": [
      "用户访谈变成研究报告",
      "Interviews become a research report"
    ],
    "time": [
      "本周 · 8 场访谈",
      "This week · 8 interviews"
    ],
    "line": [
      "每次导出都要等太久。",
      "Every export takes too long."
    ],
    "action": [
      "归纳本周访谈的发现，每条结论附原话和时间。",
      "Groups findings across the week's interviews; each finding carries quotes with time stamps."
    ],
    "prompt": [
      "汇总 Phemo 里本周的 8 场用户访谈，写一份洞察报告，每条结论附原话和时间。",
      "Summarise this week's 8 user interviews in Phemo into an insights report; give every finding its quotes and times."
    ]
  },
  {
    "id": "doctor",
    "title": [
      "看病后的家庭清单",
      "After the doctor's visit"
    ],
    "time": [
      "16:20",
      "16:20"
    ],
    "line": [
      "这个药饭后吃，两周后复查。",
      "Take it after meals, come back in two weeks."
    ],
    "action": [
      "整理用药时间表、复查提醒和下次要问的问题。",
      "Medication schedule, check-up reminder, questions for next time."
    ],
    "prompt": [
      "根据 Phemo 里今天看病时医生说的话，整理用药时间表、复查提醒和下次要问的问题。",
      "From what the doctor said today in Phemo, make a medication schedule, a check-up reminder and questions for next time."
    ]
  },
  {
    "id": "lecture",
    "title": [
      "课堂变成学习材料",
      "A lecture becomes study material"
    ],
    "time": [
      "10:15",
      "10:15"
    ],
    "line": [
      "这个公式期末一定会考。",
      "This formula will be on the final."
    ],
    "action": [
      "整理结构化笔记、Anki 记忆卡和小测。",
      "Structured notes, Anki cards, a short quiz."
    ],
    "prompt": [
      "把 Phemo 里今天的课整理成笔记，做一套 Anki 记忆卡和 10 道小测。",
      "Turn today's lecture in Phemo into notes, an Anki deck and a 10-question quiz."
    ]
  },
  {
    "id": "family",
    "title": [
      "家里的零碎话变成安排",
      "Family plans, ready"
    ],
    "time": [
      "20:10",
      "20:10"
    ],
    "line": [
      "妈妈生日那天订个能看江景的餐厅。",
      "Book somewhere with a river view for Mum's birthday."
    ],
    "action": [
      "列出餐厅候选、购物清单和出行安排。",
      "Shortlists restaurants, builds the shopping list, drafts the trip itinerary."
    ],
    "prompt": [
      "看看 Phemo 里这周家里说过要办的事，帮我列出餐厅候选、购物清单和出行安排。",
      "Find the plans we talked about at home this week in Phemo and give me restaurant options, a shopping list and a trip plan."
    ]
  },
  {
    "id": "weekly",
    "title": [
      "周报已经写好",
      "Your weekly report, written"
    ],
    "time": [
      "本周",
      "This week"
    ],
    "line": [
      "这周把新手引导定下来了。",
      "We settled onboarding this week."
    ],
    "action": [
      "按项目整理本周进展，列出关键决定和原话出处。",
      "Groups the week by project, with key decisions and their sources."
    ],
    "prompt": [
      "根据 Phemo 里这周的录音写一份周报，按项目分组，列出关键决定和原话出处。",
      "Write my weekly report from this week's Phemo recordings, grouped by project, with key decisions and where they were said."
    ]
  }
];

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
const COPY = {
  zh: { title: "Phemo + 你的 agent", try: "试试这些", sub: "Phemo 只提供你说过的话。你的 agent 和它已有的工具负责完成工作。", example: "以下为结果示意；把提示词复制给你自己的 agent。", connect: "连接你的 agent", copy: "复制", doctor: "仅整理医生原话，不构成医疗建议。", draft: "跟进邮件 · 草稿", pr: "修复登录页闪退", open: "PR 已打开", crm: "客户记录已更新", budget: "预算 300k · 决策人 CTO", research: "8 场访谈 · 结论附原话和时间", care: "家庭照护安排", calendar: "复查 · 两周后", quiz: "Anki 记忆卡 · 10 道小测", family: "餐厅候选 · 购物清单 · 行程", weekly: "按项目 · 关键决定 · 原话出处" },
  en: { title: "Phemo + your agent", try: "Try these", sub: "Phemo only provides what you said. Your own agent and the tools it already has do the work.", example: "Illustrative results. Copy a prompt to your own agent.", connect: "Connect your agent", copy: "Copy", doctor: "Organises the doctor's words. Not medical advice.", draft: "Follow-up email · Draft", pr: "Fix login screen crash", open: "Pull request open", crm: "Customer record updated", budget: "Budget 300k · Decision maker CTO", research: "8 interviews · Findings with quotes and times", care: "Care plan", calendar: "Check-up · In two weeks", quiz: "Anki deck · 10-question quiz", family: "Restaurant shortlist · Shopping list · Itinerary", weekly: "By project · Key decisions · Sources" },
};
export function preview(id: string, lang: Lang) {
  const c = COPY[lang];
  const file = (name: string, kind = "MD") => `<span class="file-chip"><i class="k-${kind.toLowerCase()}">${kind}</i>${name}</span>`;
  const row = (title: string, detail: string) => `<div class="result-row"><span class="result-check" aria-hidden="true">↗</span><div><b>${esc(title)}</b><span>${esc(detail)}</span></div></div>`;
  switch (id) {
    case "proposal": return `<div class="result-files">${file("proposal.docx", "W")}${file("quote.xlsx", "X")}</div>${row(c.draft, lang === "zh" ? "方案与报价已附上，供你审阅。" : "Proposal and quote attached, ready for review.")}`;
    case "bugfix": return `<div class="pr-preview"><span class="pr-badge">${c.open}</span><b>${c.pr}</b><code>fix/ios27-login <span>→</span> main</code></div>`;
    case "crm": return `${row(c.crm, c.budget)}<div class="result-files">${file("quote.xlsx", "X")}${file("call-outline.md")}</div>`;
    case "research": return `${file("research-report.md")}${row(lang === "zh" ? "导出等待时间" : "Export wait times", c.research)}`;
    case "doctor": return `${row(c.care, c.calendar)}<span class="result-note">${c.doctor}</span>`;
    case "lecture": return `${file("notes.md")}${row(c.quiz, lang === "zh" ? "重点公式 → 记忆卡 → 自测" : "Key formula → Flashcards → Self-check")}`;
    case "family": return `${row(lang === "zh" ? "妈妈生日" : "Mum's birthday", c.family)}<span class="result-note">${lang === "zh" ? "江景餐厅候选，等你挑选" : "River-view restaurants, ready to choose"}</span>`;
    default: return `${file("weekly-report.md")}${row(lang === "zh" ? "新手引导已定稿" : "Onboarding agreed", c.weekly)}`;
  }
}
export function useCases(lang: Lang, compact = false) {
  const c = COPY[lang], l = lang === "zh" ? 0 : 1;
  const tool = lang === "zh" ? "Trae · 通义灵码 / Qoder · CodeBuddy · WorkBuddy · Kimi Code · 飞书文档 / 飞书日历" : "Claude Code · Cursor · Codex · Your connected tools";
  return `<section class="outcomes${compact ? " compact" : ""}" aria-labelledby="outcomes-title"><div class="${compact ? "" : "wrap"}"><div class="outcomes-head"><p class="eyebrow">${compact ? c.title : (lang === "zh" ? "从一整天的录音，到一份成果" : "From a day of recordings to a finished result")}</p><h2 id="outcomes-title">${compact ? c.try : c.title}</h2><p>${c.sub}</p><p class="outcomes-tools">${tool}</p><small>${c.example}</small></div><div class="outcome-grid">${USE_CASES.map((u, i) => `<article class="outcome" data-case="${u.id}"><header><span class="case-number">${String(i + 1).padStart(2,"0")}</span><h3>${esc(u.title[l]!)}</h3></header>${compact ? "" : `<blockquote><time>${esc(u.time[l]!)}</time><p>“${esc(u.line[l]!)}”</p></blockquote><p class="agent-action">${esc(u.action[l]!)}</p><div class="deliverable">${preview(u.id,lang)}</div>`}<div class="prompt"><p>${esc(u.prompt[l]!)}</p><button type="button" class="copy" data-copy="${esc(u.prompt[l]!)}" aria-label="${c.copy} · ${esc(u.title[l]!)}">${c.copy}</button></div></article>`).join("")}</div>${compact ? "" : `<a class="pill" href="${lang === "zh" ? "/agents" : "/en/agents"}">${c.connect} <span aria-hidden="true">↗</span></a>`}</div></section>`;
}
