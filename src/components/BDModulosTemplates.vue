<template>
  <div v-if="templates.length==0">Cargando...</div>
  <div v-else>
    <div p-1>Seleccionar template:</div>
    <div  class="flex gap-0.5 px-1 mb-1">
      <div @click="loadblock(item)" v-for="(item, index) in templates" :key="index" class="cursor-pointer p-0.5 bg-stone-500 text-white w-fit rounded border-2 border-stone-700 hover:bg-stone-300 hover:text-stone-800" >
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  data: Object
})
const emits = defineEmits(['loadBlock'])
const builderstore = useBuilderStore()
const templates = ref([])
const loadItems = async () => {
  templates.value = await builderstore.getUserTemplates()
  console.log(templates.value)
}
loadItems()

const loadblock = (block) => {
  emits('loadBlock', block.object)
}

</script>
