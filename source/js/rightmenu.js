/**
 * Tessera Right Menu — 自定义右键菜单（致敬安知鱼）
 * 顶部导航图标排 + 情境动作（选中文字 / 链接 / 图片）+ 通用动作
 * 玻璃卡片风格，深浅色自适应；事件委托实现，天然兼容 Pjax
 */
(() => {
  'use strict'

  const ROOT = (window.GLOBAL_CONFIG && GLOBAL_CONFIG.root) || '/'

  // ---------- 构建菜单 DOM ----------
  const menu = document.createElement('div')
  menu.id = 'tessera-rightmenu'
  menu.innerHTML = `
    <div class="rm-nav">
      <button class="rm-nav-btn" data-act="back" title="后退"><i class="fas fa-arrow-left"></i></button>
      <button class="rm-nav-btn" data-act="forward" title="前进"><i class="fas fa-arrow-right"></i></button>
      <button class="rm-nav-btn" data-act="refresh" title="刷新"><i class="fas fa-rotate-right"></i></button>
      <button class="rm-nav-btn" data-act="top" title="回到顶部"><i class="fas fa-arrow-up"></i></button>
    </div>
    <div class="rm-group rm-ctx"></div>
    <div class="rm-group">
      <button class="rm-item" data-act="random"><i class="fas fa-shuffle"></i><span>随机前往一篇文章</span></button>
      <button class="rm-item" data-act="copyurl"><i class="fas fa-link"></i><span>复制本页网址</span></button>
      <button class="rm-item" data-act="darkmode"><i class="fas fa-circle-half-stroke"></i><span>切换昼夜模式</span></button>
    </div>`
  document.body.appendChild(menu)
  const ctxGroup = menu.querySelector('.rm-ctx')

  // ---------- 工具 ----------
  const copy = text => {
    if (navigator.clipboard) return navigator.clipboard.writeText(text)
    const ta = document.createElement('textarea')
    ta.value = text
    document.body.appendChild(ta)
    ta.select()
    document.execCommand('copy')
    ta.remove()
    return Promise.resolve()
  }
  const toast = msg => {
    if (window.btf && btf.snackbarShow) btf.snackbarShow(msg)
  }

  let postsCache = null
  const randomPost = async () => {
    try {
      if (!postsCache) {
        const res = await fetch(ROOT + 'rightmenu-posts.json')
        postsCache = await res.json()
      }
      if (postsCache && postsCache.length) {
        const p = postsCache[Math.floor(Math.random() * postsCache.length)]
        window.location.href = p.u
      }
    } catch (e) { /* 数据缺失时静默 */ }
  }

  // ---------- 显示 / 隐藏 ----------
  let ctxState = {}
  const hide = () => menu.classList.remove('show')

  const show = (x, y) => {
    menu.classList.add('show')
    // 先显示再测量，做视口防溢出翻转
    const mw = menu.offsetWidth
    const mh = menu.offsetHeight
    if (x + mw > window.innerWidth - 8) x = x - mw
    if (y + mh > window.innerHeight - 8) y = y - mh
    menu.style.left = Math.max(8, x) + 'px'
    menu.style.top = Math.max(8, y) + 'px'
  }

  const item = (act, icon, label) =>
    '<button class="rm-item" data-act="' + act + '"><i class="fas ' + icon + '"></i><span>' + label + '</span></button>'

  document.addEventListener('contextmenu', e => {
    // 输入区不接管，保留系统菜单；按住 Ctrl 也放行（逃生通道）
    if (e.ctrlKey || e.target.closest('input, textarea, [contenteditable]')) return
    e.preventDefault()

    const sel = (window.getSelection() || '').toString().trim()
    const link = e.target.closest('a[href]')
    const img = e.target.closest('img')
    ctxState = {
      sel,
      href: link ? link.href : '',
      src: img ? (img.currentSrc || img.src) : ''
    }

    let html = ''
    if (sel) {
      const short = sel.length > 8 ? sel.slice(0, 8) + '…' : sel
      html += item('copysel', 'fa-copy', '复制「' + short + '」')
      html += item('searchsel', 'fa-magnifying-glass', '必应搜索「' + short + '」')
    }
    if (ctxState.href) {
      html += item('openlink', 'fa-up-right-from-square', '新标签页打开链接')
      html += item('copylink', 'fa-link', '复制链接地址')
    }
    if (ctxState.src) {
      html += item('openimg', 'fa-image', '新标签页查看图片')
      html += item('copyimg', 'fa-link', '复制图片地址')
    }
    ctxGroup.innerHTML = html
    ctxGroup.style.display = html ? '' : 'none'

    show(e.clientX, e.clientY)
  })

  document.addEventListener('click', hide)
  document.addEventListener('scroll', hide, { passive: true })
  window.addEventListener('resize', hide)

  // ---------- 动作分发 ----------
  menu.addEventListener('click', e => {
    const btn = e.target.closest('[data-act]')
    if (!btn) return
    e.stopPropagation()
    const act = btn.getAttribute('data-act')
    switch (act) {
      case 'back': history.back(); break
      case 'forward': history.forward(); break
      case 'refresh': location.reload(); break
      case 'top':
        if (window.btf && btf.scrollToDest) btf.scrollToDest(0, 500)
        else window.scrollTo({ top: 0, behavior: 'smooth' })
        break
      case 'random': randomPost(); break
      case 'copyurl': copy(location.href).then(() => toast('已复制本页网址')); break
      case 'darkmode': {
        const sw = document.getElementById('darkmode')
        if (sw) sw.click()
        else if (window.btf) {
          const wm = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'
          wm === 'dark' ? btf.activateDarkMode() : btf.activateLightMode()
          btf.saveToLocal.set('theme', wm, 2)
        }
        break
      }
      case 'copysel': copy(ctxState.sel).then(() => toast('已复制选中文字')); break
      case 'searchsel':
        window.open('https://www.bing.com/search?q=' + encodeURIComponent(ctxState.sel), '_blank')
        break
      case 'openlink': window.open(ctxState.href, '_blank'); break
      case 'copylink': copy(ctxState.href).then(() => toast('已复制链接地址')); break
      case 'openimg': window.open(ctxState.src, '_blank'); break
      case 'copyimg': copy(ctxState.src).then(() => toast('已复制图片地址')); break
    }
    hide()
  })
})()
