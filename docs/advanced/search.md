# 搜索

Tessera 支持三种搜索方案，通过 `search.use` 选择一种，留空则不启用搜索。

```yaml
search:
  use:               # algolia_search / local_search / docsearch
  placeholder:        # 搜索框占位提示
```

## 本地搜索 local_search

最简单、无需第三方账号。需安装站点插件 **`hexo-generator-searchdb`**（装在博客根目录）：

```bash
npm install hexo-generator-searchdb --save
```

在**站点** `_config.yml` 配置生成器：

```yaml
search:
  path: search.xml
  field: post
  content: true
```

在主题配置开启：

```yaml
search:
  use: local_search
  local_search:
    preload: false          # 页面加载时就预载搜索数据
    top_n_per_article: 1     # 每篇文章最多显示几条匹配（-1 全部）
    unescape: false          # 是否反转义 HTML
    pagination:
      enable: false
      hitsPerPage: 8
    CDN:                     # 自定义 search.xml 的 CDN 地址
```

## Algolia 搜索 algolia_search

使用 [Algolia](https://www.algolia.com/) 托管搜索。通常配合 `hexo-algoliasearch` 之类的插件把索引推送到 Algolia，主题侧只需开启：

```yaml
search:
  use: algolia_search
  algolia_search:
    hitsPerPage: 6           # 每页结果数
```

Algolia 的 appId / apiKey / indexName 在**站点** `_config.yml` 的 `algolia` 节点配置（取决于你使用的索引插件）。

## DocSearch docsearch

使用 [Algolia DocSearch](https://docsearch.algolia.com/)：

```yaml
search:
  use: docsearch
  docsearch:
    appId:
    apiKey:
    indexName:
    option:                  # 透传给 DocSearch 的额外配置
```
