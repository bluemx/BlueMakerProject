<template>
  <draggable
      :list="modules"
      :group="{ name: 'people', pull: 'clone', put: false }"
      item-key="id"
      :class="['grid grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-0.5 p-0.5', drag?'bg-pink':'']"
      :sort="false" :clone="clonedModule"
      @start="drag = true"
      @end="drag = false"
    >
      <template #item="{ element }">
        <div :title="element.name" flex flex-col cursor-grab items-center justify-center bg-white dark:bg-slate-8>
          <div v-html="element.icon" />
          <span class="text-[8px]">{{ element.name }}</span>
        </div>
      </template>
    </draggable>
</template>
<script setup>
import draggable from 'vuedraggable'
const builderstore = useBuilderStore()
const drag = ref(false)
const modules = ref()

async function loadModulos() {
  const { data: modulos, error } = await supabase
    .from('modulos')
    .select('*')
  modules.value = modulos
}
const getRandomCharacters=_=>"xxxx".replace(/x/g,_=>"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"[Math.random()*62|0]);

function clonedModule(i) {
  const props = JSON.parse(JSON.stringify(i.schema.properties))
  const item = {}
  Object.keys(i.schema.properties).forEach(el => {
    const prop = props[el]
    if(prop.type=='string'){
      item[el] = ""
    }
    if(prop.type=='array'){
      item[el] = []
    }
    if(prop.default){
      item[el] = prop.default
    }
  });
  item["block"] = i.name
  item["name"] = getRandomCharacters()
  return item
}
loadModulos()
</script>
