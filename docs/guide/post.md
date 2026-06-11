# 文章

文章页相关的配置，包括目录、元信息、版权、相关文章、分页、过期提醒、打赏等。

## 目录 TOC `toc`

电脑端在侧栏、移动端在右下角工具中显示文章目录。

```yaml
toc:
  post: true            # 文章页是否显示 TOC
  page: false           # 普通页面是否显示 TOC
  number: true          # 是否为标题自动编号
  expand: false         # 是否默认展开全部层级
  style_simple: false   # 简洁样式（仅文章）
  scroll_percent: true  # 是否显示阅读进度百分比
```

## 文章元信息 `post_meta`

分别控制**首页卡片**（`page`）与**文章页**（`post`）显示哪些元信息。

```yaml
post_meta:
  page:                 # 首页卡片
    date_type: created  # created / updated / both
    date_format: date   # date / relative（相对时间，如「3 天前」）
    categories: true
    tags: false
    label: true         # 是否显示「发表于 / 更新于」等文字标签
  post:                 # 文章页
    position: left      # left / center 元信息对齐
    date_type: both
    date_format: date
    categories: true
    tags: true
    label: true
```

## 版权声明 `post_copyright`

在文章末尾追加版权声明区块。

```yaml
post_copyright:
  enable: true
  decode: false                        # 是否对 URL 解码显示
  author_href:                         # 作者链接（留空用站点地址）
  license: CC BY-NC-SA 4.0
  license_url: https://creativecommons.org/licenses/by-nc-sa/4.0/
```

## 相关文章 `related_post`

根据标签 / 分类智能推荐相关文章。

```yaml
related_post:
  enable: true
  limit: 6              # 显示数量
  date_type: created    # created / updated
```

## 文章分页 `post_pagination`

文章底部「上一篇 / 下一篇」的方向。

```yaml
post_pagination: 1
```

| 值 | 含义 |
| --- | --- |
| `1` | 「下一篇」指向更旧的文章 |
| `2` | 「下一篇」指向更新的文章 |
| `false` | 关闭文章分页 |

## 过期提醒 `noticeOutdate`

当文章超过指定天数未更新时，显示一条提醒。

```yaml
noticeOutdate:
  enable: false
  style: flat           # simple / flat
  limit_day: 365        # 超过多少天算「过期」
  position: top         # top / bottom 提醒位置
  message_prev: 本文最后更新于
  message_next: 天前，其中的信息可能已经过时。
```

## 打赏 / 赞赏 `reward`

```yaml
reward:
  enable: false
  text:                 # 打赏区文字
  QR_code:
    - img: /img/wechat.jpg
      link:
      text: 微信
    - img: /img/alipay.jpg
      link:
      text: 支付宝
```

## 在线编辑 `post_edit`

在文章页显示「编辑此页」按钮，跳转到源码仓库对应文件。

```yaml
post_edit:
  enable: false
  # url 拼接为：<url> + 文章源码相对路径
  url: https://github.com/user-name/repo-name/edit/main/source/
```

## 文章 front-matter 速查

下面是文章常用的 front-matter 字段：

```yaml
---
title: 文章标题
date: 2026-01-01 12:00:00
updated: 2026-01-02 12:00:00
categories: 技术
tags: [Hexo, 前端]
cover: /img/cover.jpg     # 封面，省略则按 cover 配置随机；cover: false 关闭本文封面
description: 自定义摘要文字
comments: true            # 是否开启评论
toc: true                 # 覆盖全局 TOC 设置
series: 我的系列           # 加入某个系列（配合 series 标签）
mathjax: true             # 本文加载 MathJax（当 math.per_page: false 时）
katex: true               # 本文加载 KaTeX
---
```

更多页面级（非文章）的 front-matter 用法见[特色页面](/guide/pages)。
