# 开始使用

本页帮助你在 Hexo 博客中安装并启用 Tessera 主题，并了解配置文件的工作方式。

## 环境要求

- **Hexo ≥ 5.3.0**（低于此版本主题会在生成时报错）
- **必装渲染器**：`hexo-renderer-pug`、`hexo-renderer-stylus`

Tessera 的模板用 [Pug](https://pugjs.org/) 编写、样式用 [Stylus](https://stylus-lang.com/) 编写，这两个渲染器在博客执行 `hexo generate` 时负责把它们编译成 HTML / CSS。

## 安装

在你的 Hexo 博客根目录下，把主题克隆到 `themes/tessera`：

```bash
git clone https://github.com/LumiDesk/hexo-theme-tessera.git themes/tessera
```

也可以从 [GitHub Releases](https://github.com/LumiDesk/hexo-theme-tessera/releases) 下载发布包解压到 `themes/tessera`。

## 启用主题

修改**站点根目录**的 `_config.yml`（不是主题里的那个）：

```yaml
theme: tessera
```

安装必装的渲染器依赖（装在博客根目录）：

```bash
npm install hexo-renderer-pug hexo-renderer-stylus --save
```

然后即可正常生成 / 预览：

```bash
hexo clean && hexo generate   # 或 hexo server
```

## 配置文件分层 {#config-layering}

::: tip 核心概念
请把主题配置写在站点根目录的 **`_config.tessera.yml`** 里，而不是直接改主题目录中的 `_config.yml`。这样升级主题时不会丢失你的配置。
:::

主题配置按以下顺序解析，**后者覆盖前者**：

1. **主题内置默认值**（`scripts/common/default_config.js`）—— 真正的默认值来源，你不需要也不应该改它。
2. **主题的 `_config.yml`** —— 带注释、对外文档化的配置，镜像了默认值。
3. **站点根目录的 `_config.tessera.yml`** —— 你的个性化覆盖。文件名规则是 `_config.<主题目录名>.yml`，主题目录叫 `tessera`，所以是 `_config.tessera.yml`。

你只需要在 `_config.tessera.yml` 里写**想要修改的字段**，其余字段会自动回退到默认值。

::: warning 已废弃
旧版把配置放在 `_data/tessera.yml` 的做法已废弃，主题检测到会直接报错，请改用根目录的 `_config.tessera.yml`。
:::

## 站点语言

主题界面文案（按钮、提示等）跟随**站点** `_config.yml` 的 `language` 字段。内置语言：`default`、`en`、`zh-CN`、`zh-HK`、`zh-TW`、`ja`、`ko`。例如：

```yaml
# 站点 _config.yml
language: zh-CN
```

## 可选插件

以下插件按需安装，**对应功能不装则不生效，但不会报错**。注意它们都是 **Hexo 站点级插件，必须装在博客根目录**，而不是主题目录里 —— Hexo 不会自动安装主题声明的依赖。

| 功能 | 需要安装的插件 | 说明 |
| --- | --- | --- |
| 字数统计 / 阅读时长 | `hexo-wordcount` | 文章元信息的字数、预计阅读时间，以及侧栏「网站信息」的总字数。装好后还需在配置开启 [`wordcount.enable: true`](/config/reference#wordcount) |
| 本地搜索 | `hexo-generator-searchdb` | 当 [`search.use`](/advanced/search) 设为 `local_search` 时，用于生成搜索数据库 `search.xml` |
| 本地化第三方脚本 | `hexo-butterfly-extjs` | 仅当把 [`CDN.third_party_provider`](/advanced/cdn) 设为 `local`（不走 CDN）时才需要 |

一次性安装常用项：

```bash
npm install hexo-wordcount hexo-generator-searchdb --save
```

## 常见陷阱

::: warning 改完样式记得先 hexo clean
如果你修改了主题的 Stylus 文件，**务必先 `hexo clean` 再生成**。Hexo 只跟踪样式入口文件的修改时间，被 `@import` 的分文件改了不清缓存不会重新编译。
:::

## 下一步

- [导航与菜单](/guide/navigation) —— 配置 Dock 导航、菜单与社交图标
- [首页](/guide/homepage) —— 首页布局、开屏模块、封面
- [配置字段参考](/config/reference) —— 全部配置项速查
