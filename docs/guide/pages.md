# 特色页面

除了普通文章页，Tessera 通过页面 front-matter 的 `type` 字段提供多种特色页面：关于、友链、说说、标签墙、分类墙、404。

创建页面用 `hexo new page <name>`，然后在生成的 `source/<name>/index.md` 里设置 `type`。

| `type` | 页面 | 说明 |
| --- | --- | --- |
| `about` | 关于页 | 开放式个人主页布局 |
| `link` | 友链页 | 友情链接卡片墙 |
| `shuoshuo` | 说说页 | 短动态 / 即刻流 |
| `tags` | 标签墙 | 全站标签云 |
| `categories` | 分类墙 | 全站分类列表 |
| `404` | 404 页 | 错误页 |

## 关于页 {#about}

把页面 `type` 设为 `about`，即采用**开放式个人主页布局**：自动隐去外层卡片，正文上方渲染一个个人信息区（头像、名字、技能标签、社交图标）与无边框数据栏，正文以居中阅读宽度直接呈现。建议同时设置 `aside: false` 让关于内容独占整页。

`about` 各字段均为可选，按需填写；正文照常用 Markdown 书写。

```yaml
---
title: 关于
date: 2026-01-01
type: about          # 关键：启用关于页布局
aside: false         # 隐藏右侧栏，关于内容独占整页
about:
  avatar: /img/avatar.png
  tip: 你好，很高兴遇见你 👋
  name: Talyra42
  description: 学习者 · 思考者 · 折腾爱好者
  skills: [JavaScript, Node.js, Hexo, Stylus, 设计]
  # social：键为标题，值为「链接 || Font Awesome 图标类」
  social:
    GitHub: https://github.com/xxx || fab fa-github
    Email: mailto:you@example.com || fas fa-envelope
  # stats：「名称 || 数值」，渲染为无边框数据栏（数值大号在上，名称在下）
  stats:
    - 建站于 || 2026
    - 状态 || 持续更新
    - 坐标 || 中国
---

这里继续写普通 Markdown 正文……
```

| 字段 | 说明 |
| --- | --- |
| `avatar` | 头像图片；加载失败时回退到 `error_img.flink` |
| `tip` | 头像上方的一句问候 |
| `name` | 显示名（缺省用站点 `author`） |
| `description` | 个人简介 |
| `skills` | 技能标签数组，渲染成一排 pill |
| `social` | 对象，键为标题、值为 `链接 \|\| 图标类`；图标省略时显示标题文字 |
| `stats` | 数组，每项 `名称 \|\| 数值`，渲染为无边框数据栏 |

## 友链页 {#flink}

把 `type` 设为 `link`。友链数据有两种来源：

### 来源一：站点 `_data/link.yml`（推荐）

在**博客根目录**新建 `source/_data/link.yml`：

```yaml
- class_name: 朋友们          # 分组标题（可选）
  class_desc: 这些是我的好朋友  # 分组描述（可选）
  link_list:
    - name: 示例博客
      link: https://example.com
      avatar: https://example.com/avatar.png
      descr: 一句话介绍
    - name: 另一个朋友
      link: https://another.com
      avatar: https://another.com/avatar.png
      descr: 设计 / 摄影
- class_name: 同学
  link_list:
    - name: 同学甲
      link: https://classmate.dev
      avatar: https://classmate.dev/me.png
      descr: 后端开发
```

页面文件（可在正文里补充说明文字，会显示在卡片下方）：

```yaml
---
title: 友情链接
type: link
---

欢迎交换友链，留言格式见下方……
```

### 来源二：外部 JSON `flink_url`

把友链数据托管成一个 JSON 文件，在 front-matter 指定 `flink_url`，页面会在客户端 `fetch` 它并渲染（结构同上）：

```yaml
---
title: 友情链接
type: link
flink_url: /api/links.json   # 也可以是完整外部 URL
random: true                  # 是否打乱链接顺序
---
```

::: tip random 行为
当配置了 `flink_url` 或 `random: true` 时，走客户端渲染分支；**只要 `random` 不等于 `true`，每组内的链接顺序都会被随机打乱**（用 `random: true` 反而保持原顺序——这是当前实现的特性，留意一下）。头像加载失败统一回退到 `error_img.flink`。
:::

字段含义：

| 字段 | 说明 |
| --- | --- |
| `class_name` | 分组标题，渲染成带锚点的二级标题 |
| `class_desc` | 分组描述 |
| `link_list[].name` | 站点名 |
| `link_list[].link` | 站点链接 |
| `link_list[].avatar` | 头像 |
| `link_list[].descr` | 一句话描述 |

也可以用 [`flink` 标签插件](/guide/tag-plugins#flink) 在任意文章里内联渲染友链卡片。

## 说说页 {#shuoshuo}

把 `type` 设为 `shuoshuo`，得到一个分页的短动态流（每页 8 条），每条可单独开关评论。

### 数据来源：`_data/shuoshuo.yml`

在 `source/_data/shuoshuo.yml` 写：

```yaml
- date: 2026-06-01 12:00:00      # 必填，发布时间
  content: |                      # 必填，支持 Markdown
    今天写了一个 Hexo 主题文档站，很有成就感！
  author: Talyra42               # 可选，缺省用站点 author
  avatar: /img/avatar.png        # 可选，缺省用主题 avatar
  tags: [日常, 折腾]              # 可选，标签
  key: shuo-2026-06-01           # 可选，设置后该条可单独加载评论
- date: 2026-05-20
  content: 简单的一句话也可以。
```

页面文件：

```yaml
---
title: 说说
type: shuoshuo
comments: true        # 是否允许逐条加载评论（需已配置评论系统）
limit:                # 可选：限制显示条数
  type: num           # num（按数量）/ date（按日期）
  value: 50           # type 为 num 时是条数；为 date 时是起始日期，如 2026-01-01
---
```

| 字段 | 说明 |
| --- | --- |
| `date` | 发布时间（必填，按时间倒序排列） |
| `content` | 内容（必填，Markdown） |
| `author` / `avatar` | 作者名 / 头像（可选） |
| `tags` | 标签数组（可选） |
| `key` | 评论分区键；设置且页面 `comments` 开启时，该条出现评论按钮 |

同样支持 `shuoshuo_url` 指向外部 JSON（结构相同），此时不读 `_data/shuoshuo.yml`。

## 标签墙 {#tags}

`type: tags`，渲染全站标签云，标签按文章数从多到少排列，并循环套用一组配色。

```yaml
---
title: 标签
type: tags
---
```

## 分类墙 {#categories}

`type: categories`，用 Hexo 内置的 `list_categories` 渲染全站分类列表。

```yaml
---
title: 分类
type: categories
---
```

::: tip 与归档页 UI 的区别
这里的标签墙 / 分类墙是「汇总页」。点进某个具体标签 / 分类后看到的**归档列表页**，其外观由 [`tag_ui` / `category_ui`](/config/reference#beautify) 控制（`index` = 同首页卡片样式，`default` = 同归档页样式）。
:::

## 404 页 {#page-404}

404 页用 [`error_404`](/config/reference) 配置渲染（背景图、副标题）。`error_404.enable` **默认开启**，主题会自动生成 `404.html`，**你通常不需要手动建页面**——本地用 `hexo server` 时访问不存在的路径会自动回退到它，部署到 GitHub Pages / Netlify 等静态托管时也会自动展示。

```yaml
error_404:
  enable: true
  subtitle: '页面未找到'
  background: /img/error-page.png
```

如果想自定义 404 页的正文内容，也可以手动建一个 `type: 404` 的页面：

```yaml
---
title: 404
type: 404
---
```
