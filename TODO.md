# TODO / 已知问题

> 本文件记录代码审阅过程中发现的遗留代码、潜在 bug 与配置不一致，供维护者（Talyra42）决策处理。
> 最近一次梳理：2026-06-11。

## 已解决

- [x] **`home_top` 默认值漂移。** 已统一为**默认开启**（`default_config.js` 与 `_config.yml` 均 `enable: true`，开箱即用展示开屏示例），文档同步更新（2026-06-11）。

- [x] **仓库 / 作者标识混用。** 已统一为 `LumiDesk/hexo-theme-tessera`：修正了 `footer.pug` 的主题链接、`_config.yml` 顶部注释链接、`README.md` 徽章。作者名仍为 Talyra42（正确）。`_config.yml` 顶部文档链接暂指向 GitHub 仓库，待文档站部署后可改为站点 URL。

- [x] **「Tessera 魔方」加载动画在代码中不存在。** 旧 README 宣称的「零依赖软件渲染 Tessera 魔方」全仓库无实现；实际 preloader 是 `loading/fullpage-loading.pug` 的 **CSS 环形加载动画**。新 README 已删除该不实描述。

- [x] **顶部全幅 banner 模式已彻底移除。** 应维护者要求，移除 Butterfly 式全幅顶部横幅（`disable_top_img: false` 那套），主题统一采用卡片式封面。涉及改动：精简 `header/index.pug`（仅留 Dock 导航 + SEO 标题）、删除 `third-party/subtitle.pug`、清理 `additional-js.pug` 的 subtitle 加载、`main.js` 的 `scrollDownInIndex`、`page.pug` / `layout.pug` 的 banner 变量引用、`404.pug` 的 `default_top_img` 引用；移除配置 `disable_top_img` / `default_top_img` / `index_img` / `archive_img` / `tag_img` / `tag_per_img` / `category_img` / `category_per_img` / `index_site_info_top` / `index_top_img_height` / `subtitle`；清理 `head.styl` / `var.styl` / `common.styl` / `function.styl` / `_global/index.styl` 中的死 banner CSS（`full_page` / `#site-info` / `#site-subtitle` / `#scroll-down` 等）。文档同步更新。**待维护者在博客实机验证编译与显示。**

## 待办

- [x] **`_config.yml` 注释中文化。** 已把主题 `_config.yml` 的英文注释逐节翻译为中文（仅改注释，键/值/结构与 CRLF 行尾保持不变），并校正了 `index_layout` 中过时的布局 6/7 描述。`languages/` 按维护者决定保留（界面文案多语言翻译，被 115 处模板依赖，不可删）。

- [ ] **`languages/` 新功能 key 完整性。** 七套语言文件（default/en/ja/ko/zh-CN/zh-HK/zh-TW）。重构新增的功能（首页开屏、右键菜单、说说页等）若引入新文案 key，需确认各语言文件是否补齐，避免缺 key 回退到默认。

## 文档建设（进行中）

- [ ] **持续维护 VitePress 文档站（`docs/`）。** 首版已覆盖配置字段、页面用法、标签插件、进阶功能。后续每次改配置 / 功能 / 页面都要回来同步（见 `CLAUDE.md` 顶部规则）。
