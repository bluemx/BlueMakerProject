<script setup>
const builderstore = useBuilderStore()
</script>

<template>
  <aside class="w-2/6" h-screen flex flex-col bg-slate-5>
    <header p-2 text-center text-xs text-white>
      {{ builderstore.menu.name }}
    </header>

    <section flex grow flex-col overflow-x-hidden overflow-y-auto bg-slate-800>
      <BuilderDetailsModulos v-show="builderstore.menu.id === 'modulos'" />
      <BuilderDetailsCodigo v-if="builderstore.menu.id === 'codigo'" />
      <BuilderDetailsPrompts v-show="builderstore.menu.id === 'prompts'" />
      <BuilderDetailsAssets v-if="builderstore.menu.id === 'assets'" />
      <BuilderDetailsAudios v-show="builderstore.menu.id === 'audios'" />
    </section>
  </aside>
</template>
