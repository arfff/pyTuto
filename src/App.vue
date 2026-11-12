<template>
  <header class="topbar">
    <RouterLink to="/" class="brand">🐍 pyTuto</RouterLink>
    <span class="tagline">Apprends Python, leçon après leçon</span>
  </header>
  <!-- La clé force un nouveau runner quand on change de module (console ↔ pygame) -->
  <RouterView v-slot="{ Component, route }">
    <component :is="Component" :key="route.params.moduleId ?? route.path" />
  </RouterView>
</template>
