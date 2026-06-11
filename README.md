<div align="center">

<img src="./source/img/tessera-logo.svg" width="150" height="150" alt="Tessera Logo" />

# hexo-theme-tessera

一个适用于 Hexo 的现代化、美观且功能丰富的主题

![hexo version](https://img.shields.io/badge/hexo-5.3.0+-0e83cd)
![license](https://img.shields.io/github/license/Talyra42/hexo-theme-tessera?color=FF5531)
![GitHub stars](https://img.shields.io/github/stars/Talyra42/hexo-theme-tessera?style=social)

</div>

---

## 🚀 快速开始

### 💾 安装方式

在你的 Hexo 博客根目录下执行：

```bash
git clone https://github.com/Talyra42/hexo-theme-tessera.git themes/tessera
```

### ⚙️ 主题配置

1. **启用主题**：修改你的 Hexo 配置文件 `_config.yml`：

```yaml
theme: tessera
```

2. **安装必装依赖**：Tessera 使用 Pug 模板与 Stylus 样式，必须安装这两个渲染器：

```bash
npm install hexo-renderer-pug hexo-renderer-stylus --save
```

> 💡 主题的个性化配置建议放在站点根目录的 `_config.tessera.yml` 中，避免直接修改主题目录，方便后续更新。

### 📦 可选插件

以下插件按需安装，对应功能不装则不生效（但不会报错）：

| 功能 | 需要安装的插件 | 说明 |
| --- | --- | --- |
| **字数统计 / 阅读时长** | `hexo-wordcount` | 文章元信息中的字数、预计阅读时间，以及侧栏「网站信息」卡的总字数。装好后还需在配置中开启 `wordcount.enable: true` |
| **本地搜索** | `hexo-generator-searchdb` | 当 `search.use` 设为 `local_search` 时，用于生成搜索数据库（`search.xml`） |
| **本地化第三方脚本** | `hexo-butterfly-extjs` | 仅当把 `CDN.third_party_provider` 设为 `local`（不走 CDN）时才需要 |

一次性安装常用项：

```bash
npm install hexo-wordcount hexo-generator-searchdb --save
```

> ⚠️ 这些是 **Hexo 站点级插件**，必须装在博客根目录，而不是主题目录里 —— Hexo 不会自动安装主题声明的依赖。

> 🔧 改动主题样式（Stylus）后，记得先 `hexo clean` 再 `hexo g/s`：Hexo 只跟踪入口文件的改动时间，改被 `@import` 的分文件不清缓存不会生效。

## ✨ 主题特色

### 🎨 设计风格
- [x] **卡片化设计** - 现代化的卡片式布局
- [x] **圆角/直角设计** - 支持自定义边框样式
- [x] **响应式设计** - 完美适配各种屏幕尺寸
- [x] **双栏布局** - 优化的阅读体验
- [x] **深色模式** - 护眼的夜间模式
- [x] **液态玻璃导航** - 顶部 Dock 菜单/搜索为胶囊药丸样式，悬停呈现液态玻璃磨砂高光效果
- [x] **标题滚动切换** - 下滑时博客标题与文章标题垂直滚动过渡（悬停反向显示「返回首页」）
- [x] **开放式关于页** - 关于页采用无卡片的开放式个人主页布局，支持头像、技能、社交、数据等展示（见下）

### 📝 内容功能
- [x] **多级菜单** - 支持二级导航菜单
- [x] **阅读模式** - 专注的文章阅读体验
- [x] **目录导航** - 电脑和手机双端支持 TOC
- [x] **字数统计** - 显示文章字数和阅读时间
- [x] **相关文章** - 智能推荐相关内容
- [x] **过期提醒** - 自动提示文章更新状态
- [x] **简繁转换** - 支持简体中文和繁体中文切换
- [x] **标签插件** - 丰富的标签插件支持

### 🔍 搜索与导航
- [x] **多种搜索** - Algolia 搜索 / 本地搜索 / Docsearch
- [x] **内建 404** - 美观的 404 错误页面
- [x] **Pjax 支持** - 流畅的页面切换体验

### 🎨 代码展示
- [x] **语法高亮** - 内建多种主题（darker/pale night/light/ocean）
- [x] **代码功能** - 语言显示/折叠展开/复制按钮/自动换行
- [x] **数学公式** - 支持 MathJax 和 KaTeX

### 💬 社交互动
- [x] **多元评论系统** - Disqus/Gitalk/Valine/Waline/Twikoo/Giscus/Artalk 等
- [x] **双评论支持** - 可同时启用两套评论系统
- [x] **分享功能** - Sharejs/Addtoany 分享组件
- [x] **在线客服** - Chatra/Tidio/Crisp 即时聊天

### 📊 数据分析
- [x] **访问统计** - 不蒜子计数器
- [x] **网站分析** - Google Analytics/百度统计/Cloudflare Analytics/Microsoft Clarity/Umami
- [x] **站长验证** - 各大搜索引擎验证
- [x] **广告支持** - Google AdSense/自定义广告位

### 🎪 视觉效果
- [x] **Tessera 3D 背景** - three.js 漂浮玻璃碎片场，鼠标视差，深浅色自适应（主题视觉签名）
- [x] **3D 交互加载动画** - 零依赖软件渲染的 Tessera 魔方，鼠标可交互
- [x] **打字特效** - activate_power_mode 动画
- [x] **背景特效** - 静态彩带/动态彩带/飘带效果/Canvas Nest
- [x] **鼠标特效** - 烟花/爱心/文字点击效果
- [x] **加载动画** - Preloader 和 pace.js 进度条
- [x] **图片效果** - Medium Zoom/Fancybox 图片灯箱
- [x] **懒加载** - 图片延迟加载优化

### 🛠️ 进阶功能
- [x] **PWA 支持** - 渐进式网页应用
- [x] **复制保护** - 可关闭文字复制/版权信息追加
- [x] **主题定制** - 自定义网站配色方案
- [x] **图表支持** - Mermaid 流程图/Chart.js 数据图表
- [x] **音乐记谱** - ABCJS 音乐记谱法支持
- [x] **音乐播放器** - APlayer/Meting 音乐播放功能
- [x] **系列文章** - 系列文章组织功能
- [x] **Instantpage** - 页面预加载加速
- [x] **Snackbar** - 优雅的提示消息

## 🧩 页面进阶用法

### 关于页

把页面的 `type` 设为 `about`，即采用**开放式个人主页布局**：自动隐去外层卡片，正文上方渲染一个开放式的个人信息区（头像光环、名字、技能标签、社交图标）与无边框数据栏，正文则以居中阅读宽度直接呈现 —— 没有「卡片套卡片」，也没有出现动画。建议同时设置 `aside: false` 隐藏右侧栏，让关于内容独占整页。

`about:` 各字段均为可选，按需填写；正文部分照常用 Markdown 书写。

```yaml
---
title: 关于
date: 2026-01-01
type: about         # 关键：启用关于页布局
aside: false        # 隐藏右侧栏，关于内容独占整页
about:
  avatar: /img/avatar.png
  tip: 你好，很高兴遇见你 👋
  name: Talyra42
  description: 学习者 · 思考者 · 折腾爱好者
  skills: [JavaScript, Node.js, Hexo, Stylus, 设计]
  # social：键为标题，值为「链接 || FontAwesome 图标类」
  social:
    GitHub: https://github.com/xxx || fab fa-github
    Email: mailto:you@example.com || fas fa-envelope
  # stats：「名称 || 数值」，渲染为无边框数据栏
  stats:
    - 建站于 || 2026
    - 状态 || 持续更新
    - 坐标 || 中国
---

这里继续写普通 Markdown 正文……
```

## 🛠️ 开发与发布（维护者）

仓库的 `tools/` 目录提供了两个辅助脚本，方便本地开发与版本发布：

### `tools/sync-to-blog.sh` —— 同步到本地博客

把当前主题源码（含未提交的改动）一键同步到本地 Hexo 博客的 `themes/` 目录，无需 `git pull`。脚本会**清空目标主题目录并重新复制**（自动排除 `.git`、`node_modules`、`tools`、`.github`、`.vscode`、`CLAUDE.md`）。

```bash
# 同步到默认目录（见脚本顶部 DEFAULT_TARGET）
tools/sync-to-blog.sh

# 指定目标主题目录
tools/sync-to-blog.sh /path/to/blog/themes/tessera

# 也可用环境变量指定，并跳过删除确认
TESSERA_BLOG_THEME=/path/to/blog/themes/tessera tools/sync-to-blog.sh -y
```

> 同步后记得在博客根目录执行 `hexo clean && hexo generate`（或 `hexo server`）。

### `tools/release.sh` —— 发布新版本

更新 `package.json` 版本号、提交、打 tag、推送，并用 [GitHub CLI（`gh`）](https://cli.github.com/) 创建 Release（自动生成更新说明，并附带通过 `git archive` 打包的纯净主题 zip）。

```bash
tools/release.sh          # 用 package.json 当前版本号发布
tools/release.sh patch    # 1.0.0 -> 1.0.1
tools/release.sh minor    # 1.0.0 -> 1.1.0
tools/release.sh major    # 1.0.0 -> 2.0.0
tools/release.sh 1.4.2    # 指定明确版本号
# -d/--draft 创建草稿，-y/--yes 跳过确认
```

> 前置条件：在 `main` 分支、工作区干净、已安装并登录 `gh`（`gh auth login`）。发布包中的开发文件由 `.gitattributes` 的 `export-ignore` 自动剔除。

## 💬 获取帮助与支持

- 🐛 **发现问题？** → [GitHub Issues](https://github.com/Talyra42/hexo-theme-tessera/issues)
- 💡 **有好想法？** → [GitHub Discussions](https://github.com/Talyra42/hexo-theme-tessera/discussions)

## 📄 授权条款

本项目采用 [GNU Affero 通用公共许可证 v3.0（AGPL-3.0）](LICENSE)。

简而言之：你可以自由使用、修改与再发布本主题，但任何衍生作品——**包括以网络服务形式
提供时**——都必须同样以 AGPL-3.0 开源发布。允许商业使用，但须遵守同样的开源义务。

## 🙏 致敬与感谢

Tessera 基于 Jerry（CrazyWong）的 [hexo-theme-butterfly](https://github.com/jerryc127/hexo-theme-butterfly)
开发，原项目采用 Apache License 2.0 授权；而 Butterfly 又是基于
[hexo-theme-melody](https://github.com/Molunerfinn/hexo-theme-melody) 开发。
衷心感谢原作者们的精彩创作，为本主题提供了坚实的基础。

---

<div align="center">

**✨ 如果这个主题对你有帮助，请给我们一个 ⭐ Star！✨**
</div>
