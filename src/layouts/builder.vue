<script setup>
const builderstore = useBuilderStore()
</script>

<template>
  <main h-screen w-screen flex>
    <BuilderMenu v-if="builderstore.doc" />
    <BuilderDetails v-if="builderstore.doc" />
    <RouterView />
  </main>
</template>
