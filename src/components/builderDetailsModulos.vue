<script setup>
import draggable from 'vuedraggable'

const builderstore = useBuilderStore()
const drag = ref(false)
const modules = ref()
const contentModel = ref(builderstore.doc ? builderstore.doc.content : '')


</script>

<template>
  <div relative>
    <div sticky top-0 z-10 bg-slate-800>
      <BuilderDetailsBlocks></BuilderDetailsBlocks>

    </div>


    <div class="bg-slate-300 dark:bg-slate-700 p-0.5">
      <template v-for="(key, index) in Object.keys(contentModel)">
        <BuilderDetailsContainers  :data="contentModel" :keyval="key" :level="1" :blockparent="key" />
      </template>
    </div>


    <div bg-slate-100 dark:bg-slate-900>

      <template v-for="(key, index) in Object.keys(contentModel)"  >
        <BDModulosInputs :data="contentModel" :item-key="key" :level="0"></BDModulosInputs>
      </template>

  </div>

  </div>






</template>
