# 统计与分析

包含访问量统计、网站分析、站长验证与广告。

## 不蒜子 busuanzi

零配置的轻量 PV / UV 统计：

```yaml
busuanzi:
  site_uv: true     # 全站访客数
  site_pv: true     # 全站浏览量
  page_pv: true     # 单页浏览量
```

## 网站分析

按需填入各家的 ID 即可启用（留空不启用）：

```yaml
# 百度统计
baidu_analytics:
# Google Analytics（填 measurement ID，如 G-XXXX）
google_analytics:
# Cloudflare Web Analytics token
cloudflare_analytics:
# Microsoft Clarity ID
microsoft_clarity:
# Google Tag Manager
google_tag_manager:
  tag_id:
  domain:
```

### Umami

支持自托管与 Umami Cloud，并可把 Umami 的 PV/UV 显示在站点上：

```yaml
umami_analytics:
  enable: false
  serverURL:              # 自托管时填实例地址
  script_name: script.js
  website_id:
  option:
  UV_PV:
    site_uv: false
    site_pv: false
    page_pv: false
    token:                # Umami Cloud 的 API key / 自托管的 token
```

## 广告

### Google AdSense

```yaml
google_adsense:
  enable: false
  auto_ads: true
  js: https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js
  client:
  enable_page_level_ads: true
```

### 手动广告位

在指定位置插入自定义广告 HTML：

```yaml
ad:
  index:    # 首页（每 3 篇文章插入一次）
  aside:    # 侧栏
  post:     # 文章页（分页之前）
```

## 站长验证

```yaml
site_verification:
  - name: google-site-verification
    content: xxxxxx
  - name: baidu-site-verification
    content: xxxxxx
```

## SEO 相关

```yaml
Open_Graph_meta:
  enable: true
  option:               # twitter_card / twitter_image / fb_app_id 等
structured_data:
  enable: false
  alternate_name:       # 站点别名数组
```
