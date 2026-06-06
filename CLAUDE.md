# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## ⚠️ Before finishing any change

**After making changes, always check whether `README.md` needs updating** — e.g. new/removed optional plugin dependencies, changed install/config steps, renamed features, or new functionality worth documenting. Treat the README as part of the deliverable, not an afterthought.

## What this is

`hexo-theme-tessera` is a **Hexo theme** (templates + styles + plugin scripts), forked from the Butterfly theme, relicensed **AGPL-3.0**, authored by **Talyra42**. Its design language is **glassmorphism** (frosted translucent cards over an aurora gradient background) with a floating rounded "Dock" navbar.

There is **no build/lint/test step in this repo** — the `package.json` `test` script is a placeholder. The theme is *consumed* by a Hexo site: Pug → HTML and Stylus → CSS are compiled at the site's `hexo generate` time by `hexo-renderer-pug` and `hexo-renderer-stylus`.

## Development & verification workflow

This repo is not runnable on its own; it must be loaded by a Hexo blog under `themes/<name>`.

- A local test blog exists at **`/mnt/CoreData/Document/blog`**, where `themes/tessera` is a **git clone of this repo** that the user updates with `git -C themes/tessera pull`. The repo's own remote is the source of truth — commit & push here, then the blog pulls.
- All build commands run **in the blog root, not in this repo**:
  ```bash
  cd /mnt/CoreData/Document/blog
  pnpm exec hexo clean && pnpm exec hexo generate   # or: pnpm server
  ```
- **Always `hexo clean` after editing Stylus.** Hexo only tracks the entry file `source/css/index.styl`'s mtime; edits to `@import`-ed partials won't recompile without a clean. This is a recurring trap.
- To compile-test uncommitted changes without disturbing the blog's clone: copy the changed files into `themes/tessera/`, `hexo clean && hexo generate`, inspect `public/`, then restore with `git -C themes/tessera checkout -- .`. **Never** `rsync --delete-excluded` into the clone (it deletes `.git`).

## Configuration layering (important)

Theme config resolves in this order (later overrides earlier):
1. `scripts/common/default_config.js` — JS object of **theme defaults** (the real source of defaults).
2. `_config.yml` — the documented theme config (mirrors the defaults, with comments).
3. The site's root `_config.<theme-dir>.yml` (e.g. `_config.tessera.yml`) — per-site overrides; this is where users customize without touching the theme.

When changing a default, update **both** `default_config.js` and `_config.yml`.

## Architecture

**Templates (Pug, `layout/`)** — top-level views (`index/post/page/archive/tag/category.pug`) all `extends includes/layout.pug` and fill `block content`. `layout/includes/` holds `head/`, `header/` (the Dock nav), `footer.pug`, `mixins/`, `widget/` (aside cards), `page/` (per-page-type partials), and `third-party/`.

**Styles (Stylus, `source/css/`)** — the design-token pipeline is the key thing to understand:
- `var.styl` — Stylus variables (colors, glass tokens, aurora gradients, palette).
- `_global/index.styl` — maps those into CSS custom properties under `:root` (e.g. `--glass-bg`, `--card-bg`, `--global-bg`, `--card-radius`).
- `_mode/darkmode.styl` — overrides the same custom properties under `[data-theme='dark']`.
- `_global/function.styl` — **`.cardHover`** is the central glass-card style (`@extend`-ed by post cards, aside widgets, pagination, tag pills, etc.). Change glass appearance here and it propagates site-wide. Also holds shared mixins/animations.
- `_layout/` (head/aside/footer/post/pagination/…), `_page/` (homepage/tags/categories/…), `_tags/`, `_search/`. Entry: `index.styl` (glob-imports the dirs).

**Client JS (`source/js/`)** — `main.js` (nav/dock, dark mode, lazyload init, rightside tools, scroll, etc.), `utils.js` (`btf` helpers), `tw_cn.js` (zh conversion), `search/`.

**Hexo plugin scripts (`scripts/`)** — `events/` (`init.js` validates env + merges config, `cdn.js` builds asset URLs, `404.js`, `welcome.js`), `filters/` (`post_lazyload.js` rewrites `<img>`→`data-lazy-src`, `random_cover.js`), `helpers/` (`page.js` incl. `cloudTags`, `related_post.js`, `aside_*.js`, `series.js`), `tag/` (markdown tag plugins: note, tabs, timeline, button, gallery, mermaid, chartjs, …). `plugins.yml` maps third-party libs to CDN files for `cdn.js`.

## Gotchas / conventions

- **`page.pug` shared scope:** it dispatches page types via `case page.type` / `when` and `include`s each `includes/page/*.pug`. Pug compiles `case` to a `switch`, so all page partials' top-level `-` code blocks share **one scope** — top-level `const`/`let` names **must be unique across page partials** (e.g. `tagPalette` in tags.pug vs `palette` in categories.pug). A collision triggers Pug's misleading `Error parsing body of the with expression`.
- **Pug attribute expressions:** keep attribute values simple — prefer precomputing strings in a `-` block and referencing the variable (`style=st`) over complex template literals in attributes.
- **CSS file format is not minified** when grepping `public/css/index.css` (has spaces/newlines) — account for that in patterns.
- **Don't rename** the external package names `butterfly-extsrc` (in `plugins.yml`) and `hexo-butterfly-extjs` (in `_config.yml` comment) — they are real npm packages used for CDN/local third-party scripts.
- **Apache-2.0 attribution:** this is a fork of Butterfly; keep the original-author credit in `README.md` and the `Modify by Jerry` notices in `scripts/tag/note.js` / `tabs.js`.

## Optional site plugins (install in the blog, not here)

Required: `hexo-renderer-pug`, `hexo-renderer-stylus`. Optional: `hexo-wordcount` (word count / read time — also needs `wordcount.enable: true`), `hexo-generator-searchdb` (local search), `hexo-butterfly-extjs` (only when third-party CDN is set to `local`). See README for details.
