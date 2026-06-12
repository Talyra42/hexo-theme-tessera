# CDN 与注入

这一组配置控制主题脚本 / 样式从哪里加载，以及如何往页面里注入自定义代码。

## CDN

```yaml
CDN:
  internal_provider: local      # 主题自身脚本：local / jsdelivr / unpkg / cdnjs / custom
  third_party_provider: jsdelivr # 第三方库：local / jsdelivr / unpkg / cdnjs / custom
  version: true                  # URL 是否带版本号
  custom_format:                 # 自定义 URL 模板（provider 为 custom 时）
  option:                        # 单独覆盖某个资源的 URL
```

| 字段 | 说明 |
| --- | --- |
| `internal_provider` | 主题自带脚本（main、utils 等）的来源。**开发版只能用 `local`** |
| `third_party_provider` | 第三方库（fancybox、mathjax、prismjs 等）的来源 |
| `version` | 是否在 URL 上附加版本号 |
| `custom_format` | 自定义 URL 模板，例如 `https://cdn.staticfile.org/${cdnjs_name}/${version}/${min_cdnjs_file}` |
| `option` | 逐个资源覆盖 URL（键见 `_config.yml` 注释里的清单，如 `fontawesome`、`mathjax`、`fancybox` 等） |

::: warning 本地化第三方脚本
当把 `third_party_provider` 设为 `local`（不走 CDN）时，需要安装站点插件 **`hexo-butterfly-extjs`**（装在博客根目录），它提供打包好的第三方脚本本地副本。
:::

资源与 CDN 文件的映射关系定义在主题的 `plugins.yml` 中，由 `scripts/events/cdn.js` 据此拼装最终 URL。

## 注入自定义代码 inject

往 `<head>` 结尾前、或 `<body>` 结尾前插入任意 HTML / CSS / JS：

```yaml
inject:
  head:
    - <link rel="stylesheet" href="/custom.css">
  bottom:
    - <script src="/custom.js"></script>
```

## Pjax

开启后，跳页时只替换正文、不整页重载，切换更流畅且背景（含 3D 背景）不重绘。

```yaml
pjax:
  enable: true
  exclude:               # 排除的页面（这些页面整页跳转）
    - /music/
```

::: tip
若某个第三方组件在 Pjax 跳页后失效，通常是它的初始化脚本没在 Pjax 完成回调里重新执行。可把该页加入 `pjax.exclude`，或检查注入脚本的初始化时机。
:::

## 音乐播放器 aplayer / meting

```yaml
aplayerInject:
  enable: false
  per_page: true         # true 每页注入；false 仅含播放器的页面注入
```

开启后可在文章中用 APlayer / MetingJS 的标签嵌入播放器。

## PWA

渐进式网页应用支持，需配合 `hexo-offline` 等插件生成 Service Worker：

```yaml
pwa:
  enable: false
  manifest:
  apple_touch_icon:
  favicon_32_32:
  favicon_16_16:
  mask_icon:
```

## Instant.page

```yaml
instantpage: false       # 鼠标悬停链接时预加载目标页
```
