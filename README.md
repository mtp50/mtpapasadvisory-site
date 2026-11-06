# M.T. Papas Technology Advisory: website

Static site for mtpapasadvisory.com. Plain HTML, CSS and one small JavaScript file. No build step, no third-party scripts.

## Layout
- `public/`: **the only folder that is published.** Cloudflare serves this directory and nothing else.
  - `index.html`, `css/style.css`, `js/hero.js`
  - `assets/`: favicon, hero video (MP4) and poster image
  - `_headers`: security headers applied by Cloudflare
- `docs/RELEASE.md`: how changes reach production, and how to roll back
- `scripts/post-release-check.sh`: checks the live site's security headers

## Rules
- Keep this repository **private**. The hero video is licensed stock footage and must not be offered as a standalone download.
- Never commit raw or watermarked media. `private-comps/` and `*comp*` are ignored.
- No secrets in this repo. There are none today; the site has no backend.
- Anything outside `public/` is not published. Anything inside `public/` is public to the world.
- Changes go through a pull request. Do not push directly to `main`.
- Footer credit "Video: iStock.com/xavierarnau" must stay (license requirement).
