# 首页

首页包含可选的**开屏模块**、**文章卡片列表**，以及每篇文章的**封面**。

## 文章卡片布局 `index_layout`

控制首页文章卡片的排布方式：

```yaml
index_layout: 6
```

| 值 | 布局 |
| --- | --- |
| `1` | 横向卡片：封面在左，信息在右 |
| `2` | 横向卡片：封面在右，信息在左 |
| `3` | 横向卡片：封面左右交替 |
| `4` | 纵向卡片：封面在上，信息在下 |
| `5` | 纵向卡片：信息叠在封面上（毛玻璃遮罩） |
| `6` | **等高 CSS 网格**：两列，封面在上、信息在下，同行卡片自动等高（默认） |
| `7` | **JS 瀑布流**：信息叠在封面上 |

::: tip 实现说明
布局差异主要由 Stylus 在**编译期**根据 `index_layout` 的值生成不同样式，因此**修改 `index_layout` 后务必 `hexo clean` 再重新生成**才会生效。布局 `6` 是等高网格（早期为瀑布流，现已改为更稳定的 CSS Grid），只有布局 `7` 仍使用 JavaScript 瀑布流排版。
:::

## 文章摘要 `index_post_content`

控制首页卡片显示的文章简介来源：

```yaml
index_post_content:
  method: 3
  length: 500
```

| `method` | 含义 |
| --- | --- |
| `1` | 使用 front-matter 的 `description` |
| `2` | 优先 `description`，没有则用自动截取的摘要 |
| `3` | 始终使用自动截取的摘要（默认） |
| `false` | 不显示简介 |

`length` 为 `method` 为 `2` / `3` 时自动摘要的截断长度（字符数）。

## 封面与随机封面 `cover`

未在文章 front-matter 设置 `cover` 时，主题可以从一个目录里**随机**取一张图作为封面。

```yaml
cover:
  index_enable: true       # 首页卡片是否显示封面
  aside_enable: true       # 侧栏卡片是否显示封面
  archives_enable: true    # 归档页是否显示封面
  default_cover:           # 兜底封面（数组则随机取一张）
    # - /img/default1.jpg
  random_cover_dir: img/cover
```

- **`random_cover_dir`** —— 随机封面目录，是**站点 `source/` 下的相对路径**。例如 `img/cover` 对应 `<博客根目录>/source/img/cover/`。把图片丢进该目录即可：未设置 `cover` 的文章会从中随机取一张，**优先级高于 `default_cover`**。
- 随机算法带防重复机制（避免相邻文章撞同一张图）。
- 在文章 front-matter 写 `cover: false` 可显式禁用该文章封面。
- 支持的图片格式：`png` / `jpg` / `jpeg` / `gif` / `svg` / `webp` / `avif`。

单篇文章手动指定封面：

```yaml
---
title: 我的文章
cover: /img/my-cover.jpg
---
```

## 首页开屏模块 `home_top`

仿安知鱼风格的首页开屏区，**仅在首页第一页**顶部显示：左侧是标语卡 + 双行反向滚动的图标墙 + 分类入口卡，右侧是一个推荐位横幅。

```yaml
home_top:
  enable: true
  title: 生活明朗
  subTitle: 万物可爱。
  siteText: TESSERA
  # 图标墙：奇偶项自动分成两行，反向无限滚动
  icons:
    - icon: fab fa-js
      color: "#f0db4f"
    - icon: fab fa-react
      color: "#61dafb"
    # …更多
  # 分类入口：建议 2-3 个；color 支持渐变
  category:
    - name: 技术
      path: /categories/
      icon: fas fa-dove
      color: "linear-gradient(120deg, #425AEF, #7a8eff)"
  # 推荐位横幅：image 不填则使用主题色渐变兜底
  banner:
    enable: true
    tips: 主题
    title: Hexo Theme Tessera
    image:
    link: /
    button: 更多推荐
```

| 字段 | 说明 |
| --- | --- |
| `enable` | 是否显示开屏模块 |
| `title` / `subTitle` | 左侧标语卡的主 / 副标题 |
| `siteText` | 标语卡上的小号大写标识 |
| `icons[]` | 图标墙，每项 `{ icon: Font Awesome 类, color: 底色 }`；奇偶项自动分成两行，反向滚动 |
| `category[]` | 分类入口卡，每项 `{ name, path, icon, color }`，`color` 支持渐变 |
| `banner` | 右侧推荐位 `{ enable, tips, title, image, link, button }`；`image` 留空时用主题色渐变兜底 |

::: tip 默认值提示
`home_top.enable` 默认**开启**，并自带一套示例数据（标语、图标墙、分类、推荐位）。请在 `_config.tessera.yml` 中替换成你自己的内容；若不需要开屏模块，把它设为 `false` 即可。
:::

## 文章封面的呈现方式

Tessera **不使用** Butterfly 式的顶部全幅横幅（banner）。文章封面统一以**磨砂玻璃卡片**的形式展示在文章顶部（见 [post.pug](https://github.com/LumiDesk/hexo-theme-tessera/blob/main/layout/post.pug) 的 `.post-top`），这是主题的设计语言，不可切换为全幅横幅。封面来源（手动 / 随机 / 兜底）见上文 [封面与随机封面](#封面与随机封面-cover)。
