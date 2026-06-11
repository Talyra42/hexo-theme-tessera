# 导航与菜单

Tessera 顶部是一条**全宽贴顶的磨砂玻璃导航栏**：左侧是站点 Logo / 标题，右侧是菜单与搜索（菜单项为胶囊药丸样式，悬停呈现磨砂折射高光）。下滑时博客标题会垂直滚动切换成当前文章标题，悬停其上则反向显示「返回首页」。

## 导航栏 `nav`

```yaml
nav:
  logo: /img/tessera-logo.svg   # 导航栏 Logo 图片
  display_title: true           # 是否显示站点标题
  display_post_title: true      # 下滑时是否在导航栏显示文章标题（标题滚动切换）
  fixed: false                  # 是否固定导航栏（false 时仅在下滑后吸顶）
```

| 字段 | 默认 | 说明 |
| --- | --- | --- |
| `logo` | `/img/tessera-logo.svg` | 导航栏左侧 Logo |
| `display_title` | `true` | 是否显示站点标题文字 |
| `display_post_title` | `true` | 开启后，文章页下滑时导航栏标题会从「博客名」滚动切换为「文章标题」 |
| `fixed` | `false` | `true` 时导航栏始终固定在顶部 |

## 菜单 `menu`

菜单支持**二级下拉**。格式为 `名称: 链接 || 图标`，图标使用 [Font Awesome](https://fontawesome.com/icons) 类名。要做二级菜单，把父项写成 `名称||图标:` 然后在其下缩进子项。

```yaml
menu:
  首页: / || fas fa-home
  归档: /archives/ || fas fa-archive
  标签: /tags/ || fas fa-tags
  分类: /categories/ || fas fa-folder-open
  清单||fas fa-list:
    音乐: /music/ || fas fa-music
    电影: /movies/ || fas fa-video
  关于: /about/ || fas fa-heart
```

- 一级项：`显示名称: 路径 || 图标类`
- 二级项：父级写成 `显示名称||图标类:`，子项缩进，每项同样是 `名称: 路径 || 图标`
- 图标可省略（只写 `名称: 路径`），但建议保留以契合胶囊菜单风格

::: tip 标签 / 分类 / 归档页
菜单里链接的 `/tags/`、`/categories/`、`/archives/` 等页面需要你在博客中创建对应的页面或开启归档生成。标签墙、分类墙的页面用法见[特色页面](/guide/pages)。
:::

## 社交图标 `social`

显示在侧栏作者卡等位置的社交链接。格式为 `图标: 链接 || 描述 || 颜色`：

```yaml
social:
  fab fa-github: https://github.com/xxxxx || Github || '#24292e'
  fas fa-envelope: mailto:xxxxxx@gmail.com || Email || '#4a7dbe'
  fab fa-twitter: https://twitter.com/xxxxx || Twitter || '#1da1f2'
```

| 段 | 说明 |
| --- | --- |
| 键（`fab fa-github`） | Font Awesome 图标类 |
| 第 1 段 | 链接地址 |
| 第 2 段 | 鼠标悬停提示 / 无障碍描述 |
| 第 3 段 | 图标颜色（**注意颜色值用引号包起来**，如 `'#24292e'`，否则可能解析出错） |

## 相关阅读

- 关于页里独立的社交图标配置（`about.social`）见[特色页面 · 关于页](/guide/pages#about)
- 页脚导航 `footer.nav` 见[文章与页脚](/config/reference#footer)
