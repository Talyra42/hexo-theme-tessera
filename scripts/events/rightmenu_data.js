/**
 * Tessera
 * 生成右键菜单「随机文章」所需的数据文件 rightmenu-posts.json
 */

'use strict'

hexo.extend.generator.register('rightmenu_posts', function (locals) {
  if (!hexo.theme.config.rightmenu || !hexo.theme.config.rightmenu.enable) return
  const root = hexo.config.root || '/'
  const data = locals.posts.sort('-date').map(post => ({
    t: post.title || '',
    u: root + post.path
  }))
  return {
    path: 'rightmenu-posts.json',
    data: JSON.stringify(data)
  }
})
