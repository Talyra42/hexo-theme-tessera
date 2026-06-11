# CLAUDE.md

本文件为 Claude Code（claude.ai/code）在本仓库工作时提供指引。

## ⚠️ 每次改动收尾前必做

改完代码后，**务必同步检查以下文档是否需要更新**，把文档当作交付物的一部分，而不是事后补的东西：

1. **`docs/` VitePress 文档站** —— 只要改动了**配置字段、功能行为、页面类型、标签插件**，或任何用户可感知的能力，就要回到 `docs/` 确认对应文档是否需要新增 / 修正。新增配置项务必在文档里补上字段说明；删除或重命名功能也要同步删改。**文档站是面向用户的唯一权威使用说明，不能落后于代码。**
2. **`README.md`** —— 涉及主题特色、必装 / 可选插件、安装步骤变化时同步更新。README 只保留「这是什么 + 特色 + 快速开始 + 指向文档」，技术细节都放在 `docs/`。
3. **`TODO.md`** —— 发现遗留代码、潜在 bug、配置不一致等问题时，记录到根目录 `TODO.md` 向维护者汇报，不要默默忽略。

## 这是什么

`hexo-theme-tessera` 是一个 **Hexo 主题**（Pug 模板 + Stylus 样式 + 插件脚本），由 Butterfly 主题重构而来，重新以 **AGPL-3.0** 授权，作者 **Talyra42**，仓库归属组织 **LumiDesk**。设计风格**简洁克制**：纯净的浅 / 深底色（`#f7f9fe` / `#18171d`）上排布近乎实色的**描边卡片**（`$glass-bg = rgba(255,255,255,.88)` + 实色细边 + 12px 圆角 + 轻微 10px 磨砂），全站只用**一个蓝**（`#425AEF`）作为强调；顶部是一条全宽贴顶的磨砂玻璃导航栏（`#nav`，菜单项为胶囊药丸）；标志性的视觉签名是基于 three.js 的**漂浮玻璃碎片 3D 背景**（`bg3d.js`），隐约透过卡片但不喧宾夺主。注意：**不是「全站玻璃拟态」，也不是「悬浮 Dock」**——磨砂质感仅用于顶栏与卡片的轻微叠层，真实设计语言见 `source/css/var.styl` 顶部的作者注释。

本仓库**没有 build / lint / test 流程**——`package.json` 的 `test` 只是占位。主题由 Hexo 站点*消费*：Pug → HTML、Stylus → CSS 都在站点执行 `hexo generate` 时，由 `hexo-renderer-pug` 与 `hexo-renderer-stylus` 编译。

## 开发与验证流程

> ⚠️ **Claude 不要自行运行 `tools/` 下的任何脚本**（`sync-to-blog.sh`、`release.sh` 等），也不要自行把主题同步到博客或触发构建 / 发布。需要在真实博客里编译验证时，**请直接找用户（Talyra42）来执行验证**，把要验证的点说清楚即可。下面记录的脚本说明仅供理解用途，不代表可由 Claude 调用。

本仓库无法单独运行，必须被 Hexo 博客作为 `themes/<name>` 加载。

- 通过把主题装进本地 Hexo 测试博客（`themes/tessera`）来验证；仓库自己的远程仓库才是源头真相（source of truth）。
- **用 `tools/sync-to-blog.sh` 把工作区同步进博客**（取代旧的 `git -C themes/tessera pull` 流程）。它会**清空目标主题目录并重新复制**当前仓库（排除 `.git`、`node_modules`、`tools`、`.github`、`.vscode`、`CLAUDE.md`），所以连*未提交*的改动也能生效。目标目录解析顺序：`$1` → 环境变量 `$TESSERA_BLOG_THEME` → 脚本顶部的 `DEFAULT_TARGET`；加 `-y` 跳过删除确认。
- **用 `tools/release.sh [patch|minor|major|X.Y.Z]` 发布版本**——更新 `package.json` 版本号、提交 `chore(release): vX.Y.Z`、打 tag、推送，用 `git archive` 打出纯净主题 zip，并用 `gh` 创建 GitHub Release。`.gitattributes` 的 `export-ignore` 负责把开发文件挡在 zip 之外。需要先 `gh auth login`。
- **所有构建命令都在博客根目录执行，不在本仓库**：
  ```bash
  cd <blog-root>
  pnpm exec hexo clean && pnpm exec hexo generate   # 或：pnpm server
  ```
