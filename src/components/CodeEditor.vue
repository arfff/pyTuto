<script setup>
import { onMounted, onBeforeUnmount, ref, watch } from 'vue'
import { EditorView, basicSetup } from 'codemirror'
import { EditorState, Prec } from '@codemirror/state'
import { keymap } from '@codemirror/view'
import { indentWithTab } from '@codemirror/commands'
import { indentUnit } from '@codemirror/language'
import { python } from '@codemirror/lang-python'

const props = defineProps({ modelValue: String })
const emit = defineEmits(['update:modelValue', 'run'])
const host = ref(null)
let view

onMounted(() => {
  view = new EditorView({
    parent: host.value,
    state: EditorState.create({
      doc: props.modelValue,
      extensions: [
        basicSetup,
        python(),
        indentUnit.of('    '),
        keymap.of([indentWithTab]),
        Prec.highest(keymap.of([{ key: 'Mod-Enter', run: () => (emit('run'), true) }])),
        EditorView.updateListener.of((u) => {
          if (u.docChanged) emit('update:modelValue', u.state.doc.toString())
        }),
      ],
    }),
  })
})

watch(() => props.modelValue, (v) => {
  if (view && v !== view.state.doc.toString()) {
    view.dispatch({ changes: { from: 0, to: view.state.doc.length, insert: v ?? '' } })
  }
})

onBeforeUnmount(() => view?.destroy())
</script>

<template>
  <div ref="host" class="editor"></div>
</template>
