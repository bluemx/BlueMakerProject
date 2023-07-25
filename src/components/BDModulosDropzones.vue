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
    <div :class="['hover:ring-1 ring-accent', drag?'ring-1 ring-accent':'',  element.hidden?'opacity-50':'', colorvariation(element)] ">


      <div @mouseover="mouseoverFN(element)" class="flex gap-1 items-center justify-center relative xyz" :class="[handlegradient(element), 'border-l-1 border-t-1 border-b-1 border-b-slate-500', 'border-'+builderstore?.modulosobj[element.block]?.color+'-500'] " >
        <div  class="handle flex gap-1 items-center justify-between grow px-1 cursor-grab p-0.5">
          <div flex items-center w-full grow  @click="open(index, element)" >
            <div :class="'flex gap-0.5 text-'+builderstore?.modulosobj[element.block]?.color+'-500'">
              <div class="text-[10px]">{{ level }}</div>
              <template v-if="element.block=='image' && element.file">
                <img class="w-4 h-4 mr-1" :src="element.file">
              </template>
              <template v-else>
                <div class="hasicon mr-1" v-if="element.marker" v-html="element.marker"></div>
                <div class="hasicon w-4 h-4 mr-1" v-if="builderstore?.modulosobj[element.block]?.icon" v-html="builderstore.modulosobj[element.block].icon"></div>
              </template>
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
                <div class="flex gap-2 items-center">
                  <div>{{ element.block }}</div>
                  <div class="text-[10px] text-ellipsis leading-2 bg-red-900/50 p0.5" v-if="element.block=='text' && element.text">{{ element.text.substring(0, 10) }}</div>
                  <div class="text-[10px] text-ellipsis leading-2 bg-teal-600/50 p0.5" v-if="element.block=='word' && element.word">{{ element.word.substring(0, 10) }}</div>
                  <div class="text-[10px] text-ellipsis	leading-2 bg-blue-900/50 p0.5" v-if="element.block=='image' && element.file">{{ (element.file.split('/').slice(-1)[0]).substring(0, 10) }}</div>
                  <div class="text-[10px] text-ellipsis	leading-2 bg-gray-900/50 p0.5" v-if="element.block=='icon' && element.icon">{{ element.icon.substring(0, 10)}}</div>
                </div>
              </div>
            </template>
          </div>
        </div>

        <!-- ACTIONS -->
        <div class="flex gap-y-0.5 gap-x-1 items-center justify-center bg-gradient-to-l from-white to-white/10 px-1 ">
          <template v-if="element?.name">
            <div class="flex text-[10px]">
              <div>N:</div><div @click="copytxt(element.name)"  class="cursor-pointer bg-dark/20 rounded hover:text-amber active:text-lime">{{ element.name.substring(0, 4) }}</div>
            </div>
          </template>
          <template v-if="element?.id">
            <div class="flex text-[10px]">
              <div>I:</div><div @click="copytxt(element.id)" class="max-w-[40px] overflow-x-hidden cursor-pointer bg-white/20 rounded hover:text-amber active:text-lime">{{ element.id.substring(0, 4) }}</div>
            </div>
          </template>


          <div :class="['leading-2', collapsecontent[moduloName+index]?'bg-lime-300 rounded':'']" v-if="element?.content">
              <UPopover trigger="hover">
              <div :class="['i-solar-list-down-minimalistic-line-duotone', 'cursor-pointer text-dark hover:text-white']" @click="collapseFN(index, element)" />
              <template #content><span dark:text-white text-xs p-1>Vista de contenido</span></template>
            </UPopover>

          </div>

          <UPopover trigger="hover" class="leading-2">
            <div  :class="['i-solar-arrow-to-top-left-bold-duotone', 'cursor-pointer text-dark hover:text-white']" @click="moveFN(-1, index)" />
            <template #content><span dark:text-white text-xs p-1>Mover arriba</span></template>
          </UPopover>
          <UPopover trigger="hover" class="leading-2">
            <div  :class="['i-solar-arrow-to-down-left-bold-duotone', 'cursor-pointer text-dark hover:text-white']" @click="moveFN(+1, index)" />
            <template #content><span dark:text-white text-xs p-1>Mover abajo</span></template>
          </UPopover>

          <UPopover trigger="hover" class="leading-2">
            <div  :class="[element.hidden?'i-solar-eye-closed-bold-duotone':'i-solar-eye-broken', 'cursor-pointer text-dark hover:text-white']" @click="fnHide(element)" />
            <template #content><span dark:text-white text-xs p-1>Ocultar/Mostrar</span></template>
          </UPopover>

          <UPopover trigger="hover" class="leading-2">
            <div i-solar-copy-line-duotone class="cursor-pointer text-dark hover:text-white" @click="fnClone(element, index)" />
            <template #content><span dark:text-white text-xs p-1>Duplicar</span></template>
          </UPopover>

          <UPopover trigger="click" class="leading-2">
            <div i-solar-cloud-upload-line-duotone class="cursor-pointer text-dark  hover:text-white"   />
            <template #content>
              <BDModulosSaveTemplate :data="element"></BDModulosSaveTemplate>
            </template>
          </UPopover>

          <UPopover trigger="click" class="leading-2">
            <div i-solar-trash-bin-trash-linear class="cursor-pointer text-dark  hover:text-white"   />
            <template #content><UButton size="xs" class="mx-1 px-1" type="primary"  @click="fnDelete(element, index)">Eliminar bloque</UButton></template>
          </UPopover>
        </div>
        <!-- actions-->

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



      <template v-for="(itemNest, indexNest) in Object.keys(element)" :key="indexNest" v-if="!collapsecontent[moduloName+index]">
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
//import { useStorage } from '@vueuse/core'

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
  //console.log('e', element, 'i', item)
}


