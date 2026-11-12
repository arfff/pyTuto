<script setup>
import { nextTick, ref, watch } from 'vue'

const props = defineProps({ lines: Array, waitingInput: Boolean, prompt: String })
const emit = defineEmits(['submit'])
const box = ref(null)
const inputEl = ref(null)
const text = ref('')

function submit() {
  emit('submit', text.value)
  text.value = ''
}

watch(() => [props.lines.length, props.waitingInput], async () => {
  await nextTick()
  if (box.value) box.value.scrollTop = box.value.scrollHeight
  if (props.waitingInput) inputEl.value?.focus()
})
</script>

<template>
  <div ref="box" class="console">
    <div v-if="!lines.length && !waitingInput" class="hint">La sortie de ton programme s'affiche ici.</div>
    <div v-for="(l, i) in lines" :key="i" :class="['line', l.kind]">{{ l.text }}</div>
    <label v-if="waitingInput" class="line input-line">
      <span>{{ prompt }}</span>
      <input ref="inputEl" v-model="text" @keydown.enter.prevent="submit" autocomplete="off" spellcheck="false" />
    </label>
  </div>
</template>
