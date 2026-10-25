# Chengliang Li's personal website

Personal academic homepage, built with the official [al-folio](https://github.com/alshedivat/al-folio) starter and deployed to <https://tylerli-cl.github.io>.

The site presents a CV-based biography, original profile photo, contact links and the HybridGLoc publication (ICARA 2026). The establishment announcement is retained; the unavailable visitor map is removed. Theme layouts, styles and scripts come from official versioned plugins; template demonstrations are removed.

## Local development

Use Ruby 3.3.5, Node.js 20 and ImageMagick, matching the upstream build environment.

```sh
bundle install
npm ci
bundle exec jekyll serve --host 127.0.0.1
```

Open <http://127.0.0.1:4000/>. This personal site has an empty `baseurl`; do not add `/al-folio` to build or development commands.

## Checks

```sh
npm run lint:prettier
npm run lint:style-contract
bundle exec al-folio upgrade audit
bundle exec al-folio upgrade overrides audit
npm run build:site
npm run test:content
npx playwright install chromium
npm run test:visual
```

The browser suite checks the personal routes and interactions at desktop/mobile sizes in light/dark themes. Screenshots are written to `output/playwright/migration/`.

See [the preservation checklist and future upgrade procedure](docs/site-migration.md), [the exact upstream version](docs/site-upstream.json), and [the official documentation](docs/README.md).
