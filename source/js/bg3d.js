/**
 * Tessera 背景 — 漂浮玻璃碎片场（Canvas 2D，零依赖）
 * 主题视觉签名：tessera（马赛克砖）化为半透明玻璃片，在纯净底色上缓慢漂浮、翻转。
 * - 鼠标视差 / 滚动漂移 / 深浅色模式自适应
 * - 标签页隐藏时暂停渲染；prefers-reduced-motion 时只渲染静态一帧
 * - 限 ~30fps，远比 WebGL 持续满帧省电（不再依赖 three.js）
 *
 * 「玻璃翻转」的观感：用 ctx.scale 让碎片横向宽度随时间做 cos 摆动——一块平面绕竖轴
 * 旋转时投影宽度正是 cos(角度)，逼近边缘时几乎成一条线，于是看起来像玻璃片在缓缓翻面。
 */
(() => {
  'use strict'

  const scriptEl = document.getElementById('bg3d')
  if (!scriptEl) return

  const isMobile = /Android|webOS|iPhone|iPad|iPod/i.test(navigator.userAgent)
  if (isMobile && scriptEl.getAttribute('data-mobile') !== 'true') return

  const zIndex = scriptEl.getAttribute('data-zindex') || '-1'
  const globalAlpha = parseFloat(scriptEl.getAttribute('data-opacity') || '1')
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // ---------- 画布 ----------
  const canvas = document.createElement('canvas')
  canvas.id = 'tessera-bg3d'
  canvas.style.cssText =
    'position:fixed;top:0;left:0;width:100vw;height:100vh;z-index:' +
    zIndex + ';pointer-events:none;opacity:' + globalAlpha
  document.body.appendChild(canvas)
  const ctx = canvas.getContext('2d')

  let W = 0; let H = 0
  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    W = window.innerWidth
    H = window.innerHeight
    canvas.width = W * dpr
    canvas.height = H * dpr
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  }
  resize()

  const isDark = () => document.documentElement.getAttribute('data-theme') === 'dark'
  const rand = (a, b) => a + Math.random() * (b - a)

  // ---------- 玻璃碎片 ----------
  // 蓝色家族（与 var.styl 的主色一致）
  const PALETTE = [[66, 90, 239], [99, 125, 255], [143, 163, 255], [199, 209, 255]]
  const SHARD_COUNT = isMobile ? 14 : 26
  const shards = []
  for (let i = 0; i < SHARD_COUNT; i++) {
    const depth = Math.random() // 0=近 1=远
    shards.push({
      depth,
      x: Math.random(), // 归一化基准位置（0~1）
      y: Math.random(),
      size: rand(46, 120) * (0.5 + depth * 0.9), // 越远越大；近处碎片更小，避免糊在眼前
      color: PALETTE[i % PALETTE.length],
      baseOpacity: 0.05 + Math.random() * 0.08,
      floatAmp: rand(8, 26),
      floatSpeed: rand(0.15, 0.45),
      phase: Math.random() * Math.PI * 2,
      spin: rand(-0.18, 0.18), // 平面内自转速度
      rot: Math.random() * Math.PI * 2,
      flipSpeed: rand(0.2, 0.55), // 绕竖轴翻转速度
      flipPhase: Math.random() * Math.PI * 2,
      skew: rand(-0.22, 0.22),
      parallax: 0.3 + (1 - depth) * 1.4 // 近处视差更大
    })
  }
  // 远的先画、近的后画（叠在上层）
  shards.sort((a, b) => b.depth - a.depth)

  // ---------- 微尘粒子 ----------
  const DUST_COUNT = isMobile ? 60 : 120
  const dust = []
  for (let i = 0; i < DUST_COUNT; i++) {
    dust.push({
      x: Math.random(),
      y: Math.random(),
      r: rand(0.5, 1.6),
      baseOpacity: 0.3 + Math.random() * 0.7,
      speed: rand(0.1, 0.3),
      phase: Math.random() * Math.PI * 2
    })
  }

  // ---------- 交互 ----------
  let mx = 0; let my = 0; let cx = 0; let cy = 0
  window.addEventListener('mousemove', e => {
    mx = (e.clientX / W - 0.5) * 2
    my = (e.clientY / H - 0.5) * 2
  }, { passive: true })

  let scrollY = 0
  window.addEventListener('scroll', () => { scrollY = window.scrollY }, { passive: true })

  // ---------- 绘制 ----------
  const roundRect = (x, y, w, h, r) => {
    ctx.beginPath()
    ctx.moveTo(x + r, y)
    ctx.arcTo(x + w, y, x + w, y + h, r)
    ctx.arcTo(x + w, y + h, x, y + h, r)
    ctx.arcTo(x, y + h, x, y, r)
    ctx.arcTo(x, y, x + w, y, r)
    ctx.closePath()
  }

  const draw = t => {
    ctx.clearRect(0, 0, W, H)
    const dark = isDark()
    // 深色底：加法混合产生柔光；浅色底：常规叠加保持极淡
    ctx.globalCompositeOperation = dark ? 'lighter' : 'source-over'

    // 鼠标视差（阻尼）+ 滚动漂移
    cx += (mx - cx) * 0.03
    cy += (my - cy) * 0.03
    const camX = cx * 40
    const camY = -cy * 26 - scrollY * 0.04

    for (const s of shards) {
      const px = s.x * W + camX * s.parallax
      let py = s.y * H + camY * s.parallax + Math.sin(t * s.floatSpeed + s.phase) * s.floatAmp
      // 纵向回环，避免长页面滚动后碎片全部飘出、留下空屏
      const span = H + s.size * 2
      py = ((py + s.size) % span + span) % span - s.size

      const flip = Math.max(Math.abs(Math.cos(t * s.flipSpeed + s.flipPhase)), 0.12)
      const op = s.baseOpacity * (dark ? 1.9 : 1)
      const [r, g, b] = s.color
      const half = s.size / 2

      ctx.save()
      ctx.translate(px, py)
      ctx.rotate(s.rot + t * s.spin * 0.1)
      ctx.scale(flip, 1) // 横向压缩 = 绕竖轴翻转
      ctx.transform(1, 0, s.skew, 1, 0, 0) // 轻微错切，多一分玻璃感
      ctx.fillStyle = 'rgba(' + r + ',' + g + ',' + b + ',' + op + ')'
      roundRect(-half, -half, s.size, s.size, s.size * 0.16)
      ctx.fill()
      ctx.lineWidth = 1
      ctx.strokeStyle = 'rgba(' + r + ',' + g + ',' + b + ',' + Math.min(op * 2.4, 0.5) + ')'
      ctx.stroke()
      ctx.restore()
    }

    const dustBoost = dark ? 0.5 : 0.32
    for (const d of dust) {
      const px = d.x * W + camX * 0.5
      let py = d.y * H + camY * 0.5 + Math.sin(t * d.speed + d.phase) * 6
      py = ((py % H) + H) % H
      ctx.fillStyle = 'rgba(99,125,255,' + (d.baseOpacity * dustBoost) + ')'
      ctx.beginPath()
      ctx.arc(px, py, d.r, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  // ---------- 渲染循环（限 ~30fps） ----------
  let rafId = null
  let last = -1000
  const loop = ts => {
    rafId = requestAnimationFrame(loop)
    if (ts - last < 33) return
    last = ts
    draw(ts / 1000)
  }

  window.addEventListener('resize', () => {
    resize()
    if (reduceMotion) draw(0)
  })

  // 深浅色切换：动画态下一帧自动反映；静态态需手动重绘
  new MutationObserver(() => { if (reduceMotion) draw(0) })
    .observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

  if (reduceMotion) {
    draw(0) // 静态一帧，不做动画
  } else {
    rafId = requestAnimationFrame(loop)
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        if (rafId) { cancelAnimationFrame(rafId); rafId = null }
      } else if (!rafId) {
        last = -1000
        rafId = requestAnimationFrame(loop)
      }
    })
  }
})()
