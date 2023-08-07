<script setup>
const builderstore = useBuilderStore()
</script>

<template>
  <aside class="w-2/6" bg-slate-5  h-screen flex flex-col>
    <header p-2 text-center text-xs text-white>
      {{ builderstore.menu.name }}
    </header>

    <section bg-slate-800 overflow-x-hidden overflow-y-auto flex flex-col grow>
      <BuilderDetailsModulos v-show="builderstore.menu.id == 'modulos'"  />
      <BuilderDetailsCodigo v-if="builderstore.menu.id == 'codigo'" />
      <BuilderDetailsPrompts v-show="builderstore.menu.id == 'prompts'" />
      <BuilderDetailsAssets v-if="builderstore.menu.id == 'assets'" />
      <BuilderDetailsAudios v-show="builderstore.menu.id == 'audios'" />

    </section>
  </aside>
</template>
