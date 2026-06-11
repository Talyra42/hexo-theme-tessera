# 评论

Tessera 支持十余种评论系统，**最多可同时启用两套**（第一套为默认显示）。

## 总开关 comments

```yaml
comments:
  use:                 # 见下方支持列表；两套写法：Disqus,Waline
  text: true           # 按钮旁是否显示评论系统名称
  lazyload: false      # 进入视口才加载评论（开启后评论计数失效）
  count: false         # 在文章顶部显示评论数
  card_post_count: false  # 在首页卡片显示评论数
```

`use` 可选值：`Disqus` / `Disqusjs` / `Livere` / `Gitalk` / `Valine` / `Waline` / `Utterances` / `Facebook Comments` / `Twikoo` / `Giscus` / `Remark42` / `Artalk`。

同时启用两套：

```yaml
comments:
  use: Waline,Twikoo    # 逗号分隔，第一套默认显示
```

## 各系统配置

每套评论系统在其同名节点下配置。下面是常用几种的关键字段，完整字段以 [`_config.yml`](https://github.com/LumiDesk/hexo-theme-tessera/blob/main/_config.yml) 为准。

### Waline

```yaml
waline:
  serverURL:            # 你的 Waline 服务端地址
  bg:                   # 评论框背景图
  pageview: false       # 用 Waline 浏览量作为页面 PV
  option:
```

### Twikoo

```yaml
twikoo:
  envId:
  region:
  visitor: false        # 用 Twikoo 访客数作为 PV
  option:
```

### Giscus

```yaml
giscus:
  repo:
  repo_id:
  category_id:
  light_theme: light
  dark_theme: dark
  js:
  option:
```

### Gitalk

```yaml
gitalk:
  client_id:
  client_secret:
  repo:
  owner:
  admin:
  option:
```

### Valine

```yaml
valine:
  appId:
  appKey:
  avatar: monsterid
  serverURLs:
  visitor: false
  option:
```

### Artalk

```yaml
artalk:
  server:
  site:
  visitor: false
  option:
```

### 其它

`disqus` / `disqusjs` / `livere` / `utterances` / `facebook_comments` / `remark42` 各自在同名节点配置，字段含义参考各自官网与 `_config.yml` 注释。

## 最新评论卡片

侧栏的[最新评论卡 `card_newest_comments`](/guide/sidebar#最新评论-card-newest-comments) 支持部分评论系统（如 Valine / Waline / Twikoo / Artalk / Disqus / Remark42）。

## 即时聊天 chat

与评论独立，是页面右下角的在线客服气泡：

```yaml
chat:
  use:                 # chatra / tidio / crisp
  rightside_button: false
  button_hide_show: false
chatra: { id: }
tidio: { public_key: }
crisp: { website_id: }
```
