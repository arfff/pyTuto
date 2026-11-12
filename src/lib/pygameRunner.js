// Runner pygame : Pyodide tourne dans le thread principal car pygame dessine sur un <canvas>.
// Le code de l'élève est exécuté comme une tâche asyncio : le bouton Stop l'annule.
// Limite : une boucle sans « await asyncio.sleep(0) » gèlerait la page (expliqué dans les leçons).
const BASE = 'https://cdn.jsdelivr.net/pyodide/v0.27.2/full/'

const SETUP = `
import asyncio
from pyodide.code import eval_code_async

async def _runner(code):
    import pygame
    g = {"__name__": "__main__"}
    try:
        await eval_code_async(code, globals=g)
    finally:
        try:
            pygame.quit()
        except Exception:
            pass
`

let pyPromise = null
let sink = null // callback de sortie du runner courant

function loadPy() {
  if (!pyPromise) {
    pyPromise = (async () => {
      if (!window.loadPyodide) {
        await new Promise((res, rej) => {
          const s = document.createElement('script')
          s.src = BASE + 'pyodide.js'
          s.onload = res
          s.onerror = () => rej(new Error('Impossible de charger Pyodide (connexion Internet ?)'))
          document.head.appendChild(s)
        })
      }
      const py = await window.loadPyodide({
        stdout: (t) => sink?.('stdout', t),
        stderr: (t) => sink?.('stderr', t),
      })
      await py.loadPackage('pygame-ce')
      py.runPython(SETUP)
      return py
    })()
    pyPromise.catch(() => { pyPromise = null })
  }
  return pyPromise
}

function cleanTraceback(msg) {
  const lines = msg.split('\n')
  const i = lines.findIndex((l) => l.includes('File "<exec>"'))
  if (i === -1) return msg.trim()
  return ['Traceback (most recent call last):', ...lines.slice(i)].join('\n').trim()
}

export function createPygameRunner({ onOutput, onState, getCanvas }) {
  let py = null
  let state = 'loading'
  let stopped = false
  let disposed = false

  const setState = (s) => {
    state = s
    onState(s)
  }

  return {
    async start() {
      sink = onOutput
      setState('loading')
      try {
        py = await loadPy()
        if (!disposed) setState('ready')
      } catch (e) {
        onOutput('stderr', String(e.message || e))
      }
    },
    async run(code) {
      if (state !== 'ready') return
      stopped = false
      sink = onOutput
      setState('running')
      const canvas = getCanvas()
      try {
        py.canvas.setCanvas2D(canvas)
        canvas.focus()
        py.globals.set('_user_code', code)
        py.runPython('_task = asyncio.ensure_future(_runner(_user_code))')
        await py.runPythonAsync('await _task')
      } catch (err) {
        if (!stopped) onOutput('stderr', cleanTraceback(String(err.message || err)))
      } finally {
        if (stopped) onOutput('info', '■ Programme arrêté.')
        if (!disposed) setState('ready')
      }
    },
    stop() {
      if (state !== 'running') return
      stopped = true
      py.runPython('_task.cancel()')
    },
    sendInput() {},
    dispose() {
      disposed = true
      try { py?.runPython('_task.cancel()') } catch { /* rien à annuler */ }
    },
  }
}
