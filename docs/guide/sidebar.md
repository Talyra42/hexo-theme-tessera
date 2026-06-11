# 侧边栏

侧边栏（aside）由若干玻璃卡片组成。所有配置都在 `aside` 节点下。

## 总开关

```yaml
aside:
  enable: true       # 是否启用侧栏
  hide: false        # 默认是否隐藏（可由右下角按钮切换）
  button: true       # 是否在右下角显示「隐藏侧栏」按钮
  mobile: true       # 移动端是否显示侧栏
  position: right    # 侧栏位置：left / right
  display:
    archive: true    # 在归档页显示侧栏
    tag: true        # 在标签归档页显示侧栏
    category: true   # 在分类归档页显示侧栏
```

## 卡片排序 `sort_order`

部分卡片支持 `sort_order` 字段（数字），它会被编译成 CSS `order` 来调整卡片的显示顺序，数字越小越靠前。支持的卡片：`card_recent_post`、`card_newest_comments`、`card_categories`、`card_tags`、`card_archives`、`card_webinfo`。

```yaml
aside:
  card_categories:
    sort_order: 1
  card_tags:
    sort_order: 2
```

::: tip
`sort_order` 通过 Stylus 在编译期生成，**修改后需 `hexo clean` 重新生成**。文章页与普通页的卡片基础顺序（作者卡、公告、TOC 等）在模板中固定，`sort_order` 用于微调其中可排序的几张卡。
:::

## 作者卡 `card_author`

显示头像、站点描述、社交图标和一个关注按钮。头像取自 [`avatar.img`](/config/reference#image)，社交图标取自顶层的 [`social`](/guide/navigation#社交图标-social) 配置。

```yaml
aside:
  card_author:
    enable: true
    description:              # 作者描述（留空则用站点 description）
    button:
      enable: true
      icon: fab fa-github
      text: Follow Me
      link: https://github.com/xxxxxx
```

## 公告卡 `card_announcement`

```yaml
aside:
  card_announcement:
    enable: true
    content: This is my Blog   # 支持 HTML
```

## 最近文章 `card_recent_post`

```yaml
aside:
  card_recent_post:
    enable: true
    limit: 5          # 显示数量，0 为全部
    sort: date        # date（发布）/ updated（更新）
    sort_order:
```

## 最新评论 `card_newest_comments`

需配合对应评论系统使用。

```yaml
aside:
  card_newest_comments:
    enable: false
    limit: 6
    storage: 10       # 缓存分钟数，写入 localStorage 减少请求
    avatar: true      # 是否显示评论者头像
    sort_order:
```

## 分类卡 `card_categories`

```yaml
aside:
  card_categories:
    enable: true
    limit: 8          # 显示数量，0 为全部
    expand: none      # none（不展开）/ true（展开）/ false（折叠）
    sort_order:
```

## 标签卡 `card_tags`

```yaml
aside:
  card_tags:
    enable: true
    limit: 40         # 显示数量，0 为全部
    color: false      # 是否给标签随机上色
    custom_colors:    # 自定义配色数组（设置后覆盖随机色）
    orderby: random   # 排序依据：random / name / length
    order: 1          # 1 升序 / -1 降序
    sort_order:
```

## 归档卡 `card_archives`

```yaml
aside:
  card_archives:
    enable: true
    type: monthly     # monthly（按月）/ yearly（按年）
    format: MMMM YYYY # 日期格式，如 YYYY年MM月
    order: -1         # 1 升序 / -1 降序
    limit: 8          # 显示数量，0 为全部
    sort_order:
```

## 系列卡 `card_post_series`

在文章页显示当前文章所属系列的其它文章（需文章 front-matter 设置 `series`）。

```yaml
aside:
  card_post_series:
    enable: true
    series_title: false   # 标题是否显示系列名
    orderBy: date         # date / title
    order: -1             # 1 升序 / -1 降序
```

## 网站信息卡 `card_webinfo`

```yaml
aside:
  card_webinfo:
    enable: true
    post_count: true        # 显示文章总数
    last_push_date: true    # 显示最后更新时间
    sort_order:
    runtime_date:           # 建站日期，填了才显示「已运行 N 天」，如 2025/01/01 00:00:00
```

::: tip 总字数
网站信息卡里的「总字数」需安装 `hexo-wordcount` 并开启 [`wordcount.total_wordcount: true`](/config/reference#wordcount)。
:::

## 文章目录卡（TOC）

文章页的目录卡由 [`toc`](/guide/post#目录-toc-toc) 配置控制，不在 `aside` 节点下。

## 自定义卡片 `_data/widget.yml`

你可以在博客 `source/_data/widget.yml` 中添加任意自定义卡片，分别插到侧栏**顶部**（`top`）和**底部**（`bottom`）：

```yaml
top:
  - class_name: my-card        # 卡片额外 class（可选）
    id_name: my-card           # 卡片 id（可选）
    icon: fas fa-bullhorn       # 标题图标
    name: 我的卡片              # 标题文字
    html: <p>任意 HTML 内容</p>  # 卡片正文
bottom:
  - icon: fas fa-music
    name: 听歌
    html: <div>...</div>
    order: 2                    # 仅 bottom 支持 order，调整顺序
```
