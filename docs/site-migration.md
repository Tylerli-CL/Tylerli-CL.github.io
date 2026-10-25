# Personal site migration

This records the initial framework migration. The later [CV-based content update](site-content-update.md) replaces the old biography/email, removes the visitor map and enables the personal publication; it supersedes those preservation decisions below.

## Source and preservation checklist

The migration starts at site commit `547b9aea3356c3370617e8d6f4fde6fde3ddca31` and uses official al-folio **v1.2**, commit `b95d6d61a1b0663529094b1b5f4fbe8aa41f8a04`. See [the source record](site-upstream.json) and [original file hashes](site-preservation.json).

| Original customization                                   | Destination                                 | Acceptance check                                                                               |
| -------------------------------------------------------- | ------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| Biography, education/research history, subtitle          | Homepage content                            | Compare the original paragraphs with the migrated source and rendered page; no factual rewrite |
| Profile photo, right alignment, rectangular shape        | Personal image and homepage front matter    | Original SHA-256 and browser layout checks                                                     |
| Name, domain, English language, empty baseurl, atom icon | Site configuration                          | Rendered title, links, favicon and HTML language                                               |
| Email, GitHub, Instagram and contact note                | Social data and site configuration          | Clickable links; normalize `[at]` to `@`                                                       |
| Establishment announcement and original date             | News collection                             | Same source content/date and original route                                                    |
| ClustrMaps visitor map                                   | Homepage content                            | Same site ID, query parameters and target link                                                 |
| News enabled; selected papers/latest posts/RSS disabled  | Homepage front matter and social data       | Homepage content and absence of unwanted sections/icons                                        |
| Last-updated enabled; empty footer credit                | Site configuration                          | Rendered footer                                                                                |
| Analytics ID `G-EMCYE4Y82X`, disabled                    | `analytics.google` plus explicit off-switch | No Google Analytics script or request in production output                                     |
| Personal GitHub username; no repository list             | Repository data                             | Same user and an empty repository list                                                         |
| Removed CV/blog/projects/publications/teaching pages     | Personal content set                        | No restored demo route, search result or sitemap entry                                         |

Biography text is unchanged. Technical corrections cover the malformed Wikipedia URL delimiters, an explicit HTTPS map image URL with alternative text, and whitespace/obsolete template comments. The original news file and original profile image are preserved byte for byte.

## Architecture and cleanup

The official starter's dependency pins, plugin activation and `theme: al_folio_core` are retained. The initial migration had no local layout, include, Sass or JavaScript overrides. A subsequent user-requested author highlight adds one tracked Sass entry override; see the current content update and `.al-folio-overrides.yml`. Bootstrap compatibility stays off; the site adopts official v1 styles. Unused blog pagination and demo collection archives are disabled. The official PurgeCSS deployment step is pinned as a local development dependency and shared by local preview checks and Pages through `npm run build:site`.

Demo posts, books, projects, teaching pages, Einstein records, sample CVs, sample social accounts, imported external posts and their dedicated media are removed. Documentation remains available; its tutorial/error-image media lives under excluded `docs/media/`. Links to removed optional example files point to the immutable official release.

The site preserves `/`, `/news/`, `/news/announcement_1/` and `/404.html`. Removed demo URLs deliberately have no redirects. GitHub Pages continues to deploy from `master` to `gh-pages`; upstream publication and demo-maintenance workflows are removed. Site accessibility, built-site link checks and CodeQL remain available; the new CodeQL workflow has no scheduled trigger. The upstream demo parity suite remains in source for reference, while the default visual suite and CI target this site's actual pages.

## Validation and preview

Use the commands in [the project README](../README.md). Run the production build and content check before visual checks. Browser screenshots and external-resource diagnostics are written under ignored `output/playwright/`; build output, tests and documentation are excluded from the published site. See [the validation report](site-validation.md) for observed results and limitations.

## Future updates

1. Start a branch from the current site and resolve the latest official stable release to a tag and complete commit SHA.
2. Compare the recorded upstream release with the new release in a separate checkout. Apply starter/configuration/workflow changes while retaining this checklist's site-owned content and cleanup decisions.
3. Update the exact official plugin pins in `Gemfile` and matching plugin activation in `_config.yml`; `bundle update` alone cannot change exact pins. Resolve and commit the lockfile, including Linux and local macOS platforms.
4. Run upgrade/override audits, production build, content checks and browser checks. Review new defaults, especially analytics IDs and demo content.
5. Update the source record and validation report before merging. Push/merge only when ready to deploy; a push to `master` triggers the existing Pages workflow.

The original site remains recoverable through its recorded commit and the unchanged `master` branch during local review.
