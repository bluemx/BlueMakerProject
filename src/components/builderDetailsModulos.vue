<script setup>
const builderstore = useBuilderStore()
const drag = ref(false)
const modules = ref()

const contentModel = computed(() => {
  return builderstore.doc ? builderstore.doc.content : ''
})

const loadingDoc = computed(() => {
  return builderstore.loading
})
</script>

<template>
  <div relative>
    <div sticky top-0 z-10 bg-slate-800>
      <BuilderDetailsBlocks />
    </div>

    <!-- version 1 -->
    <!--
    <div class="bg-slate-300 dark:bg-slate-700 p-0.5">
      <template v-for="(key, index) in Object.keys(contentModel)">
        <BuilderDetailsContainers  :data="contentModel" :keyval="key" :level="1" :blockparent="key" />
      </template>
    </div>
  -->
    <BDAssistant />
    <div v-if="!loadingDoc" bg-slate-100 dark:bg-slate-900>
      <template v-for="(key, index) in Object.keys(contentModel)" :key="index">
        <BDModulosInputs v-if="contentModel" :data="contentModel" :item-key="key" :level="0" />
      </template>
    </div>
  </div>
</template>
