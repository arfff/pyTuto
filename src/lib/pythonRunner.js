import { createPygameRunner } from './pygameRunner'

// Pilote le worker Python. États : 'loading' | 'ready' | 'running'
function createConsoleRunner({ onOutput, onInputRequest, onState, onDraw }) {
  let worker = null
  let sab = null
  let flag = null
  let data = null
  let state = 'loading'

  const setState = (s) => {
    state = s
    onState(s)
  }

  function start() {
    setState('loading')
    if (typeof SharedArrayBuffer !== 'undefined' && self.crossOriginIsolated) {
      sab = new SharedArrayBuffer(8 + 8192)
      flag = new Int32Array(sab, 0, 2)
      data = new Uint8Array(sab, 8)
    } else {
      sab = null
    }
    worker = new Worker(import.meta.env.BASE_URL + 'python-worker.js')
    worker.onmessage = (e) => {
      const m = e.data
      if (m.type === 'ready') setState('ready')
      else if (m.type === 'done') setState('ready')
      else if (m.type === 'stdout') onOutput('stdout', m.text)
      else if (m.type === 'stderr') onOutput('stderr', m.text)
      else if (m.type === 'input') onInputRequest(m.prompt)
      else if (m.type === 'draw') onDraw?.(m.ops)
    }
    worker.postMessage({ type: 'init', sab })
  }

  return {
    start,
    run(code) {
      if (state !== 'ready') return
      setState('running')
      worker.postMessage({ type: 'run', code })
    },
    stop() {
      if (!worker) return
      worker.terminate()
      onOutput('info', '■ Programme arrêté.')
      start() // Pyodide est en cache : redémarrage rapide
    },
    sendInput(text) {
      if (!sab) return
      const bytes = new TextEncoder().encode(text).slice(0, data.length)
      data.set(bytes)
      Atomics.store(flag, 1, bytes.length)
      Atomics.store(flag, 0, 1)
      Atomics.notify(flag, 0)
    },
    dispose() {
      if (worker) worker.terminate()
    },
  }
}

// Choisit le runner selon le mode du module : 'console' (Worker) ou 'pygame' (canvas)
export function createRunner({ mode = 'console', ...opts }) {
  return mode === 'pygame' ? createPygameRunner(opts) : createConsoleRunner(opts)
}
