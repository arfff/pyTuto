// Anime sur un <canvas> les opérations envoyées par public/turtle_shim.py.
// Coordonnées turtle : origine au centre, y vers le haut.
// Les traits sont dessinés sur un calque persistant ; les sprites sont redessinés à chaque image.

// Vitesse turtle (1-10) -> pixels parcourus par image (0 = instantané)
const PX_PER_FRAME = [Infinity, 3, 5, 8, 12, 18, 26, 38, 55, 80, 120]
const MAX_OPS_PER_FRAME = 400

export function createTurtleRenderer(canvas) {
  const W = canvas.width
  const H = canvas.height
  const ctx = canvas.getContext('2d')
  const layer = document.createElement('canvas')
  layer.width = W
  layer.height = H
  const lctx = layer.getContext('2d')
  lctx.lineCap = 'round'
  lctx.lineJoin = 'round'

  let bg = '#ffffff'
  let turtles = new Map()
  let queue = []
  let current = null
  let raf = null

  const px = (x) => W / 2 + x
  const py = (y) => H / 2 - y
  const sprite = (id) => {
    if (!turtles.has(id)) turtles.set(id, { x: 0, y: 0, h: 0, visible: true, color: '#000' })
    return turtles.get(id)
  }

  function segment(x1, y1, x2, y2, color, width) {
    if (!color) return
    lctx.strokeStyle = color
    lctx.lineWidth = width
    lctx.beginPath()
    lctx.moveTo(px(x1), py(y1))
    lctx.lineTo(px(x2), py(y2))
    lctx.stroke()
  }

  function instant(op) {
    switch (op.t) {
      case 'show': {
        const t = sprite(op.id)
        t.visible = op.v
        if (op.c) t.color = op.c
        break
      }
      case 'turn':
        sprite(op.id).h = op.h
        break
      case 'fill':
        lctx.fillStyle = op.c
        lctx.beginPath()
        op.pts.forEach(([x, y], i) => (i ? lctx.lineTo(px(x), py(y)) : lctx.moveTo(px(x), py(y))))
        lctx.closePath()
        lctx.fill()
        break
      case 'dot':
        lctx.fillStyle = op.c
        lctx.beginPath()
        lctx.arc(px(op.x), py(op.y), op.r, 0, Math.PI * 2)
        lctx.fill()
        break
      case 'text':
        lctx.fillStyle = op.c
        lctx.font = `${op.size * 1.33}px Arial, sans-serif`
        lctx.textAlign = op.align === 'center' ? 'center' : op.align === 'right' ? 'right' : 'left'
        lctx.fillText(op.s, px(op.x), py(op.y))
        break
      case 'clear':
        lctx.clearRect(0, 0, W, H)
        break
      case 'bg':
        bg = op.c
        break
    }
  }

  function drawSprite(t) {
    if (!t.visible) return
    ctx.save()
    ctx.translate(px(t.x), py(t.y))
    ctx.rotate((-t.h * Math.PI) / 180)
    ctx.beginPath()
    ctx.moveTo(12, 0)
    ctx.lineTo(-8, 7)
    ctx.lineTo(-4, 0)
    ctx.lineTo(-8, -7)
    ctx.closePath()
    ctx.fillStyle = t.color
    ctx.globalAlpha = 0.85
    ctx.fill()
    ctx.globalAlpha = 1
    ctx.strokeStyle = '#222'
    ctx.lineWidth = 1
    ctx.stroke()
    ctx.restore()
  }

  function render() {
    ctx.fillStyle = bg
    ctx.fillRect(0, 0, W, H)
    ctx.drawImage(layer, 0, 0)
    turtles.forEach(drawSprite)
  }

  function frame() {
    raf = null
    let n = 0
    let budgetByTurtle = new Map()
    while ((current || queue.length) && n < MAX_OPS_PER_FRAME) {
      if (!current) current = { op: queue.shift(), done: 0 }
      const op = current.op
      n++
      if (op.t !== 'line') {
        instant(op)
        current = null
        continue
      }
      const t = sprite(op.id)
      const len = Math.hypot(op.x2 - op.x1, op.y2 - op.y1)
      const perFrame = PX_PER_FRAME[Math.max(0, Math.min(10, op.s))]
      if (perFrame === Infinity || len < 1e-9) {
        segment(op.x1, op.y1, op.x2, op.y2, op.c, op.w)
        t.x = op.x2
        t.y = op.y2
        current = null
        continue
      }
      const left = budgetByTurtle.has(op.id) ? budgetByTurtle.get(op.id) : perFrame
      if (left <= 0) break
      const step = Math.min(len - current.done, left)
      const a = current.done / len
      const b = (current.done + step) / len
      const lerp = (u, v, k) => u + (v - u) * k
      segment(lerp(op.x1, op.x2, a), lerp(op.y1, op.y2, a), lerp(op.x1, op.x2, b), lerp(op.y1, op.y2, b), op.c, op.w)
      t.x = lerp(op.x1, op.x2, b)
      t.y = lerp(op.y1, op.y2, b)
      current.done += step
      budgetByTurtle.set(op.id, left - step)
      if (current.done >= len - 1e-6) current = null
    }
    render()
    if (current || queue.length) raf = requestAnimationFrame(frame)
  }

  function kick() {
    if (!raf) raf = requestAnimationFrame(frame)
  }

  render()
  return {
    draw(ops) {
      queue.push(...ops)
      kick()
    },
    // Nouvelle exécution : page blanche
    reset() {
      queue = []
      current = null
      turtles = new Map()
      bg = '#ffffff'
      lctx.clearRect(0, 0, W, H)
      render()
    },
    // Stop : on abandonne ce qui reste à animer, mais on garde le dessin déjà fait
    clearQueue() {
      queue = []
      current = null
      render()
    },
    dispose() {
      if (raf) cancelAnimationFrame(raf)
      queue = []
    },
  }
}
