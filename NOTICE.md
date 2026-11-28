# Third-party material on phemo.app

## Apple product bezels
`public/bezels/` — Apple Watch Series 11 46 mm, iPhone 17 Pro, iPad Pro (M5) 11-inch and MacBook Air M5 13-inch
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

## Agent marks — reviewed 2026-11-28

The starting `src/icons.ts` contained **14 distinct marks, used for 15 agent entries** (Claude's mark appeared
for both Claude Code and Claude Desktop). All 22 agents remain available by name in the directory.
CC0 for a Simple Icons drawing does not grant trademark permission. This review checks the owner's rules
for a factual compatibility reference, with no endorsement or partnership claim. Where a published brand
page supplies artwork but no clear permission for this use, we use the name alone, conservatively; that
is an unresolved grant, not a claim that the owner forbids every reference.

| Company / mark | Result | Published guideline or policy; reason |
| --- | --- | --- |
| Anthropic / Claude (2 entries) | Removed | https://www.anthropic.com/legal/trademark-guidelines — prior permission and approved materials required. |
| Anysphere / Cursor | Removed | https://cursor.com/brand — public asset/representation guide, but no express compatibility-marketing grant; name only pending clarification. |
| GitHub / GitHub Copilot | Removed | https://brand.github.com/foundations/logo — standalone Copilot icon deprecated since 2025; express permission requirements and permitted-logo restrictions. |
| Cognition / Windsurf | Kept | https://windsurf.com/brand — explicitly permits symbol in standalone logo grids. Use unchanged official black/white SVGs, including their built-in clear space; no tint, effects or logo animation. |
| Google / Gemini | Removed | https://about.google/brand-resource-center/brand-terms/ and https://about.google/brand-resource-center/guidance/partnerships/ — explicit approval required for brand features; non-partner references use plain text. |
| Zed Industries / Zed | Kept | https://zed.dev/brand — black, white or brand blue marks permitted, with no implied official connection. Original undistorted Simple Icons geometry, pure black/white, separate from Phemo's mark. |
| Cline Bot / Cline | Removed | https://cline.bot/brand and https://cline.bot/tos — public assets, but no express compatibility-marketing grant identified; use name only pending clarification. |
| Element Labs / LM Studio | Kept | https://lmstudio.ai/brand — expressly permits referential use subject to guidelines. Replaced the old Simple Icons drawing with the owner's unchanged white outline app icon on a black background, keeping clear space. |
| JetBrains | Removed | https://www.jetbrains.com/company/brand/ — referential use and built-in connections allowed with supplied assets and a backlink. Removed the previous outlined Simple Icons variant; retaining the name avoids using an unverified variant at tiny size. |
| Tencent / CodeBuddy | Removed | https://www.codebuddy.ai/document/enterprise-agreement — Tencent/CodeBuddy brand features reserved; no authorization for this use. |
| ByteDance / TRAE | Removed | https://docs.trae.cn/ide_terms-of-service and https://www.bytedance.com/ip-principles — no public third-party logo-use grant identified; name only pending permission. |
| Moonshot AI / Kimi | Removed | https://www.kimi.com/zh-cn/policies/logo-usage-terms — permission covers media/news/non-commercial displays; product compatibility marketing is not clearly covered. |
| Alibaba Cloud / Qwen | Removed | https://qwen.ai/termsservice — section V reserves marks and prohibits unauthorized use/publication. |
| Baidu | Removed | https://abc.baidu.com/duty/copyright.html — use without permission prohibited. |

Retained official files:
- `public/agent-marks/windsurf-black.svg`: https://exafunction.github.io/public/brand/windsurf-black-symbol.svg
- `public/agent-marks/windsurf-white.svg`: https://exafunction.github.io/public/brand/windsurf-white-symbol.svg
- `public/agent-marks/lmstudio-white.svg`: https://lmstudio.ai/assets/marketing/brand/download/logos/lm-studio-icon-outline-white.svg
- `src/icons.ts`: Zed geometry from Simple Icons 16.38.1 (https://simpleicons.org, CC0-1.0 for the drawing).

The site uses names for agents without a retained mark, including Codex, Kiro, Goose, WorkBuddy, Qoder,
iFlow CLI and Cherry Studio. No company has been contacted or asked for permission in this task.

## Fonts
`public/fonts/inter-latin-wght.woff2` — Inter, SIL Open Font License 1.1 (`public/fonts/LICENSE.txt`).
