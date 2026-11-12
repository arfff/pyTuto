<script setup>
import { onBeforeUnmount, ref } from 'vue'

// Test technique : pygame-ce dans le thread principal (le canvas l'exige),
// via Pyodide chargé depuis le CDN. À valider avant de créer un vrai module « Jeux ».
const PYODIDE = 'https://cdn.jsdelivr.net/pyodide/v0.27.2/full/'
const canvas = ref(null)
const log = ref([])
const status = ref('idle')

const GAME = `
import asyncio, pygame
pygame.init()
screen = pygame.display.set_mode((480, 320))
clock = pygame.time.Clock()
x, y = 240, 160
async def main():
    global x, y
    while True:
        for e in pygame.event.get():
            pass
        keys = pygame.key.get_pressed()
        x += (keys[pygame.K_RIGHT] - keys[pygame.K_LEFT]) * 5
        y += (keys[pygame.K_DOWN] - keys[pygame.K_UP]) * 5
        screen.fill((30, 30, 60))
        pygame.draw.circle(screen, (66, 184, 131), (x, y), 20)
        pygame.display.flip()
        clock.tick(60)
        await asyncio.sleep(0)
asyncio.ensure_future(main())
`

async function start() {
  status.value = 'loading'
  try {
    if (!window.loadPyodide) {
      await new Promise((res, rej) => {
        const s = document.createElement('script')
        s.src = PYODIDE + 'pyodide.js'
        s.onload = res
        s.onerror = () => rej(new Error('Impossible de charger Pyodide'))
        document.head.appendChild(s)
      })
    }
    const pyodide = await window.loadPyodide({
      stdout: (t) => log.value.push(t),
      stderr: (t) => log.value.push('⚠ ' + t),
    })
    await pyodide.loadPackage('pygame-ce')
    pyodide.canvas.setCanvas2D(canvas.value)
    canvas.value.focus()
    await pyodide.runPythonAsync(GAME)
    status.value = 'ok'
  } catch (e) {
    log.value.push('❌ ' + e.message)
    status.value = 'error'
  }
}
// La boucle pygame ne s'arrête pas toute seule : on recharge la page en quittant.
onBeforeUnmount(() => { if (status.value === 'ok') location.reload() })
</script>

<template>
  <main class="home">
    <h1>🧪 Test pygame</h1>
    <p class="lead">
      Clique sur « Lancer », puis sur le canvas et utilise les flèches. Si un rond vert se déplace, pygame fonctionne dans ton navigateur.
    </p>
    <button class="btn primary" :disabled="status === 'loading' || status === 'ok'" @click="start">
      {{ status === 'loading' ? '⏳ Chargement…' : '▶ Lancer' }}
    </button>
    <p><canvas ref="canvas" id="canvas" width="480" height="320" tabindex="0" class="game-canvas"></canvas></p>
    <pre v-if="log.length" class="console">{{ log.join('\n') }}</pre>
  </main>
</template>
