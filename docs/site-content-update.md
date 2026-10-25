# Biography and publication update — 2026-10-25

## Sources

The biography uses the latest **Chengliang Li 博士申请 CV 中文主审阅版**, updated 2026-10-15, and **CV 事实核对** from the user's PhD-application Space. The CV index identifies the master review version as the current source; the A/B/C/D versions are historical drafts. Private application notes, date of birth, internal production counts, and the full CV are not copied into this repository or published.

Publication metadata was checked against the [Leibniz University Hannover research record](https://research.uni-hannover.de/en/publications/hybridgloc-hybrid-2d-3d-cross-lidar-global-localization/). Equal contribution is supported by the CV and the Space's analysis of the uploaded paper, which records the first two authors' matching contribution footnote.

## Changes

- Remove the ClustrMaps widget and all public links/requests to that service.
- Replace the outdated student biography with the current Robotics Engineer role based in Shanghai, without naming the employer; record the M.Sc. award in October 2024.
- Summarize GNSS-denied localization and Room Graph research, Xiaomi employment, and Huawei/OPPO internships. Omit employment/internship dates and Xiaomi task details; avoid unsupported performance claims or expanded individual attribution.
- Use the user-selected public contact address, shown only as `licl0124[at]icloud.com`; retain GitHub, Instagram, the original photo and establishment announcement.
- Add HybridGLoc to the homepage's selected publications and a navigation-linked `/publications/` page through official Jekyll Scholar rendering.
- Preserve the canonical author order, explicitly state Mortazavi and Li's equal contribution, and supply the ICARA 2026 venue, pages 594–600 and DOI `10.1109/ICARA69401.2026.11480397`.
- Provide a short method summary and expandable BibTeX. No PDF link is offered because a public manuscript URL was not established; the university record is linked alongside the DOI.

This intentionally supersedes the original migration checklist's biography, student email, map preservation and selected-publications-off decisions. The original preservation manifest remains a historical record and still checks the untouched image and announcement.

## Checks

The production pipeline, personal-content checks, formatting, thin-starter contract, and upgrade/override audits passed. There are no upgrade findings. The author styling added later uses the acknowledged override described below.

All four browser cases passed, covering desktop/mobile in light/dark themes, including the five retained/current routes, updated role and email, search data, map removal, theme/navigation controls, and the publication's DOI, abstract and BibTeX controls. Twenty screenshots and per-case resource diagnostics (zero local failures, third-party failures, JavaScript errors or analytics requests) are under ignored `output/playwright/migration/`.

The DOI and citation metadata are confirmed by the university record; the DOI resolver could not be opened by the web inspection tool. Remote GitHub Actions and deployment have not been run. This update is local on `codex/al-folio-upgrade`.

## Subsequent browser annotations

The subtitle now starts with “Engineer”, while the introduction uses “Robotics Engineer based in Shanghai”. The equal-contribution sentence is removed from the biography; the publication citation retains its bibliographic contribution note. Huawei is named as Intelligent Automotive Solution BU (IAS BU) and links to its official about page; OPPO Research Institute links to OPPO's official about page.

A new inline news entry records HybridGLoc's publication on **2026-02-05**, the date listed in the university publication record above. It links to the personal publications page and has its own route at `/news/hybridgloc_published/`.

## Academic layout and author emphasis

The university research is now a two-item list (master's thesis at IKG and Room Graph at RTS), with Germany 🇩🇪 stated in the degree paragraph and China 🇨🇳 beside Sichuan University. The subtitle begins with “Robotics Engineer”. The contribution note is shortened to “Equal contribution (first two authors).” without repeating names.

The current author is bold with a pale yellow marker background on both the homepage and publications page. This uses one intentional, acknowledged local override, `assets/css/main.scss`: it preserves the official v1.2 Sass entry and appends only the author/note presentation rules. Its upstream checksum is tracked in `.al-folio-overrides.yml`; compare and re-acknowledge the override when updating `al_folio_core`.

The Huawei link now uses `https://auto.huawei.com/cn/`, which was opened successfully in the in-app browser; the prior English about-page path has been removed. Xiaomi also links to its official global homepage, `https://www.mi.com/global/`.

## Public email presentation

The personal Gmail address is removed from the current public contact data. Email is now displayed as non-interactive `licl0124[at]icloud.com` in the contact note, with a short instruction to replace `[at]` manually. There is no mailto link, email social icon, or email search action, and no automatic copy/send behavior. GitHub and Instagram remain clickable. This reduces simple address-pattern collection and accidental mail-client launches; it does not claim to prevent a determined scraper from reconstructing a publicly readable address.

## Research-interest wording

The introduction now centers on spatial intelligence for robotics, connecting 3D perception and scene understanding with task planning and execution. The stated goal is for robots to understand the physical world and use that understanding to carry out tasks more effectively. The GNSS-denied qualifier remains specific to the master's research rather than the broader interest statement. The subtitle includes the playful “Vibe coder (bugs included) 🐛”.

## Submission history and contact privacy

The migration and subsequent personal-content edits are consolidated into one commit above the original `547b9ae` baseline for review. The new commit uses a GitHub noreply author/committer address, and the repository's local Git email is set to the same address for future commits. Intermediate migration commits are not pushed.

The old personal contact address is absent from the final tracked files. Squashing this branch does not remove it from the existing baseline history or the removed lines in the comparison against that baseline; the public contact remains the explicitly chosen masked iCloud address.
