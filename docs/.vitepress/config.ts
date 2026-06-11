import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'zh-CN',
  title: 'Tessera',
  description: 'Hexo 玻璃拟态主题使用文档',
  // 部署到 GitHub Pages 项目站点时，按需改成 '/hexo-theme-tessera/'
  base: '/',
  lastUpdated: true,
  cleanUrls: true,

  // 浏览器标签页图标
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/tessera-logo.svg' }]
  ],

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '指南', link: '/guide/getting-started', activeMatch: '/guide/' },
      { text: '配置参考', link: '/config/reference', activeMatch: '/config/' },
      { text: '进阶', link: '/advanced/search', activeMatch: '/advanced/' },
      {
        text: '相关链接',
        items: [
          { text: 'GitHub 仓库', link: 'https://github.com/LumiDesk/hexo-theme-tessera' },
          { text: 'Issues', link: 'https://github.com/LumiDesk/hexo-theme-tessera/issues' },
          { text: 'Hexo 官方文档', link: 'https://hexo.io/zh-cn/docs/' }
        ]
      }
    ],

    sidebar: {
      '/': [
        {
          text: '指南',
          collapsed: false,
          items: [
            { text: '开始使用', link: '/guide/getting-started' },
            { text: '导航与菜单', link: '/guide/navigation' },
            { text: '首页', link: '/guide/homepage' },
            { text: '文章', link: '/guide/post' },
            { text: '特色页面', link: '/guide/pages' },
            { text: '侧边栏', link: '/guide/sidebar' },
            { text: '外观与特效', link: '/guide/appearance' },
            { text: '标签插件', link: '/guide/tag-plugins' }
          ]
        },
        {
          text: '配置',
          collapsed: false,
          items: [
            { text: '配置字段参考', link: '/config/reference' }
          ]
        },
        {
          text: '进阶',
          collapsed: false,
          items: [
            { text: '搜索', link: '/advanced/search' },
            { text: '评论', link: '/advanced/comments' },
            { text: '统计与分析', link: '/advanced/analytics' },
            { text: 'CDN 与注入', link: '/advanced/cdn' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/LumiDesk/hexo-theme-tessera' }
    ],

    search: {
      provider: 'local'
    },

    editLink: {
      pattern: 'https://github.com/LumiDesk/hexo-theme-tessera/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页'
    },

    docFooter: {
      prev: '上一页',
      next: '下一页'
    },

    outline: {
      label: '本页目录',
      level: [2, 3]
    },

    lastUpdated: {
      text: '最后更新于'
    },

    returnToTopLabel: '返回顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '外观',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',

    footer: {
      message: '基于 AGPL-3.0 许可发布',
      copyright: 'Copyright © 2025-present Talyra42'
    }
  }
})