const thelist = ref(props.data[props.itemKey])
const drag = ref(false)

const dragi = ref([])
const onStart = (e) => {
  //console.log('start:', e)
  e.item.classList.add('ring-2', 'ring-amber-3')
}
const onEnd= (e) => {
  //console.log('end:', e)
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

const moveFN = (moveto, index) => {
  if(moveto == -1 && index==0){ return false }

  const element = thelist.value.splice(index, 1)[0]
  thelist.value.splice(index+moveto, 0, element)

}

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
    newel['id'] = getRandomCharacters()
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



//const collapsecontent = ref({})
const collapsecontent = useStorage(builderstore.dockey+'-collapsecontent',{})
const collapseFN = (index, element) => {
  collapsecontent.value[moduloName+index] = !collapsecontent.value[moduloName+index]
}



const accordion = ref({})

const open = (index, element) => {
  mouseoverFN(element)
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
      //console.log('adding:'+el)
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
    } else if (key === 'id') {
      obj[key] = obj[key] + getRandomCharacters(); // Update the value with random characters
    }
  }
  return obj
}


const mouseoverFN = (item) => {
  if(item.name){
    document.querySelector('iframe').contentWindow.postMessage(JSON.stringify({type: 'hover', name: item.name}), '*')
  }
}


const colorvariation =(element) => {
  let lclass = ''
  //if(props.parentblock == element.block){
    lclass = 'border-l-2 border-'+builderstore?.modulosobj[props.parentblock]?.color+'-'
    if(props.level%2 === 1){
      lclass += '700'
    } else {
      lclass += '500'
    }
  //}
  return lclass
}
const handlegradient = (element) => {
  let fromcolor = ''
  let tocolor = ''

  if(props.parentblock == element.block){
    if(props.level%2 === 1){
      fromcolor = 'from-' + builderstore?.modulosobj[props.parentblock]?.color+'-700'
      tocolor = 'to-' + builderstore?.modulosobj[props.parentblock]?.color+'-900'
    } else {
      fromcolor = 'from-' + builderstore?.modulosobj[props.parentblock]?.color+'-900'
      tocolor = 'to-' + builderstore?.modulosobj[props.parentblock]?.color+'-700'
    }
  }
  let lclass = 'bg-gradient-to-r ' + fromcolor +' '+tocolor
  return lclass
}

</script>
