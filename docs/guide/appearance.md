# 外观与特效

本页汇总主题的视觉与交互相关配置：深色模式、圆角、3D 背景、加载动画、右键菜单、鼠标 / 背景特效、字体与配色。

## 深色模式 `darkmode`

```yaml
darkmode:
  enable: true
  button: true            # 是否显示右下角切换按钮
  autoChangeMode: false   # 「跟随系统」无明确系统偏好时的回退方式
  start:                  # 浅色模式开始时间（0-24），默认 6
  end:                    # 浅色模式结束时间（0-24），默认 18
  extension_notice: true  # 检测到 Dark Reader 等改色插件时，首页顶部提示
```

### 三态切换

右下角按钮点击在 **跟随系统 → 深色 → 浅色 → 跟随系统** 三态间循环，对应图标为 ◐ / 🌙 / ☀️：

- **跟随系统**（默认）：跟随浏览器 / 操作系统的 `prefers-color-scheme`，系统配色变化时实时切换。
- **深色 / 浅色**：用户显式锁定，不再跟随系统。

选择会记忆 2 天。处于「跟随系统」时，`autoChangeMode` 决定系统**无明确偏好**时如何回退：

| 值 | 行为 |
| --- | --- |
| `1` 或 `false` | 优先跟随系统；系统无偏好时，按 18:00–6:00 切深色 |
| `2` | 忽略系统偏好，始终按时间段（默认 18:00–6:00）切深色 |

