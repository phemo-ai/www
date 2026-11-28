# Third-party material on phemo.app

## Apple product bezels
`public/bezels/` — Apple Watch Series 11 46 mm and iPhone 17 Pro
product images from Apple Design Resources (https://developer.apple.com/design/resources/), used as is under the
App Store marketing guidelines (https://developer.apple.com/app-store/marketing/guidelines/): no rotation, cropping,
shadows or animation of the devices; correct relative scale when shown together; nothing enters or leaves a screen.
Apple, Apple Watch, iPhone, iPad, MacBook Air, iCloud and Mac are trademarks of Apple Inc.

## Phemo app screenshots — refreshed 2026-11-28

`public/screens/iphone-today2-{zh,en}.{png,webp}` and `watch-rec-nomark-{zh,en}.{png,webp}`
derive from the app's 2026-11-28 CI screenshots. The iPhone sample-data capsule is removed, retaining
the native calendar-only button frame and the new CI calendar glyph. All remaining text and controls
are the actual CI pixels, downsampled to 540 × 1173. The watch images preserve aspect ratio at 416 px
wide, trimming only black padding to 496 px tall; the complete central mark is removed for the site's
animated vector overlay. Edits are confined to those regions; device artwork is unchanged.
WebP versions of the refreshed screenshots are lossless. The watch-face images remain unchanged:
neither language has the removed information button or AI-service configuration.

## Home interaction artwork — 2026-11-28

The hero is an interactive illustration, with Phemo's actual recording-screen pixels on the Watch,
a live HTML Today transcript on iPhone, and illustrative results produced by the user's own agent.
The iPad and MacBook have been removed from the home page. The Watch and iPhone bezels are used
at every viewport size, at their correct relative scale; the day timeline, the iCloud node, the
iCloud Drive › Phemo library card and the agent panel are drawn HTML. The numbers in the figure
(hours recorded, days kept, what the agent read) are illustrative.

The iCloud glyph (`src/scene.ts`) is the Simple Icons 16.38.1 drawing `icloud` (CC0-1.0 for the drawing),
filled with iCloud's blue, at the owner's request. iCloud is a trademark of Apple Inc.; it marks where
the data is stored, and no affiliation or endorsement is claimed.

## Wordmark

`src/wordmark.ts` — "phemo" set in La Belle Aurore by Kimberly Geswein (SIL Open Font License 1.1,
https://github.com/google/fonts/tree/main/ofl/labelleaurore), converted to outlines. No font file is served.
At the owner's explicit request, the hero restores the separate crown and crownless-watch assets
from 2235e6a. Only the separate crown and screen feedback animate. This crown edit is a conscious
exception to the unmodified-device marketing rule above, not a claim of Apple approval.

## Agent marks — sources refreshed 2026-11-28

All 22 listed agents now have a local mark, as explicitly requested by the site owner. This supersedes
the previous conservative name-only display. It does not grant trademark permission or change the
published restrictions identified in the earlier review. Marks identify compatibility only; no affiliation,
endorsement or partnership is claimed. All are rendered with a consistent grayscale treatment and
unchanged aspect ratio. Names and marks remain the property of their respective owners.

Simple Icons drawings below are from pinned **16.38.1**, CC0-1.0 for the drawings, not trademark rights:
https://www.npmjs.com/package/simple-icons/v/16.38.1 . The SVG filename appears after `SI:`.
Other files are unchanged official vendor favicons/app symbols, saved under `public/agent-marks/`.

| Agent | Local file | Artwork source |
| --- | --- | --- |
| Claude Code | claude.svg | SI: claude; https://claude.ai |
| Claude Desktop | claude.svg | SI: claude; https://claude.ai |
| Codex | codex.svg | https://openai.com/favicon.svg (official OpenAI favicon linked by https://openai.com/codex/) |
| Cursor | cursor.svg | SI: cursor; https://cursor.com/brand |
| VS Code · GitHub Copilot | vscode.svg | SI: githubcopilot; https://primer.style/foundations/icons/copilot-24 |
| Windsurf | windsurf-black.svg | https://exafunction.github.io/public/brand/windsurf-black-symbol.svg (https://windsurf.com/brand) |
| Gemini CLI | gemini-cli.svg | SI: googlegemini; https://gemini.google.com |
| Zed | zed.svg | SI: zedindustries; https://github.com/zed-industries/zed/blob/ccc939124fa2f366b3029926447fd0a0c46a85c7/assets/icons/logo_96.svg |
| Cline | cline.svg | SI: cline; https://cline.bot/assets/branding/logos/cline-wordmark-black.svg |
| Kiro | kiro.svg | https://kiro.dev/icon.svg?fe599162bb293ea0 (official site favicon) |
| Goose | goose.svg | https://raw.githubusercontent.com/aaif-goose/goose/main/documentation/static/img/goose.svg (official repository; block/goose redirects here) |
| LM Studio | lmstudio-white.svg | https://lmstudio.ai/assets/marketing/brand/download/logos/lm-studio-icon-outline-white.svg |
| JetBrains AI Assistant | jetbrains.svg | SI: jetbrains; https://www.jetbrains.com/company/brand/logos/ |
| WorkBuddy | workbuddy.svg | https://assets.workbuddy.cn/web/workbuddy/cf2278d3954eddb826bf856f86bcda9acf925917/assets/logo.svg (official https://www.codebuddy.cn/work/ favicon) |
| CodeBuddy | codebuddy.svg | SI: codebuddy; https://www.codebuddy.cn |
| Trae | trae.svg | SI: trae; https://www.trae.ai |
| Qoder · 通义灵码 | qoder.svg | https://qoder.com/favIcon.svg (official site favicon) |
| Kimi Code | kimi-code.svg | SI: kimi; https://moonshotai.github.io/Branding-Guide |
| Qwen Code | qwen-code.svg | SI: qwen; https://qwen.ai |
| iFlow CLI | iflow.png | https://cli.iflow.cn/img/favicon.ico (official PNG favicon, saved with correct PNG extension) |
| Cherry Studio | cherry-studio.png | https://www.cherry-ai.com/assets/favicon-BmbgeFTf.png (official site favicon) |
| 文心快码 Comate | comate.svg | SI: baidu; https://www.baidu.com (vendor mark) |

Previously identified restrictions remain relevant: Anthropic requires permission
(https://www.anthropic.com/legal/trademark-guidelines), GitHub restricts Copilot icon usage
(https://brand.github.com/foundations/logo), Google requires brand approval
(https://about.google/brand-resource-center/brand-terms/), Tencent reserves brand rights
(https://www.codebuddy.ai/document/enterprise-agreement), Qwen prohibits unauthorized mark publication
(https://qwen.ai/termsservice), and Baidu prohibits unauthorized use
(https://abc.baidu.com/duty/copyright.html). Public artwork availability is not a trademark license.
No vendor was contacted in this task. The owner's requested display overrides the earlier site policy,
not these owners' legal terms.

## Fonts
`public/fonts/inter-latin-wght.woff2` — Inter, SIL Open Font License 1.1 (`public/fonts/LICENSE.txt`).