- **改完 Stylus 一定先 `hexo clean` 再生成。** Hexo 只跟踪入口文件 `source/css/index.styl` 的 mtime，改被 `@import` 的分文件不清缓存不会重新编译——这是反复踩的坑。
- 编译测试未提交改动：先跑 `tools/sync-to-blog.sh`，再 `hexo clean && hexo generate`，检查 `public/`。（若博客里的 `themes/tessera` 仍是 git clone 而非纯复制，旧办法「拷改动进去、再 `git -C themes/tessera checkout -- .` 还原」也可用——但**绝不能**对 clone 用 `rsync --delete-excluded`，那会删掉 `.git`。）

## 文档站（`docs/`）

- 用 **VitePress** 编写，是一个**独立的 pnpm 子项目**（有自己的 `docs/package.json` 与 `docs/.vitepress/`），不与主题的 `package.json` 混在一起。
- 本地预览：`cd docs && pnpm install && pnpm docs:dev`；构建：`pnpm docs:build`。
- `docs/node_modules`、`docs/.vitepress/dist`、`docs/.vitepress/cache` 都不应提交（见 `.gitignore`）。
- 内容定位：**面向使用者的主题使用文档**——配置字段详解、页面进阶用法（关于页 / 友链 / 说说）、标签插件语法、可选插件、常见问题。每次改配置或功能都要回来同步（见顶部规则）。

## 配置分层（重要）

主题配置按以下顺序解析（后者覆盖前者）：
1. `scripts/common/default_config.js` —— **主题默认值**的 JS 对象（默认值的真正来源）。
2. `_config.yml` —— 有注释的、对外文档化的主题配置（镜像默认值）。
3. 站点根目录的 `_config.<theme-dir>.yml`（如 `_config.tessera.yml`）—— 每个站点的覆盖配置；用户在这里定制，无需改动主题。

合并逻辑在 `scripts/events/init.js`（用 `hexo-util` 的 `deepMerge`）。**改默认值时，`default_config.js` 和 `_config.yml` 两处都要同步改**，否则二者会漂移（当前已存在漂移，见 `TODO.md`）。同时别忘了第三件事：相关字段的说明要在 `docs/` 里同步更新。

> 历史遗留：旧的 `tessera.yml`（放在 `_data/` 下）已废弃，`init.js` 检测到会直接报错，要求改用 `_config.tessera.yml`。

## 架构

**模板（Pug，`layout/`）** —— 顶层视图（`index/post/page/archive/tag/category.pug`）都 `extends includes/layout.pug` 并填充 `block content`。`layout/includes/` 下：
- `head/`、`header/`（全宽磨砂顶栏导航 + 标题滚动切换）、`footer.pug`、`sidebar.pug`、`rightside.pug`、`pagination.pug`；
- `home-top.pug` —— 首页开屏模块（标语卡 + 滚动图标墙 + 分类入口 + 推荐位）；
- `mixins/`（`indexPostUI.pug` 七种首页布局、`article-sort.pug`）；
- `widget/`（侧栏卡片：作者、公告、最近文章、分类、标签、归档、系列、网站信息、TOC、广告等）；
- `page/`（按页面类型分文件：`default-page.pug` 含关于页、`flink.pug` 友链、`shuoshuo.pug` 说说、`tags.pug`、`categories.pug`、`404.pug`）；
- `third-party/`（评论、搜索、分享、聊天、数学、特效、pjax、prismjs、umami 等）；
- `loading/`（`fullpage-loading.pug` CSS 环形加载动画 / `pace.pug` 进度条，由 `preloader.source` 选择）。

**样式（Stylus，`source/css/`）** —— 设计令牌（design token）管线是理解全站外观的关键：
- `var.styl` —— Stylus 变量（单主色蓝、卡片/玻璃令牌、纯净底色、调色板；顶部有作者对设计语言的注释）。
- `_global/index.styl` —— 把上述变量映射成 `:root` 下的 CSS 自定义属性（如 `--glass-bg`、`--card-bg`、`--global-bg`、`--card-radius`）。
- `_mode/darkmode.styl` —— 在 `[data-theme='dark']` 下覆盖同一批自定义属性。
- `_global/function.styl` —— **`.cardHover`** 是核心玻璃卡片样式（被文章卡、侧栏卡、分页、标签药丸等 `@extend`）。改这里的玻璃观感会全站传播。也存放共享 mixin / 动画。
- `_layout/`（head/aside/footer/post/pagination…）、`_page/`（homepage/hometop/tags/categories…）、`_tags/`、`_search/`、`_highlight/`（highlight.js 与 prismjs 主题）、`_third-party/`。入口 `index.styl` 用 glob 导入各目录。

