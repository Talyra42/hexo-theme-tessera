# 配置字段参考

本页按 `_config.yml` 的结构速查所有配置项。请把要修改的字段写进站点根目录的 `_config.tessera.yml`（参见[配置文件分层](/guide/getting-started#config-layering)）。带链接的字段在指南中有更详细的说明。

::: tip
留空 / 注释掉的字段会回退到主题内置默认值（`scripts/common/default_config.js`）。这里给出的是默认值。
:::

## 导航 nav / menu / social

详见[导航与菜单](/guide/navigation)。

```yaml
nav:
  logo: /img/tessera-logo.svg
  display_title: true
  display_post_title: true
  fixed: false
menu:        # 见「导航与菜单」
social:      # 见「导航与菜单」
```

## 代码块 code_blocks

详见[外观与特效 · 代码块](/guide/appearance#代码块-code-blocks)。

## 图片 {#image}

```yaml
favicon: /img/tessera-logo.svg
avatar:
  img: /img/tessera-logo.svg
  effect: false          # 头像是否旋转
footer_img: false         # 页脚背景图（图片路径，false 为不使用）
background:                # 网站背景：颜色 / 图片 URL / 数组（随机）
cover:                     # 文章封面与随机封面，见「首页」
  index_enable: true
  aside_enable: true
  archives_enable: true
  default_cover:
  random_cover_dir: img/cover
error_img:
  flink: /img/friend_404.gif    # 友链 / 头像加载失败的回退图
  post_page: /img/404.jpg       # 文章封面加载失败的回退图
error_404:
  enable: true            # 默认开启，生成 404.html
  subtitle: 'Page Not Found'
  background: /img/error-page.png
```

> 封面与随机封面详见[首页 · 封面](/guide/homepage#封面与随机封面-cover)。`error_404` 配合 [404 页面](/guide/pages#page-404)使用。

## 文章元信息 post_meta

详见[文章 · 元信息](/guide/post#文章元信息-post-meta)。

## 首页 index

```yaml
index_layout: 6             # 首页布局 1~7，见「首页」
index_post_content:
  method: 3
  length: 500
home_top:                   # 首页开屏模块，默认开启，见「首页」
  enable: true
```

> 详见[首页](/guide/homepage)。

## 文章 post

详见[文章](/guide/post)。

```yaml
toc: { post: true, page: false, number: true, expand: false, style_simple: false, scroll_percent: true }
post_copyright: { enable: true, decode: true, author_href:, license: CC BY-NC-SA 4.0, license_url: ... }
reward: { enable: false, text:, QR_code: }
post_edit: { enable: false, url: }
related_post: { enable: true, limit: 6, date_type: created }
post_pagination: 1
noticeOutdate: { enable: false, style: flat, limit_day: 365, position: top, ... }
anchor: { auto_update: false, click_to_scroll: false }
```

## 页脚 footer {#footer}

```yaml
footer:
  nav:                  # 页脚导航（可选）
  owner:
    enable: true
    since: 2025         # 建站年份
  copyright:
    enable: true        # 显示主题 / 框架版权
    version: true       # 显示版本号
  custom_text:          # 自定义页脚文字（HTML）
```

## 侧边栏 aside

详见[侧边栏](/guide/sidebar)。

## 右下角按钮

```yaml
rightside_bottom:               # 按钮距底部距离（默认 px）
rightside_scroll_percent: false # 返回顶部按钮显示滚动百分比
rightside_config_animation: true
rightside_item_order:           # 自定义按钮顺序（进阶，谨慎修改）
  enable: false
  hide:
  show:
```

## 简繁转换 translate

```yaml
translate:
  enable: false
  default: 繁
  defaultEncoding: 2      # 站点语言：1 繁体 / 2 简体
  translateDelay: 0
  msgToTraditionalChinese: '繁'
  msgToSimplifiedChinese: '簡'
```

## 深色模式 darkmode

详见[外观与特效 · 深色模式](/guide/appearance#深色模式-darkmode)。

## 全局 global

```yaml
photofigcaption: false    # 图片下方显示 alt 作为说明
copy:
  enable: true            # 允许复制
  copyright:
    enable: false         # 复制时追加版权信息
    limit_count: 150      # 超过多少字才追加
wordcount:                # 见下方 #wordcount
busuanzi:                 # 不蒜子统计，见「统计与分析」
  site_uv: true
  site_pv: true
  page_pv: true
```

### wordcount {#wordcount}

需安装 `hexo-wordcount` 插件。

```yaml
wordcount:
  enable: false
  post_wordcount: true    # 文章元信息显示字数
  min2read: true          # 显示预计阅读时间
  total_wordcount: true   # 网站信息卡显示总字数
```

## 数学公式 math

详见[外观](/guide/appearance)与下表。

```yaml
math:
  use:                    # mathjax / katex，留空不启用
  per_page: true          # true 每页加载；false 按文章 front-matter
  hide_scrollbar: false
  mathjax: { enableMenu: true, tags: none }
  katex: { copy_tex: false }
```

## 搜索 search

详见[搜索](/advanced/search)。

## 分享 share

```yaml
share:
  use: sharejs            # sharejs / addtoany，留空不启用
  sharejs:
    sites: facebook,x,wechat,weibo,qq
  addtoany:
    item: facebook,x,wechat,sina_weibo,facebook_messenger,email,copy_link
```

## 评论 comments

详见[评论](/advanced/comments)。

## 聊天 chat

```yaml
chat:
  use:                    # chatra / tidio / crisp，留空不启用
  rightside_button: false
  button_hide_show: false
# 各服务的 id / key 见对应小节
```

## 统计与分析 / 广告 / 验证

详见[统计与分析](/advanced/analytics)。

## 美化 / 特效 {#beautify}

```yaml
category_ui:              # 分类归档页 UI：index（同首页）/ default（同归档）
tag_ui:                   # 标签归档页 UI：同上
rounded_corners_ui: true
text_align_justify: false
mask: { header: true, footer: true }
preloader: { enable: true, source: 1, pace_css_url: }
enter_transitions: false
display_mode: light       # 初始模式：light / dark
beautify:                 # 正文标题美化
  enable: false
  field: post             # site / post
  title_prefix_icon:
  title_prefix_icon_color:
font: { global_font_size:, code_font_size:, font_family:, code_font_family: }
blog_title_font: { font_link:, font_family: }
hr_icon: { enable: true, icon:, icon_top: }
theme_color:              # 自定义配色（颜色值需双引号），见「外观」
```

各类特效（`activate_power_mode` / `canvas_ribbon` / `canvas_fluttering_ribbon` / `canvas_nest` / `fireworks` / `click_heart` / `clickShowText` / `bg_3d` / `rightmenu` / `home_top`）详见[外观与特效](/guide/appearance)。

## 图片预览 / 灯箱 lightbox

```yaml
lightbox:                 # 留空=内置图片预览（点击全屏 + 缩放）；也可填 fancybox / medium_zoom
```

## 标签插件设置 {#tag-plugins}

这些是[标签插件](/guide/tag-plugins)的全局开关与默认值。

```yaml
series:                   # series 标签 / 系列卡
  enable: false
  orderBy: title
  order: 1
  number: true
abcjs:                    # score 乐谱
  enable: false
  per_page: true
mermaid:
  enable: false
  code_write: false       # 是否允许用代码块写 mermaid
  theme: { light: default, dark: dark }
  open_in_new_tab: true
  zoom_pan: true
chartjs:
  enable: false
  fontColor: { light: ..., dark: ... }
  borderColor: { light: ..., dark: ... }
  scale_ticks_backdropColor: { light: transparent, dark: transparent }
note:                     # note 提示框默认样式
  style: flat             # simple / modern / flat / disabled
  icons: true
  border_radius: 3
  light_bg_offset: 0
```

## 其它 other

```yaml
pjax:
  enable: true            # 无刷新跳页
  exclude:                # 排除的页面路径
aplayerInject:
  enable: false           # 注入 aplayer / meting 音乐播放器
  per_page: true
snackbar:
  enable: false
  position: bottom-left
  bg_light: '#49b1f5'
  bg_dark: '#1f1f1f'
instantpage: false        # Instant.page 预加载
lazyload:
  enable: true
  native: false           # 用浏览器原生懒加载
  field: site             # site / post
  placeholder:
  blur: true
pwa:                      # 渐进式网页应用
  enable: false
  manifest:
  apple_touch_icon:
  favicon_32_32:
  favicon_16_16:
  mask_icon:
Open_Graph_meta: { enable: true, option: }
structured_data: { enable: false, alternate_name: }
css_prefix: true          # 自动加浏览器前缀
inject:                   # 注入自定义 head / body 代码，见「CDN 与注入」
  head:
  bottom:
CDN:                      # 资源 CDN，见「CDN 与注入」
```

> Pjax、注入、PWA、CDN 等详见 [CDN 与注入](/advanced/cdn)。
