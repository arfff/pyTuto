<script setup>
import { allModules, getDone } from '../lib/content'
const done = new Set(getDone())
</script>

<template>
  <main class="home">
    <h1>Bienvenue 👋</h1>
    <p class="lead">
      Choisis un module. Chaque module est une suite de petites leçons : tu lis à gauche, tu codes à droite.
    </p>
    <div class="cards">
      <RouterLink
        v-for="m in allModules"
        :key="m.id"
        :to="`/${m.id}/${m.lessons[0].slug}`"
        class="card"
      >
        <h2>{{ m.icon }} {{ m.title }}</h2>
        <p>{{ m.description }}</p>
        <small>{{ m.lessons.filter((l) => done.has(l.id)).length }} / {{ m.lessons.length }} leçons terminées</small>
      </RouterLink>
    </div>
    <p class="dev-link"><RouterLink to="/test-pygame">🧪 Test technique pygame</RouterLink></p>
  </main>
</template>