首屏的初始 `data-theme` 由 [`display_mode`](/config/reference#beautify)（`light` / `dark`）占位，随后由内联脚本按上述规则在绘制前修正，避免闪烁。深色模式下，3D 背景、玻璃卡片等都会切换配色。

### 改色插件提示

`extension_notice: true` 时，若检测到 **Dark Reader** 等会覆盖站点配色的浏览器插件，首页顶部会出现一条可关闭的提示，引导用户关闭插件并改用本主题内置的深色模式。用户关闭后 30 天内不再提示。

## 圆角与排版

```yaml
rounded_corners_ui: true     # UI 元素是否使用圆角（false 为直角）
text_align_justify: false    # 正文是否两端对齐
mask:
  header: true               # 页头加遮罩
  footer: true               # 页脚加遮罩
```

## 加载动画 `preloader`

```yaml
preloader:
  enable: true
  source: 1          # 1 = 全屏环形加载动画；2 = pace 进度条
  pace_css_url:      # 自定义 pace 主题 CSS（source 为 2 时）
```

- `source: 1` —— 主题内置的**全屏环形（彗尾）加载动画**，纯 CSS、零依赖，加载完成或 7 秒超时后自动隐藏，并参与 Pjax 跳页过渡。
- `source: 2` —— 使用 [pace.js](https://codebyzach.github.io/pace/) 顶部进度条。

## Tessera 玻璃碎片背景 `bg_3d`

主题的视觉签名：基于 **Canvas 2D** 的漂浮玻璃碎片场，支持鼠标视差、滚动漂移、深浅色自适应，标签页隐藏时暂停渲染，`prefers-reduced-motion` 时只渲染静态帧。渲染限制在约 30fps，远比持续满帧的 WebGL 省电。

```yaml
bg_3d:
  enable: true
  mobile: false      # 移动端是否开启（默认关，性能考虑）
  zIndex: -1         # 画布层级
  opacity: 1         # 画布整体不透明度（0~1）
```

::: tip 零依赖
玻璃碎片背景由 Canvas 2D 绘制，**不依赖 three.js 或任何第三方库**，由主题自动注入；无需手动安装。移动端默认关闭，桌面端碎片数量更多。
:::

## 自定义右键菜单 `rightmenu`

仿安知鱼风格的玻璃质感右键菜单，事件委托实现，天然兼容 Pjax。

```yaml
rightmenu:
  enable: true
```

菜单内容：

- **顶部导航排**：后退 / 前进 / 刷新 / 回到顶部
- **情境动作**（按需出现）：选中文字时可复制 / 必应搜索；右键链接可新标签打开 / 复制链接；右键图片可查看 / 复制图片地址
- **通用动作**：随机前往一篇文章、复制本页网址、切换昼夜模式

按住 `Ctrl` 右键可呼出系统原生菜单；在输入框中右键也会回退到系统菜单。

## 加载条与进度

```yaml
rightside_scroll_percent: false   # 返回顶部按钮上是否显示滚动百分比
enter_transitions: false          # 页面进入过渡动画
```

## 鼠标点击特效

```yaml
# 烟花
fireworks:
  enable: false
  mobile: false
# 爱心
click_heart:
  enable: false
  mobile: false
# 点击冒字
clickShowText:
  enable: false
  text:
    - I
    - LOVE
    - YOU
  fontSize: 15px
  random: false
  mobile: false
# 打字机震动特效
activate_power_mode:
  enable: false
  colorful: true
  shake: true
  mobile: false
```

## 背景特效

以下背景特效互相独立，按需开启一个即可：

```yaml
# 静态彩带
canvas_ribbon:
  enable: false
  size: 150
  alpha: 0.6
  zIndex: -1
  click_to_change: false
  mobile: false
# 飘动彩带
canvas_fluttering_ribbon:
  enable: false
  mobile: false
# Canvas Nest 线条
canvas_nest:
  enable: false
  color: '0,0,255'   # 线条颜色 RGB
  opacity: 0.7
  zIndex: -1
  count: 99
  mobile: false
```

::: warning 注意
背景特效（彩带 / Canvas Nest）与 [3D 背景 `bg_3d`](#tessera-3d-背景-bg-3d) 都会占据背景层，通常只启用其一，避免视觉冲突与性能浪费。
:::

## 图片预览与灯箱 `lightbox`

文章正文图片支持点击全屏预览。主题内置了一个**轻量预览浮层**：留空 `lightbox` 即默认启用，无需任何第三方依赖，支持

- 点击图片全屏查看（深色磨砂背景）；
- 滚轮 / 底部工具栏按钮 **放大、缩小、还原**；
- 放大后按住拖拽平移、双击切换缩放；
- `Esc`、点击背景或关闭按钮退出。

如需更换为第三方灯箱（缩略图轮播、旋转翻转等更多功能），可指定 `fancybox` 或 `medium_zoom`（需在 CDN 中启用对应资源）：

```yaml
# 留空：使用内置图片预览（推荐）
# 也可二选一切换为第三方灯箱：fancybox / medium_zoom
lightbox:
```

> 给图片加 `no-lightbox` 或 `no-preview` 类，或把图片包进 `<a>` 链接，即可跳过预览。

::: tip 图片加载动画
正文图片在懒加载尚未完成时，会显示一段居中的 SVG 环形加载动画占位，避免「网速慢时一片空白、误以为没有图片」。该行为随懒加载（`lazyload`）自动生效，无需额外配置。
:::

## 字体与配色

```yaml
# 全局字体
font:
  global_font_size:
  code_font_size:
  font_family:
  code_font_family:
# 站点标题字体
blog_title_font:
  font_link:
  font_family:
# 分割线图标
hr_icon:
  enable: true
  icon:        # Font Awesome unicode，如 '\f0c1'
  icon_top:
```

主题配色可通过 `theme_color` 覆盖（注意颜色值必须用**双引号**包裹，否则会报错）：

```yaml
theme_color:
  enable: true
  main: "#49B1F5"
  paginator: "#00c4b6"
  button_hover: "#FF7242"
  text_selection: "#00c4b6"
  link_color: "#99a9bf"
  meta_color: "#858585"
  hr_color: "#A4D8FA"
  code_foreground: "#F47466"
  code_background: "rgba(27, 31, 35, .05)"
  toc_color: "#00c4b6"
  scrollbar_color: "#49b1f5"
  meta_theme_color_light: "#ffffff"
  meta_theme_color_dark: "#0d0d0d"
```

## 代码块 `code_blocks`

```yaml
code_blocks:
  theme: light        # 高亮主题：darker / pale night / light / ocean / false
  macStyle: false     # 是否显示 mac 风格三色圆点
  height_limit: false # 代码块最大高度（px），超出折叠
  word_wrap: false    # 是否自动换行
  copy: true          # 复制按钮
  language: true      # 显示语言标签
  shrink: false       # true 折叠 / false 展开 / none 展开且隐藏按钮
  fullpage: false     # 全屏按钮
```