**客户端 JS（`source/js/`）**
- `main.js` —— 顶栏导航、深色模式、懒加载初始化、右下角工具、滚动、标题滚动切换等。
- `utils.js` —— `btf` 工具函数集合。
- `bg3d.js` —— three.js 漂浮玻璃碎片 3D 背景（深浅色自适应、鼠标视差、滚动漂移、移动端默认关闭、尊重 `prefers-reduced-motion`）。
- `rightmenu.js` —— 自定义右键菜单（导航 / 情境复制 / 随机文章 / 昼夜切换；Ctrl+右键回退系统菜单）。
- `tw_cn.js` —— 简繁转换。
- `search/`（`algolia.js`、`local-search.js`）。

**Hexo 插件脚本（`scripts/`）**
- `common/` —— `default_config.js`（默认配置）、`postDesc.js`（文章摘要生成）。
- `events/` —— `init.js`（校验 Hexo 版本 + 合并配置 + 处理评论配置）、`cdn.js`（按 `plugins.yml` 拼装内部 / 第三方资源 URL）、`stylus.js`（向 Stylus 注入高亮相关变量）、`rightmenu_data.js`（生成右键菜单的随机文章数据 `rightmenu-posts.json`）、`404.js`、`welcome.js`。
- `filters/` —— `post_lazyload.js`（把 `<img>` 改写成 `data-lazy-src`）、`random_cover.js`（为无封面文章从 `cover.random_cover_dir` 随机取图，带防重复）。
- `helpers/` —— `page.js`（含 `cloudTags`、`shuoshuoFN`、页面类型判断等）、`related_post.js`、`aside_archives.js`、`aside_categories.js`、`getArchiveLength.js`、`series.js`、`inject_head_js.js`（注入深色模式 / 早期脚本）。
- `tag/` —— Markdown 标签插件：`note`、`tabs`、`timeline`、`button`、`gallery`、`hide`、`inlineImg`、`label`、`mermaid`、`chartjs`、`score`、`series`、`flink`。
- `plugins.yml` —— 把第三方库映射到 CDN 文件，供 `cdn.js` 使用。

## 易错点 / 约定

- **`page.pug` 共享作用域：** 它用 `case page.type` / `when` 分派页面类型并 `include` 各 `includes/page/*.pug`。Pug 把 `case` 编译成 `switch`，所以所有页面分文件顶层的 `-` 代码块**共享同一个作用域**——顶层 `const`/`let` 命名**必须跨页面分文件唯一**（如 tags.pug 的 `tagPalette` vs categories.pug 的 `palette`）。重名会触发 Pug 误导性的 `Error parsing body of the with expression`。
- **Pug 属性表达式**保持简单——优先在 `-` 块里预算好字符串再引用变量（`style=st`），别在属性里写复杂模板字面量。
- **grep `public/css/index.css` 时它不是压缩格式**（有空格 / 换行），写匹配模式时要考虑这点。
- **不要重命名**外部包名 `butterfly-extsrc`（在 `plugins.yml`）和 `hexo-butterfly-extjs`（在 `_config.yml` 注释里）——它们是真实存在、用于 CDN / 本地第三方脚本的 npm 包。
- **Apache-2.0 署名：** 本主题是 Butterfly 的 fork，需保留 `README.md` 里的原作者致谢，以及 `scripts/tag/note.js` / `tabs.js` 里的 `Modify by Jerry` 注释。

## 可选站点插件（装在博客，不装在这里）

必装：`hexo-renderer-pug`、`hexo-renderer-stylus`。可选：`hexo-wordcount`（字数 / 阅读时长，还需 `wordcount.enable: true`）、`hexo-generator-searchdb`（本地搜索）、`hexo-butterfly-extjs`（仅当第三方 CDN 设为 `local` 时）。详见 README 与文档站。
