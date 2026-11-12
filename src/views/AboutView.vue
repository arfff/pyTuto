<script setup>
import { marked } from 'marked'
import coulisses from '../docs/coulisses.md?raw'

const html = marked.parse(coulisses)
</script>

<template>
  <main class="doc">
    <article class="prose" v-html="html"></article>
    <p><RouterLink to="/" class="btn">← Retour à l'accueil</RouterLink></p>
  </main>
</template>
