'use strict'

hexo.extend.helper.register('inject_head_js', function () {
  const { darkmode, aside, pjax } = this.theme
  const start = darkmode.start || 6
  const end = darkmode.end || 18
  const { theme_color: themeColor } = hexo.theme.config
  const themeColorLight = themeColor && themeColor.enable ? themeColor.meta_theme_color_light : '#ffffff'
  const themeColorDark = themeColor && themeColor.enable ? themeColor.meta_theme_color_dark : '#0d0d0d'

  const createCustomJs = () => `
    const saveToLocal = {
      set: (key, value, ttl) => {
        if (!ttl) return
        const expiry = Date.now() + ttl * 86400000
        localStorage.setItem(key, JSON.stringify({ value, expiry }))
      },
      get: key => {
        const itemStr = localStorage.getItem(key)
        if (!itemStr) return undefined
        const { value, expiry } = JSON.parse(itemStr)
        if (Date.now() > expiry) {
          localStorage.removeItem(key)
          return undefined
        }
        return value
      }
    }

    window.btf = {
      saveToLocal,
      getScript: (url, attr = {}) => new Promise((resolve, reject) => {
        const script = document.createElement('script')
        script.src = url
        script.async = true
        Object.entries(attr).forEach(([key, val]) => script.setAttribute(key, val))
        script.onload = script.onreadystatechange = () => {
          if (!script.readyState || /loaded|complete/.test(script.readyState)) resolve()
        }
        script.onerror = reject
        document.head.appendChild(script)
      }),
      getCSS: (url, id) => new Promise((resolve, reject) => {
        const link = document.createElement('link')
        link.rel = 'stylesheet'
        link.href = url
        if (id) link.id = id
        link.onload = link.onreadystatechange = () => {
          if (!link.readyState || /loaded|complete/.test(link.readyState)) resolve()
        }
        link.onerror = reject
        document.head.appendChild(link)
      }),
      addGlobalFn: (key, fn, name = false, parent = window) => {
        if (!${pjax.enable} && key.startsWith('pjax')) return
        const globalFn = parent.globalFn || {}
        globalFn[key] = globalFn[key] || {}
        globalFn[key][name || Object.keys(globalFn[key]).length] = fn
        parent.globalFn = globalFn
      }
    }
  `

  const createDarkmodeJs = () => {
    if (!darkmode.enable) return ''

    // 三态主题：'light' / 'dark' / 'auto'。未保存或保存为 'auto' 都按「跟随系统」处理。
    // 这套逻辑在首屏内联执行（早于绘制，避免闪烁），并把工具函数挂到 btf 供 main.js / rightmenu.js 复用。
    const autoChangeMode = darkmode.autoChangeMode || 0

    return `
      const activateDarkMode = () => {
        document.documentElement.setAttribute('data-theme', 'dark')
        const metaColor = document.querySelector('meta[name="theme-color"]')
        if (metaColor !== null) metaColor.setAttribute('content', '${themeColorDark}')
      }
      const activateLightMode = () => {
        document.documentElement.setAttribute('data-theme', 'light')
        const metaColor = document.querySelector('meta[name="theme-color"]')
        if (metaColor !== null) metaColor.setAttribute('content', '${themeColorLight}')
      }
      btf.activateDarkMode = activateDarkMode
      btf.activateLightMode = activateLightMode

      // 'auto' 解析：优先跟随系统配色；系统无明确偏好（或 autoChangeMode===2 强制时间）时按时间段回退
      const resolveAutoTheme = () => {
        if (${autoChangeMode} !== 2) {
          if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark'
          if (window.matchMedia('(prefers-color-scheme: light)').matches) return 'light'
        }
        const hour = new Date().getHours()
        return (hour <= ${start} || hour >= ${end}) ? 'dark' : 'light'
      }
      btf.resolveAutoTheme = resolveAutoTheme

      // 应用某个保存值并返回实际生效的 'dark' / 'light'
      const applyThemeMode = mode => {
        const real = (mode === 'light' || mode === 'dark') ? mode : resolveAutoTheme()
        real === 'dark' ? activateDarkMode() : activateLightMode()
        return real
      }
      btf.applyThemeMode = applyThemeMode

      applyThemeMode(saveToLocal.get('theme'))
    `
  }

  const createAsideStatusJs = () => {
    if (!aside.enable || !aside.button) return ''
    return `
      const asideStatus = saveToLocal.get('aside-status')
      if (asideStatus !== undefined) {
        document.documentElement.classList.toggle('hide-aside', asideStatus === 'hide')
      }
    `
  }

  const createDetectAppleJs = () => `
    const detectApple = () => {
      if (/iPad|iPhone|iPod|Macintosh/.test(navigator.userAgent)) {
        document.documentElement.classList.add('apple')
      }
    }
    detectApple()
  `

  return `<script>
    (() => {
      ${createCustomJs()}
      ${createDarkmodeJs()}
      ${createAsideStatusJs()}
      ${createDetectAppleJs()}
    })()
  </script>`
})
