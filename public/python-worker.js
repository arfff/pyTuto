// Worker classique : exécute Python (Pyodide) hors du thread principal.
// Avantages : la page ne gèle pas, et le bouton Stop peut tuer le worker.
importScripts('https://cdn.jsdelivr.net/pyodide/v0.27.2/full/pyodide.js')

let pyodide = null
let flag = null // Int32Array [0]=état (0 attente, 1 réponse prête), [1]=longueur
let data = null // Uint8Array : texte saisi par l'utilisateur
let canBlock = false

function readInput(prompt) {
  if (!canBlock) {
    postMessage({
      type: 'stderr',
      text: "input() indisponible : la page n'est pas « cross-origin isolated ».",
    })
    return ''
  }
  Atomics.store(flag, 0, 0)
  postMessage({ type: 'input', prompt })
  Atomics.wait(flag, 0, 0)
  const len = Atomics.load(flag, 1)
  return new TextDecoder().decode(data.slice(0, len))
}

function cleanTraceback(msg) {
  const lines = msg.split('\n')
  const i = lines.findIndex((l) => l.includes('File "<exec>"'))
  if (i === -1) return msg.trim()
  return ['Traceback (most recent call last):', ...lines.slice(i)].join('\n').trim()
}

async function init(sab) {
  if (sab) {
    flag = new Int32Array(sab, 0, 2)
    data = new Uint8Array(sab, 8)
    canBlock = true
  }
  pyodide = await loadPyodide()
  pyodide.setStdout({ batched: (text) => postMessage({ type: 'stdout', text }) })
  pyodide.setStderr({ batched: (text) => postMessage({ type: 'stderr', text }) })
  pyodide.globals.set('_js_input', readInput)
  pyodide.runPython(`
import builtins, sys
def _input(prompt=""):
    t = sys.modules.get("turtle")
    if t:
        t._flush()  # le dessin en cours s'affiche avant la question
    return _js_input(str(prompt))
builtins.input = _input
`)
  // Module « turtle » maison : envoie des opérations de dessin à la page (voir turtle_shim.py)
  const shim = await (await fetch(new URL('turtle_shim.py', self.location.href))).text()
  pyodide.globals.set('_turtle_src', shim)
  pyodide.globals.set('_js_draw', (s) => postMessage({ type: 'draw', ops: JSON.parse(s) }))
  pyodide.runPython(`
import sys, types
_m = types.ModuleType("turtle")
_m.__dict__["_emit"] = _js_draw
exec(_turtle_src, _m.__dict__)
sys.modules["turtle"] = _m
`)
  postMessage({ type: 'ready' })
}

const TURTLE_CALL = (fn) =>
  `import sys\n_t = sys.modules.get("turtle")\nif _t:\n    _t.${fn}()`

async function run(code) {
  const g = pyodide.runPython('dict(__name__="__main__")')
  pyodide.runPython(TURTLE_CALL('_reset_all'))
  try {
    await pyodide.loadPackagesFromImports(code)
    await pyodide.runPythonAsync(code, { globals: g })
  } catch (err) {
    postMessage({ type: 'stderr', text: cleanTraceback(String(err.message || err)) })
  } finally {
    try { pyodide.runPython(TURTLE_CALL('_flush')) } catch (e) { /* rien */ }
    g.destroy()
    postMessage({ type: 'done' })
  }
}

onmessage = (e) => {
  const m = e.data
  if (m.type === 'init') init(m.sab)
  else if (m.type === 'run') run(m.code)
}
