<template>
<draggable
  :list="thelist"
  :group="{ name: 'people', pull: true, put: true }"
  item-key="name"
  :class="['min-h-[30px] ring-1 ring-slate-4 flex flex-col gap-0.5  ml-0.5 pl-1 pr-0.5 py-1']"
  @start="drag = true"
  @end="drag = false"
  handle=".handle"
>
  <template #item="{ element,index }">
    <div :class="drag?'ring-1 ring-accent':''">

      <div class="flex gap-1 bg-gradient-to-r from-teal-800 to-info items-center relative">



        <div @click="open(index)" class="mb-0.5  handle flex gap-1 items-center justify-between grow px-1 cursor-grab p-1" >
          <div flex items-center w-full grow>
            <div class="hasicon w-4 h-4 mr-1" v-if="builderstore?.modulosobj[element.block]?.icon" v-html="builderstore.modulosobj[element.block].icon"></div>
            <template v-if="element?.symbol">
              <div>symbol</div>
              <div >{{ element.symbol }}</div>
            </template>
            <template v-else>
              <div flex items-center justify-between grow>
                <div >{{ element.block }} </div>
                <div>{{ element.name }}</div>
            </div>
            </template>
          </div>
        </div>






        <!-- ACTIONS -->
        <UPopover trigger="hover">
          <div i-solar-copy-line-duotone class="cursor-pointer text-dark hover:text-white" @click="fnClone(element)" />
          <template #content><span dark:text-white text-xs p-1>Duplicar</span></template>
        </UPopover>
        <UPopover trigger="hover">
          <div i-solar-link-round-bold-duotone class="cursor-pointer text-dark hover:text-white"  @click="fnSymbol(element, index)"  />
          <template #content><span dark:text-white text-xs p-1>A símbolo</span></template>
        </UPopover>
        <UPopover trigger="click">
          <div i-solar-trash-bin-trash-linear class="cursor-pointer text-dark  hover:text-white"   />
          <template #content><UButton size="xs" class="mx-1 px-1" type="primary"  @click="fnDelete(element, index)">Eliminar bloque</UButton></template>
        </UPopover>


      </div>




      <template v-for="(itemNest, indexNest) in Object.keys(element)">
        <template  v-if="accordion[moduloName+index] && !dropzones.includes(itemNest) && !noninput.includes(itemNest)">

            <div>
              <BDModulosInputs :data="element" :item-key="itemNest" :level="level+1"></BDModulosInputs>
            </div>

        </template>
      </template>



      <template v-for="(itemNest, indexNest) in Object.keys(element)" :key="indexNest">
        <template v-if="dropzones.includes(itemNest) && Array.isArray(element[itemNest])">

          <BDModulosDropzones :data="element" :item-key="itemNest" :level="level+1"></BDModulosDropzones>

        </template>
      </template>
    </div>

  </template>
</draggable>

</template>

<script setup>
import draggable from 'vuedraggable'
const builderstore = useBuilderStore()
const props = defineProps({
  data: Object,
  itemKey: String,
  level: Number
})
const thelist = ref(props.data[props.itemKey])
const drag = ref(false)

const moduloName = props.itemKey+'_'+props.level


const dropzones = ['content', 'scenes', 'options']
const noninput = ['block', 'name']



const getRandomCharacters=_=>"xxxx".replace(/x/g,_=>"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"[Math.random()*62|0]);

const fnClone = (el) => {
  const newel = JSON.parse(JSON.stringify(el))
  if(!el?.symbol){
    newel['name'] = getRandomCharacters()
  }
  thelist.value.push(newel)
}
const fnSymbol = (el, index) => {
  if(!el.name){el.name = getRandomCharacters()}
  const newel = JSON.parse(JSON.stringify(el))

  const thename = newel.name
  delete newel['name']
  builderstore.doc.content.symbols[thename] = newel

  thelist.value[index] = {
    "symbol": thename
  }

}

const fnDelete= (el, index) => {
  thelist.value.splice(index, 1)
}


const accordion = ref({})
const open = (index) => {
  accordion.value[moduloName+index] = !accordion.value[moduloName+index]
}


</script>
