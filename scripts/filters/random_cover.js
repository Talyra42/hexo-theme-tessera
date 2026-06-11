/**
 * Random cover for posts
 */

'use strict'

hexo.extend.generator.register('post', locals => {
  const imgTestReg = /\.(png|jpe?g|gif|svg|webp|avif)(\?.*)?$/i
  const { post_asset_folder: postAssetFolder } = hexo.config
  const { cover: { default_cover: defaultCover, random_cover_dir: randomCoverDir } } = hexo.theme.config

  // 随机封面目录：扫描站点 source 下的指定目录，找到图片则作为封面池（优先于 default_cover）
  let coverPool = defaultCover
  if (randomCoverDir) {
    try {
      const fs = require('fs')
      const path = require('path')
      const cleanDir = String(randomCoverDir).replace(/^\/+|\/+$/g, '')
      const files = fs.readdirSync(path.join(hexo.source_dir, cleanDir)).filter(f => imgTestReg.test(f))
      if (files.length) {
        const root = hexo.config.root || '/'
        coverPool = files.map(f => `${root}${cleanDir}/${f}`)
      }
    } catch (e) {
      hexo.log.warn(`[tessera] random_cover_dir "${randomCoverDir}" 不存在或不可读，回退 default_cover`)
    }
  }

  function * createCoverGenerator () {
    if (!coverPool) {
      while (true) yield false
    }
    if (!Array.isArray(coverPool)) {
      while (true) yield coverPool
    }

    const coverCount = coverPool.length
    if (coverCount === 1) {
      while (true) yield coverPool[0]
    }

    const maxHistory = Math.min(3, coverCount - 1)
    const history = []

    while (true) {
      let index
      do {
        index = Math.floor(Math.random() * coverCount)
      } while (history.includes(index))

      history.push(index)
      if (history.length > maxHistory) history.shift()

      yield coverPool[index]
    }
  }

  const coverGenerator = createCoverGenerator()

  const handleImg = data => {
    let { cover: coverVal, top_img: topImg, pagination_cover: paginationCover } = data

    // Add path to top_img and cover if post_asset_folder is enabled
    if (postAssetFolder) {
      if (topImg && topImg.indexOf('/') === -1 && imgTestReg.test(topImg)) {
        data.top_img = `${data.path}${topImg}`
      }
      if (coverVal && coverVal.indexOf('/') === -1 && imgTestReg.test(coverVal)) {
        data.cover = `${data.path}${coverVal}`
      }
      if (paginationCover && paginationCover.indexOf('/') === -1 && imgTestReg.test(paginationCover)) {
        data.pagination_cover = `${data.path}${paginationCover}`
      }
    }

    if (coverVal === false) return data

    // If cover is not set, use random cover
    if (!coverVal) {
      const randomCover = coverGenerator.next().value
      data.cover = randomCover
      coverVal = randomCover
    }

    if (coverVal && (coverVal.indexOf('//') !== -1 || imgTestReg.test(coverVal))) {
      data.cover_type = 'img'
    }

    return data
  }

  const posts = locals.posts.sort('date').toArray()
  const { length } = posts

  return posts.map((post, i) => {
    if (i) post.prev = posts[i - 1]
    if (i < length - 1) post.next = posts[i + 1]

    post.__post = true

    return {
      data: handleImg(post),
      layout: 'post',
      path: post.path
    }
  })
})
