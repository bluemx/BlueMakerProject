<template>
  <div v-if="templates.length==0">Cargando...</div>
  <div v-else class="max-h-[100px] overflow-y-scroll">
    <div p-1>Seleccionar template:</div>
    <div  class="flex flex-wrap gap-0.5 px-1 mb-1">
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
  //console.log(templates.value)
}
loadItems()

const loadblock = (block) => {
  emits('loadBlock',updateNamesWithRandomCharacters(block.object))
}



const getRandomCharacters=_=>"xxxx".replace(/x/g,_=>"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"[Math.random()*62|0]);
const updateNamesWithRandomCharacters = (objitem) => {
  const obj = objitem
  for (const key in obj) {
    if (typeof obj[key] === 'object') {
      updateNamesWithRandomCharacters(obj[key]); // Recursively call the function for nested objects
    } else if (key === 'name') {
      obj[key] = getRandomCharacters(); // Update the value with random characters
    }
  }
  return obj
}

</script>
