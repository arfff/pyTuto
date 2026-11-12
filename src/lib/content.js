// Charge automatiquement les modules et leçons depuis le dossier /content.
// Ajouter un module = créer un dossier avec module.json + des fichiers .md.
import { marked } from 'marked'

const mdFiles = import.meta.glob('../../content/*/*.md', { query: '?raw', import: 'default', eager: true })
const metaFiles = import.meta.glob('../../content/*/module.json', { import: 'default', eager: true })

function parseLesson(raw, moduleId, fileName) {
  let meta = {}
  let body = raw
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
  if (m) {
    for (const line of m[1].split(/\r?\n/)) {
      const i = line.indexOf(':')
      if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim()
    }
    body = m[2]
  }
  // Le bloc ```starter ... ``` contient le code de départ de l'éditeur
  let starter = ''
  body = body.replace(/```starter\r?\n([\s\S]*?)```\r?\n?/, (_, code) => {
    starter = code.replace(/\s+$/, '') + '\n'
    return ''
  })
  // Le bloc ```check ... ``` (facultatif) valide l'exercice : voir python-worker.js (runCheck)
  let check = ''
  body = body.replace(/```check\r?\n([\s\S]*?)```\r?\n?/, (_, code) => {
    check = code
    return ''
  })
  const slug = fileName.replace(/\.md$/, '')
  return {
    id: `${moduleId}/${slug}`,
    moduleId,
    slug,
    title: meta.title || slug,
    starter,
    check,
    html: marked.parse(body),
  }
}

const modules = Object.entries(metaFiles)
  .map(([path, meta]) => {
    const id = path.split('/')[3]
    const lessons = Object.entries(mdFiles)
      .filter(([p]) => p.split('/')[3] === id)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([p, raw]) => parseLesson(raw, id, p.split('/').pop()))
    return { id, mode: 'console', ...meta, lessons }
  })
  .filter((mod) => mod.lessons.length)
  .sort((a, b) => a.id.localeCompare(b.id))

export const allModules = modules
export const getModule = (id) => modules.find((m) => m.id === id)
export const getLesson = (moduleId, slug) => getModule(moduleId)?.lessons.find((l) => l.slug === slug)

// --- Progression (localStorage) ---
const KEY_DONE = 'pytuto:done'
const KEY_CODE = 'pytuto:code:'
const safe = (fn, fallback) => { try { return fn() } catch { return fallback } }

export const getDone = () => safe(() => JSON.parse(localStorage.getItem(KEY_DONE) || '[]'), [])
export function markDone(id) {
  const d = new Set(getDone()); d.add(id)
  safe(() => localStorage.setItem(KEY_DONE, JSON.stringify([...d])))
}
export const loadCode = (id) => safe(() => localStorage.getItem(KEY_CODE + id), null)
export const saveCode = (id, code) => safe(() => localStorage.setItem(KEY_CODE + id, code))
export const clearCode = (id) => safe(() => localStorage.removeItem(KEY_CODE + id))
