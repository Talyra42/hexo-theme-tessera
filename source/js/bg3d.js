/**
 * Tessera 3D Background — 漂浮玻璃碎片场
 * 主题视觉签名：tessera（马赛克砖）化为半透明 3D 玻璃片，在纯净底色上缓慢漂浮
 * - 鼠标视差 / 滚动漂移 / 深浅色模式自适应
 * - 标签页隐藏时暂停渲染；prefers-reduced-motion 时渲染静态帧
 * 依赖：three.js（UMD 全局 THREE），由 effect.pug 按序注入
 */
(() => {
  'use strict'

  const scriptEl = document.getElementById('bg3d')
  if (!scriptEl || typeof THREE === 'undefined') return

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

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setSize(window.innerWidth, window.innerHeight)

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 100)
  camera.position.z = 16

  const isDark = () => document.documentElement.getAttribute('data-theme') === 'dark'

  // ---------- 玻璃碎片 ----------
  const PALETTE = [0x425aef, 0x637dff, 0x8fa3ff, 0xc7d1ff]
  const TILE_COUNT = isMobile ? 28 : 55
  const tiles = []
  const tileGroup = new THREE.Group()
  scene.add(tileGroup)

  const tileGeo = new THREE.PlaneGeometry(1, 1)
  for (let i = 0; i < TILE_COUNT; i++) {
    const mat = new THREE.MeshBasicMaterial({
      color: PALETTE[i % PALETTE.length],
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide
    })
    const m = new THREE.Mesh(tileGeo, mat)
    // 越靠近镜头的碎片越小，避免大碎片糊在镜头前
    const depth = Math.random() // 0=近 1=远
    const s = 0.6 + depth * 1.8
    m.scale.set(s, s, 1)
    m.position.set(
      (Math.random() - 0.5) * 30,
      (Math.random() - 0.5) * 18,
      -6 - depth * 16 // 全部稳定停在 [-6, -22]，远离 z=16 的镜头
    )
    m.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI)
    m.userData = {
      baseY: m.position.y,
      floatAmp: 0.4 + Math.random() * 0.9,
      floatSpeed: 0.15 + Math.random() * 0.3,
      spin: (Math.random() - 0.5) * 0.004,
      phase: Math.random() * Math.PI * 2,
      baseOpacity: 0.05 + Math.random() * 0.1
    }
    tiles.push(m)
    tileGroup.add(m)
  }

  // ---------- 微尘粒子 ----------
  const P_COUNT = isMobile ? 120 : 260
  const pGeo = new THREE.BufferGeometry()
  const pPos = new Float32Array(P_COUNT * 3)
  for (let i = 0; i < P_COUNT; i++) {
    pPos[i * 3] = (Math.random() - 0.5) * 40
    pPos[i * 3 + 1] = (Math.random() - 0.5) * 24
    pPos[i * 3 + 2] = -4 - Math.random() * 16
  }
  pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3))
  const pMat = new THREE.PointsMaterial({
    color: 0x637dff,
    size: 0.06,
    transparent: true,
    depthWrite: false
  })
  const points = new THREE.Points(pGeo, pMat)
  scene.add(points)

  // ---------- 深浅色自适应 ----------
  const applyTheme = () => {
    const dark = isDark()
    tiles.forEach(t => {
      // 深色底上玻璃片更亮、用加法混合产生柔光；浅色底上保持极淡
      t.material.opacity = t.userData.baseOpacity * (dark ? 1.7 : 1)
      t.material.blending = dark ? THREE.AdditiveBlending : THREE.NormalBlending
      t.material.needsUpdate = true
    })
    pMat.opacity = dark ? 0.5 : 0.35
  }
  applyTheme()
  new MutationObserver(applyTheme)
    .observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

  // ---------- 交互 ----------
  let mx = 0; let my = 0; let cx = 0; let cy = 0
  window.addEventListener('mousemove', e => {
    mx = (e.clientX / window.innerWidth - 0.5) * 2
    my = (e.clientY / window.innerHeight - 0.5) * 2
  }, { passive: true })

  let scrollY = 0
  window.addEventListener('scroll', () => { scrollY = window.scrollY }, { passive: true })

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    if (reduceMotion) renderer.render(scene, camera)
  })

  // ---------- 渲染循环 ----------
  let rafId = null
  const clock = new THREE.Clock()

  const frame = () => {
    const t = clock.getElapsedTime()

    // 鼠标视差（阻尼）
    cx += (mx - cx) * 0.03
    cy += (my - cy) * 0.03
    camera.position.x = cx * 1.4
    camera.position.y = -cy * 0.9 - scrollY * 0.0012
    camera.lookAt(0, -scrollY * 0.0012, 0)

    // 用有界摆动代替持续整组绕 Y 旋转——后者会把大半径碎片甩到 z>0（镜头后方）再糊回镜头前
    tileGroup.rotation.y = Math.sin(t * 0.05) * 0.12
    for (const m of tiles) {
      const u = m.userData
      m.position.y = u.baseY + Math.sin(t * u.floatSpeed + u.phase) * u.floatAmp
      m.rotation.x += u.spin
      m.rotation.y += u.spin * 0.7
    }
    points.rotation.y = Math.sin(t * 0.04) * 0.1

    renderer.render(scene, camera)
    rafId = requestAnimationFrame(frame)
  }

  if (reduceMotion) {
    renderer.render(scene, camera) // 静态一帧，不做动画
  } else {
    rafId = requestAnimationFrame(frame)
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        cancelAnimationFrame(rafId)
        rafId = null
      } else if (!rafId) {
        clock.start()
        rafId = requestAnimationFrame(frame)
      }
    })
  }
})()
