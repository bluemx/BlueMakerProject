<template>
<draggable
  :list="thelist"
  :group="{ name: 'people', pull: true, put: true }"
  item-key="name"
  :class="['min-h-[30px] border-l-1 border-b-1 border-t-1 border-t-dashed border-b-dashed flex flex-col gap-0.5  pl-1 pr-0.5 py-1', 'border-'+builderstore?.modulosobj[parentblock]?.color+'-500', 'bg-'+builderstore?.modulosobj[parentblock]?.color+'-500/10']"
  @start="onStart"
  @end="onEnd"
  handle=".handle"
  v-if="Object.keys(builderstore.modulosobj).length"
>
  <template #item="{ element,index }">
    <div :class="['hover:ring-1', drag?'ring-1 ring-accent':'',  element.hidden?'opacity-50':''] ">


      <div class="flex gap-1 bg-gradient-to-r from-teal-800 to-info items-center relative" :class="['border-l-1 border-t-1', 'border-'+builderstore?.modulosobj[element.block]?.color+'-500'] " >
        <div  class="handle flex gap-1 items-center justify-between grow px-1 cursor-grab p-0.5">
          <div flex items-center w-full grow  @click="open(index, element)" >
            <div :class="'text-'+builderstore?.modulosobj[element.block]?.color+'-500'">
              <div class="hasicon w-4 h-4 mr-1" v-if="builderstore?.modulosobj[element.block]?.icon" v-html="builderstore.modulosobj[element.block].icon"></div>
            </div>
            <template v-if="element?.symbol">
              <div flex items-center justify-between grow class="bg-gradient-to-r from-red-800 to-info items-center relative">
                <div >symbol</div>
                <div>{{ element.symbol }}</div>
              </div>
            </template>

            <template v-if="element.block=='separator'">
              <div flex items-center justify-between grow class="bg-gradient-to-r from-red-800 to-info items-center relative" :style="'background:'+element.color+';'">
                <div >{{element.text}}</div>
              </div>
            </template>

            <template v-else>
              <div flex items-center justify-between grow>
                <div >{{ element.block }} </div>
              </div>
            </template>
          </div>
        </div>

        <!-- ACTIONS -->

        <div v-if="element?.name" @click="copytxt(element.name)"  class="cursor-pointer bg-dark/20 px-0.5 rounded hover:text-amber active:text-lime">{{ element.name }}</div>

        <UPopover trigger="hover">
          <div  :class="[element.hidden?'i-solar-eye-closed-bold-duotone':'i-solar-eye-broken', 'cursor-pointer text-dark hover:text-white']" @click="fnHide(element)" />
          <template #content><span dark:text-white text-xs p-1>Ocultar/Mostrar</span></template>
        </UPopover>

        <UPopover trigger="hover">
          <div i-solar-copy-line-duotone class="cursor-pointer text-dark hover:text-white" @click="fnClone(element, index)" />
          <template #content><span dark:text-white text-xs p-1>Duplicar</span></template>
        </UPopover>

        <UPopover trigger="click">
          <div i-solar-cloud-upload-line-duotone class="cursor-pointer text-dark  hover:text-white"   />
          <template #content>
            <BDModulosSaveTemplate :data="element"></BDModulosSaveTemplate>
          </template>
        </UPopover>

        <UPopover trigger="click">
          <div i-solar-trash-bin-trash-linear class="cursor-pointer text-dark  hover:text-white"   />
          <template #content><UButton size="xs" class="mx-1 px-1" type="primary"  @click="fnDelete(element, index)">Eliminar bloque</UButton></template>
        </UPopover>


      </div>


      <template v-if="accordion[moduloName+index] && element.block=='template'">
        <BDModulosTemplates :data="element" @loadBlock="templateLoad(element, index, $event)"></BDModulosTemplates>
      </template>


      <div v-if="accordion[moduloName+index]">

        <template v-for="(itemNest, indexNest) in Object.keys(element)">

          <template  v-if="!dropzones.includes(itemNest) && !noninput.includes(itemNest)">
              <div>
                <BDModulosInputs :data="element" :item-key="itemNest" :level="level+1" :parentblock="element.block"></BDModulosInputs>
              </div>
          </template>

        </template>

        <div class="p-1 text-right w-full flex justify-end" v-if="!element?.symbol">
          <UButton size="xs" class="px-2" @click="fnSymbol(element,index)">Convertir en símbolo</UButton>
        </div>
      </div>






      <template v-for="(itemNest, indexNest) in Object.keys(element)" :key="indexNest">
        <template v-if="dropzones.includes(itemNest) && Array.isArray(element[itemNest])">
          <div class="">
            <BDModulosDropzones :data="element" :item-key="itemNest" :level="level+1" :parentblock="element.block"></BDModulosDropzones>
          </div>
        </template>
      </template>

    </div>

  </template>
</draggable>
<UToast ref="copyToast" position="bottom" align="left" />
</template>

<script setup>
import draggable from 'vuedraggable'
import { useClipboard } from '@vueuse/core'

const source = ref('Hello')
const { text, copy, copied, isSupported } = useClipboard({ source })

const builderstore = useBuilderStore()
const props = defineProps({
  data: Object,
  itemKey: String,
  level: Number,
  parentblock: String
})

const templateLoad = (element, index, item) => {
  thelist.value[index] = item
  console.log('e', element, 'i', item)
}


const thelist = ref(props.data[props.itemKey])
const drag = ref(false)

const dragi = ref([])
const onStart = (e) => {
  console.log('start:', e)
  e.item.classList.add('ring-2', 'ring-amber-3')
}
const onEnd= (e) => {
  console.log('end:', e)
  e.item.classList.remove('ring-2', 'ring-amber-3')
}

const moduloName = props.itemKey+'_'+props.level


const dropzones = ['content', 'scenes', 'options']
const noninput = ['block', 'name']

const copyToast = ref()
const copytxt = (txt) => {
  copy(txt);
  //copyToast.value.show('success', txt)
}


const getRandomCharacters=_=>"xxxx".replace(/x/g,_=>"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"[Math.random()*62|0]);


const fnHide = (element) => {
  if(!element.hasOwnProperty('hidden')){
    element['hidden'] = true
  } else {
    element['hidden'] = !element['hidden']
  }
}

const fnClone = (el, index) => {
  const newel = JSON.parse(JSON.stringify(el))
  if(!el?.symbol){
    newel['name'] = getRandomCharacters()
  }
  //thelist.value.push(newel)

  thelist.value.splice(index+1, 0, updateNamesWithRandomCharacters(newel));
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
const open = (index, element) => {
  syncblock(index, element)
  accordion.value[moduloName+index] = !accordion.value[moduloName+index]
}



const syncblock = (index,element) => {

  if(element.symbol || !builderstore.modulosobj[element.block]){
    return false
  }
  const schema = builderstore.modulosobj[element.block]
  Object.keys(schema.properties).forEach(el => {
    if(!element.hasOwnProperty(el)){
      console.log('adding:'+el)
      const prop = schema.properties[el]
      if(prop.type=='string'){ element[el] = "" }
      if(prop.type=='number'){ element[el] = 0 }
      if(prop.type=='boolean'){ element[el] = false }
      if(prop.type=='array'){ element[el] = [] }
      if(prop.default){ element[el] = prop.default }
    }
  })
  if(!element?.name){ element["name"] = getRandomCharacters() }
}



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
