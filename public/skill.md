---
name: phemo
description: Read the user's Phemo notes — what they said and heard during the day, recorded on their Apple Watch and transcribed, plus the daily summaries and to-dos made from it. The notes are Markdown files in the user's own iCloud Drive (iCloud Drive › Phemo). Use when the user asks what was said or decided in a conversation, what they promised or need to do, what happened on a day, or to find something they talked about.
---

# Phemo

Phemo records the user's day on their Apple Watch (speech only), transcribes it, and the iPhone app turns each day into a summary and to-dos. Everything is stored in the user's own iCloud; Phemo's server keeps nothing. The iPhone app mirrors each day into iCloud Drive as a Markdown file, and this skill reads those files.

## Where the files are

On the user's Mac (iCloud Drive must be on):

```
~/Library/Mobile Documents/iCloud~ai~phemo~app/Documents/Phemo/
  2026/11/2026-11-26.md     one file per day
  todos.md                  open to-dos (convenience copy)
  README.md
```

In Finder this is **iCloud Drive › Phemo**. If the user gives another path (or sets `PHEMO_DIR`), use that.

```sh
PHEMO_DIR="${PHEMO_DIR:-$HOME/Library/Mobile Documents/iCloud~ai~phemo~app/Documents/Phemo}"
ls "$PHEMO_DIR"/*/*/ | tail        # newest days last
```

A file named `.2026-11-24.md.icloud` is a placeholder: iCloud has not downloaded that day to this Mac. Run `brctl download "<path to the placeholder's real name>"` (or ask the user to open the folder in Finder), then read it.

If the folder does not exist, tell the user to open Phemo on their iPhone once (it writes the files) and to check that iCloud Drive is on for this Mac. Do not look for the data anywhere else.

## Day file format

```markdown
---
date: 2026-11-26
timezone: Asia/Shanghai
updated: 2026-11-26T18:40:00+08:00
---
# 2026-11-26

## Summary
3–8 sentences on the day.

## To-dos
- [ ] 把合同发给张经理 (due 2026-11-27) <!-- todo:abc -->
- [x] 订周六晚上的餐厅 <!-- todo:def -->

## Transcript
- 10:02 明天下午 3 点开会，记得带上季度报告。 <!-- utt:c1-0 -->
```

- Times are local (`timezone` in the front matter). Transcript lines are in time order.
- The transcript is raw speech recognition of everything the watch heard: other people, TV, misheard words. Read it with that in mind, and quote it as "you said / someone said around 10:02", not as certain fact.
- The same open to-do can appear on several days (it was still open then); the `todo:` id identifies it. The newest day has its current state.

## Answering common asks

| The user asks | Do |
|---|---|
| "What did I promise / agree to today?" | Read today's file: To-dos first, then scan the Transcript for commitments ("我来…", "I'll…", "记得…", "remind me…"). Give times. |
| "What's on my plate?" / open to-dos | Read `todos.md`, or collect `- [ ]` lines from recent day files, deduped by `todo:` id. |
| "When did someone mention X?" | `grep -rn -i "X" "$PHEMO_DIR" --include='*.md'` and report date + time + the line. For Chinese, search short key words (2–4 characters). |
| "What happened on Tuesday?" | Work out the date, read that day's Summary (and Transcript if they want detail). |
| "Summarize my week" | Read the Summary sections of the last 7 day files; only open transcripts for specifics. |

Keep answers short and cite date and time. Do not paste whole transcripts unless asked.

## Privacy

- Read these files only when the user asks about their Phemo notes. They are private conversations, often including other people.
- Never copy them elsewhere, upload them, or send them to other services unless the user explicitly asks for that.
- This skill is read-only: do not edit or delete files in the Phemo folder (the iPhone app owns them and would overwrite changes).

## MCP instead

For agents that support MCP, the user can run the local `phemo-mcp` server instead (read-only, same files): see https://github.com/lpythu/phemo/tree/main/mcp. Tools: `list_days`, `get_day`, `search`, `list_todos`, `get_recent`.
