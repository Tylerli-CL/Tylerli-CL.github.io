# Migration validation — 2026-10-25

This is the historical framework-migration report. The subsequent [CV-based update](site-content-update.md) removes ClustrMaps and adds the current biography/publication; its checks cover the current site.

## Environment and results

Validated on macOS ARM64 with Ruby **3.3.5**, Bundler **4.0.6**, Node.js **20.20.2**, ImageMagick **7.1.2-34**, and the official v1.2 dependency lockfile. Python **3.9.6** served the local static preview; CI keeps Python **3.13**. Ruby and Node were installed under a task-specific temporary directory, without replacing system Ruby. ImageMagick and libyaml were installed through Homebrew.

| Check                              | Result                                                                             |
| ---------------------------------- | ---------------------------------------------------------------------------------- |
| Official upstream provenance       | v1.2 / `b95d6d61a1b0663529094b1b5f4fbe8aa41f8a04`                                  |
| Upgrade audit                      | 0 blocking, 0 non-blocking findings                                                |
| Override audit                     | No local files shadow installed plugin files                                       |
| Production pipeline                | Jekyll build and pinned PurgeCSS passed                                            |
| Original content                   | Biography paragraphs preserved; original photo/news SHA-256 checks passed          |
| Public routes and local references | Home, news, announcement and 404 present; linked local resources resolve           |
| Demo cleanup                       | No demo routes, search entries or sitemap entries                                  |
| Analytics                          | Original ID remains explicitly disabled; no generated GA script or browser request |
| Formatting and starter contract    | Passed                                                                             |
| Upgrade CLI regression check       | Passed                                                                             |
| Production CSS regression check    | Passed                                                                             |
| Browser acceptance                 | All 4 desktop/mobile × light/dark cases passed                                     |
| Runtime failures                   | No failed local resource requests or page JavaScript errors                        |

Browser acceptance also checks the actual generated search data, rendered email/GitHub/Instagram links, original profile placement and shape, viewport overflow, mobile navigation, theme changes, footer settings, and the 404 return to the homepage. The announcement's original timestamp and timezone offset are unchanged; displayed dates follow Jekyll's build timezone.

## Preview and screenshots

The local production preview is available at <http://127.0.0.1:4000/> while its process is running. Restart with `npm run preview` after `npm run build:site`.

Sixteen page screenshots are saved in ignored `output/playwright/migration/`: home, news, announcement and 404 for each viewport/theme. Each case has a matching resource-diagnostics JSON file. External-link results are saved in `output/playwright/external-links.json`.

## External service limitation

The HTTP link check covered 28 outbound links/resources: **26 returned HTTP 200** after redirects. These include the personal GitHub and Instagram profiles, university/institute/supervisor links, OPPO, Sichuan University, the corrected Wikipedia link, and referenced third-party runtime resources.

The two ClustrMaps endpoints closed their TLS connections: the map image and `https://clustrmaps.com/site/1bzku`. Browser checks likewise recorded `ERR_CONNECTION_CLOSED` for the map image. The original widget ID, query parameters and destination link are retained. The map image now explicitly uses HTTPS so the new content security policy also works with local HTTP preview; its alternative text/link remains visible when the external image cannot load. The external service's availability is unresolved.

## Validation boundaries

The build emits a non-blocking notice about missing local `jupyter-nbconvert`; this site has no notebook posts. The upstream dependency stack also emits an ActiveSupport timezone deprecation warning. Neither causes missing personal content or a failed check. CI retains the official notebook prerequisite installation where applicable.

The old upstream visual parity suite depends on template demo pages and a v0.16.3 baseline. It remains in source for reference and is not the personal site's default suite. The current suite checks the retained personal routes and official v1 styling instead.

GitHub-hosted Actions, Pages deployment and optional CodeQL/accessibility checks were not executed remotely. The migration is local and the production site has not been published.
