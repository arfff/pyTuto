<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import CodeEditor from '../components/CodeEditor.vue'
import ConsolePanel from '../components/ConsolePanel.vue'
import { createRunner } from '../lib/pythonRunner'
import { createTurtleRenderer } from '../lib/turtleCanvas'
import { getModule, getLesson, getDone, markDone, loadCode, saveCode, clearCode } from '../lib/content'

const props = defineProps({ moduleId: String, slug: String })
const router = useRouter()

const mod = computed(() => getModule(props.moduleId))
const lesson = computed(() => getLesson(props.moduleId, props.slug))
const index = computed(() => mod.value?.lessons.findIndex((l) => l.slug === props.slug) ?? -1)
const prev = computed(() => mod.value?.lessons[index.value - 1])
const next = computed(() => mod.value?.lessons[index.value + 1])

const code = ref('')
const lines = ref([])
const state = ref('loading')
const waitingInput = ref(false)
const inputPrompt = ref('')
const done = ref(new Set(getDone()))

const canvasEl = ref(null)
const hasCanvas = computed(() => ['pygame', 'turtle'].includes(mod.value?.mode))
let renderer = null

const runner = createRunner({
  mode: mod.value?.mode,
  getCanvas: () => canvasEl.value,
  onDraw: (ops) => renderer?.draw(ops),
  onOutput: (kind, text) => lines.value.push({ kind, text }),
  onInputRequest: (p) => { inputPrompt.value = p; waitingInput.value = true },
  onState: (s) => { state.value = s; if (s !== 'running') waitingInput.value = false },
})

function loadLesson() {
  if (!lesson.value) return
  code.value = loadCode(lesson.value.id) ?? lesson.value.starter
  lines.value = []
  renderer?.reset()
}
watch(() => lesson.value?.id, loadLesson, { immediate: true })
watch(code, (c) => lesson.value && saveCode(lesson.value.id, c))

function run() {
  lines.value = []
  renderer?.reset()
  runner.run(code.value)
}
function stop() {
  renderer?.clearQueue()
  runner.stop()
}
function submitInput(text) {
  lines.value.push({ kind: 'input', text: inputPrompt.value + text })
  waitingInput.value = false
  runner.sendInput(text)
}
function reset() {
  clearCode(lesson.value.id)
  code.value = lesson.value.starter
}
function finish() {
  markDone(lesson.value.id)
  done.value = new Set(getDone())
  if (next.value) router.push(`/${props.moduleId}/${next.value.slug}`)
  else router.push('/')
}

onMounted(() => {
  if (mod.value?.mode === 'turtle') renderer = createTurtleRenderer(canvasEl.value)
  runner.start()
})
onBeforeUnmount(() => {
  renderer?.dispose()
  runner.dispose()
})
</script>

<template>
  <div v-if="lesson" class="lesson-layout">
    <section class="lesson-text">
      <div class="lesson-head">
        <h1>{{ lesson.title }}</h1>
        <select :value="lesson.slug" @change="router.push(`/${moduleId}/${$event.target.value}`)">
          <option v-for="(l, i) in mod.lessons" :key="l.slug" :value="l.slug">
            {{ done.has(l.id) ? '✅' : '' }} {{ i + 1 }}. {{ l.title }}
          </option>
        </select>
      </div>
      <article class="prose" v-html="lesson.html"></article>
      <nav class="lesson-nav">
        <RouterLink v-if="prev" :to="`/${moduleId}/${prev.slug}`" class="btn">← Précédent</RouterLink>
        <button class="btn primary" @click="finish">
          {{ next ? 'Leçon terminée → Suivant' : 'Module terminé 🎉' }}
        </button>
      </nav>
    </section>

    <section :class="['workspace', { 'with-canvas': hasCanvas }]">
      <div class="toolbar">
        <button class="btn primary" :disabled="state !== 'ready'" @click="run">▶ Exécuter</button>
        <button class="btn danger" :disabled="state !== 'running'" @click="stop">■ Stop</button>
        <button class="btn" @click="reset">↺ Recommencer</button>
        <span class="status">
          <template v-if="state === 'loading'">⏳ Chargement de Python…</template>
          <template v-else-if="state === 'running'">⚙️ En cours…</template>
          <template v-else>Prêt · Ctrl+Entrée pour exécuter</template>
        </span>
      </div>
      <CodeEditor v-model="code" @run="run" />
      <div v-if="hasCanvas" class="output-row">
        <canvas ref="canvasEl" width="480" height="320" tabindex="0" :class="['game-canvas', mod.mode]"></canvas>
        <ConsolePanel :lines="lines" :waiting-input="waitingInput" :prompt="inputPrompt" @submit="submitInput" />
      </div>
      <ConsolePanel v-else :lines="lines" :waiting-input="waitingInput" :prompt="inputPrompt" @submit="submitInput" />
    </section>
  </div>
  <main v-else class="home"><p>Leçon introuvable. <RouterLink to="/">Retour</RouterLink></p></main>
</template>
