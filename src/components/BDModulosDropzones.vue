<script setup>
import { useClipboard, useStorage } from '@vueuse/core'

import draggable from 'vuedraggable'

const props = defineProps({
  data: Object,
  itemKey: String,
  level: Number,
  parentblock: String,
})
const source = ref('Hello')
const { text, copy, copied, isSupported } = useClipboard({ source })
const builderstore = useBuilderStore()
const thelist = ref(props.data[props.itemKey])
const drag = ref(false)
const dragi = ref([])

function templateLoad(element, index, item) {
  thelist.value[index] = item
  // console.log('e', element, 'i', item)
}

function onStart(e) {
  // console.log('start:', e)
  e.item.classList.add('ring-2', 'ring-amber-3')
}
function onEnd(e) {
  // console.log('end:', e)
  e.item.classList.remove('ring-2', 'ring-amber-3')
}

const moduloName = `${props.itemKey}_${props.level}`

const dropzones = ['content', 'scenes', 'options']
const noninput = ['block', 'name']

const copyToast = ref()
function copytxt(txt) {
  copy(txt)
  // copyToast.value.show('success', txt)
}

const getRandomCharacters = _ => 'xxxx'.replace(/x/g, _ => '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'[Math.random() * 62 | 0])

function moveFN(moveto, index) {
  if (moveto === -1 && index === 0)
    return false

  const element = thelist.value.splice(index, 1)[0]
  thelist.value.splice(index + moveto, 0, element)
}

function fnHide(element) {
  if (!element.hasOwnProperty('hidden'))
    element.hidden = true
  else
    element.hidden = !element.hidden
}

function fnClone(el, index) {
  const newel = JSON.parse(JSON.stringify(el))
  if (!el?.symbol) {
    newel.name = getRandomCharacters()
    newel.id = getRandomCharacters()
  }
  // thelist.value.push(newel)

  thelist.value.splice(index + 1, 0, updateNamesWithRandomCharacters(newel))
}
function fnSymbol(el, index) {
  if (!el.name)
    el.name = getRandomCharacters()
  const newel = JSON.parse(JSON.stringify(el))

  const thename = newel.name
  delete newel.name
  builderstore.doc.content.symbols[thename] = newel

  thelist.value[index] = {
    symbol: thename,
  }
}

function fnDelete(el, index) {
  thelist.value.splice(index, 1)
}

// const collapsecontent = ref({})
const collapsecontent = useStorage(`${builderstore.dockey}-collapsecontent`, {})
function collapseFN(index, element) {
  collapsecontent.value[moduloName + index] = !collapsecontent.value[moduloName + index]
}

const accordion = ref({})

function open(index, element) {
  mouseoverFN(element)
  syncblock(index, element)
  accordion.value[moduloName + index] = !accordion.value[moduloName + index]
}

function syncblock(index, element) {
  if (element.symbol || !builderstore.modulosobj[element.block])
    return false

  const schema = builderstore.modulosobj[element.block]
  Object.keys(schema.properties).forEach((el) => {
    if (!element.hasOwnProperty(el)) {
      // console.log('adding:'+el)
      const prop = schema.properties[el]
      if (prop.type === 'string')
        element[el] = ''
      if (prop.type === 'number')
        element[el] = 0
      if (prop.type === 'boolean')
        element[el] = false
      if (prop.type === 'array')
        element[el] = []
      if (prop.default)
        element[el] = prop.default
    }
  })
  if (!element?.name)
    element.name = getRandomCharacters()
}

function updateNamesWithRandomCharacters(objitem) {
  const obj = objitem
  for (const key in obj) {
    if (typeof obj[key] === 'object')
      updateNamesWithRandomCharacters(obj[key]) // Recursively call the function for nested objects
    else if (key === 'name')
      obj[key] = getRandomCharacters() // Update the value with random characters
    else if (key === 'id')
      obj[key] = obj[key] + getRandomCharacters() // Update the value with random characters
  }
  return obj
}

function mouseoverFN(item) {
  if (item.name)
    document.querySelector('iframe').contentWindow.postMessage(JSON.stringify({ type: 'hover', name: item.name }), '*')
}

function colorvariation(element) {
  let lclass = ''
  // if(props.parentblock === element.block){
  lclass = `border-l-2 border-${builderstore?.modulosobj[props.parentblock]?.color}-`
  if (props.level % 2 === 1)
    lclass += '700'

  else
    lclass += '500'

  // }
  return lclass
}
function handlegradient(element) {
  let fromcolor = ''
  let tocolor = ''

  if (props.parentblock === element.block) {
    if (props.level % 2 === 1) {
      fromcolor = `from-${builderstore?.modulosobj[props.parentblock]?.color}-700`
      tocolor = `to-${builderstore?.modulosobj[props.parentblock]?.color}-900`
    }
    else {
      fromcolor = `from-${builderstore?.modulosobj[props.parentblock]?.color}-900`
      tocolor = `to-${builderstore?.modulosobj[props.parentblock]?.color}-700`
    }
  }
  const lclass = `bg-gradient-to-r ${fromcolor} ${tocolor}`
  return lclass
}
</script>

<template>
  <draggable
    v-if="Object.keys(builderstore.modulosobj).length"
    :list="thelist"
    :group="{ name: 'people', pull: true, put: true }"
    item-key="name" class="min-h-[30px] flex flex-col gap-0.5 border-b-1 border-l-1 border-t-1 border-b-dashed border-t-dashed py-1 pl-1 pr-0.5"
    :class="[`border-${builderstore?.modulosobj[parentblock]?.color}-500`, `bg-${builderstore?.modulosobj[parentblock]?.color}-500/10`]"
    handle=".handle"
    @start="onStart"
    @end="onEnd"
  >
    <template #item="{ element, index }">
      <div class="ring-accent hover:ring-1" :class="[drag ? 'ring-1 ring-accent' : '', element.hidden ? 'opacity-50' : '', colorvariation(element)] ">
        <div class="xyz relative flex items-center justify-center gap-1 border-b-1 border-l-1 border-t-1 border-b-slate-500" :class="[handlegradient(element), `border-${builderstore?.modulosobj[element.block]?.color}-500`] " @mouseover="mouseoverFN(element)">
          <div class="handle flex grow cursor-grab items-center justify-between gap-1 p-0.5 px-1">
            <div w-full flex grow items-center @click="open(index, element)">
              <div :class="`flex gap-0.5 text-${builderstore?.modulosobj[element.block]?.color}-500`">
                <div class="text-[10px]">
                  {{ level }}
                </div>
                <template v-if="element.block === 'image' && element.file">
                  <img class="mr-1 h-4 w-4" :src="element.file">
                </template>
                <template v-else>
                  <div v-if="element.marker" class="hasicon mr-1" v-html="element.marker" />
                  <div v-if="builderstore?.modulosobj[element.block]?.icon" class="hasicon mr-1 h-4 w-4" v-html="builderstore.modulosobj[element.block].icon" />
                </template>
              </div>
              <template v-if="element?.symbol">
                <div flex grow items-center justify-between class="relative items-center from-red-800 to-info bg-gradient-to-r">
                  <div>symbol</div>
                  <div>{{ element.symbol }}</div>
                </div>
              </template>

              <template v-if="element.block === 'separator'">
                <div flex grow items-center justify-between class="relative items-center from-red-800 to-info bg-gradient-to-r" :style="`background:${element.color};`">
                  <div>{{ element.text }}</div>
                </div>
              </template>

              <template v-else>
                <div flex grow items-center justify-between>
                  <div class="flex items-center gap-2">
                    <div>{{ element.block }}</div>
                    <div v-if="element.block === 'text' && element.text" class="text-ellipsis bg-red-900/50 p0.5 text-[10px] leading-2">
                      {{ element.text.substring(0, 10) }}
                    </div>
                    <div v-if="element.block === 'word' && element.word" class="text-ellipsis bg-teal-600/50 p0.5 text-[10px] leading-2">
                      {{ element.word.substring(0, 10) }}
                    </div>
                    <div v-if="element.block === 'image' && element.file" class="text-ellipsis bg-blue-900/50 p0.5 text-[10px] leading-2">
                      {{ (element.file.split('/').slice(-1)[0]).substring(0, 10) }}
                    </div>
                    <div v-if="element.block === 'icon' && element.icon" class="text-ellipsis bg-gray-900/50 p0.5 text-[10px] leading-2">
                      {{ element.icon.substring(0, 10) }}
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </div>

          <!-- ACTIONS -->
          <div class="flex items-center justify-center gap-x-1 gap-y-0.5 from-white to-white/10 bg-gradient-to-l px-1">
            <template v-if="element?.name">
              <div class="flex text-[10px]">
                <div>N:</div><div class="cursor-pointer rounded bg-dark/20 active:text-lime hover:text-amber" @click="copytxt(element.name)">
                  {{ element.name.substring(0, 4) }}
                </div>
              </div>
            </template>
            <template v-if="element?.id">
              <div class="flex text-[10px]">
                <div>I:</div><div class="max-w-[40px] cursor-pointer overflow-x-hidden rounded bg-white/20 active:text-lime hover:text-amber" @click="copytxt(element.id)">
                  {{ element.id.substring(0, 4) }}
                </div>
              </div>
            </template>

            <div v-if="element?.content" class="leading-2" :class="[collapsecontent[moduloName + index] ? 'bg-lime-300 rounded' : '']">
              <UPopover trigger="hover">
                <div class="i-solar-list-down-minimalistic-line-duotone cursor-pointer text-dark hover:text-white" @click="collapseFN(index, element)" />
                <template #content>
                  <span p-1 text-xs dark:text-white>Vista de contenido</span>
                </template>
              </UPopover>
            </div>

            <UPopover trigger="hover" class="leading-2">
              <div class="i-solar-arrow-to-top-left-bold-duotone cursor-pointer text-dark hover:text-white" @click="moveFN(-1, index)" />
              <template #content>
                <span p-1 text-xs dark:text-white>Mover arriba</span>
              </template>
            </UPopover>
            <UPopover trigger="hover" class="leading-2">
              <div class="i-solar-arrow-to-down-left-bold-duotone cursor-pointer text-dark hover:text-white" @click="moveFN(+1, index)" />
              <template #content>
                <span p-1 text-xs dark:text-white>Mover abajo</span>
              </template>
            </UPopover>

            <UPopover trigger="hover" class="leading-2">
              <div class="cursor-pointer text-dark hover:text-white" :class="[element.hidden ? 'i-solar-eye-closed-bold-duotone' : 'i-solar-eye-broken']" @click="fnHide(element)" />
              <template #content>
                <span p-1 text-xs dark:text-white>Ocultar/Mostrar</span>
              </template>
            </UPopover>

            <UPopover trigger="hover" class="leading-2">
              <div i-solar-copy-line-duotone class="cursor-pointer text-dark hover:text-white" @click="fnClone(element, index)" />
              <template #content>
                <span p-1 text-xs dark:text-white>Duplicar</span>
              </template>
            </UPopover>

            <UPopover trigger="click" class="leading-2">
              <div i-solar-cloud-upload-line-duotone class="cursor-pointer text-dark hover:text-white" />
              <template #content>
                <BDModulosSaveTemplate :data="element" />
              </template>
            </UPopover>

            <UPopover trigger="click" class="leading-2">
              <div i-solar-trash-bin-trash-linear class="cursor-pointer text-dark hover:text-white" />
              <template #content>
                <UButton size="xs" class="mx-1 px-1" type="primary" @click="fnDelete(element, index)">
                  Eliminar bloque
                </UButton>
              </template>
            </UPopover>
          </div>
        <!-- actions -->
        </div>

        <template v-if="accordion[moduloName + index] && element.block === 'template'">
          <BDModulosTemplates :data="element" @loadBlock="templateLoad(element, index, $event)" />
        </template>

        <div v-if="accordion[moduloName + index]">
          <template v-for="(itemNest, indexNest) in Object.keys(element)" :key="indexNest">
            <template v-if="!dropzones.includes(itemNest) && !noninput.includes(itemNest)">
              <div>
                <BDModulosInputs :data="element" :item-key="itemNest" :level="level + 1" :parentblock="element.block" />
              </div>
            </template>
          </template>

          <div v-if="!element?.symbol" class="w-full flex justify-end p-1 text-right">
            <UButton size="xs" class="px-2" @click="fnSymbol(element, index)">
              Convertir en símbolo
            </UButton>
          </div>
        </div>

        <template v-if="!collapsecontent[moduloName + index]">
          <template v-for="(itemNest, indexNest) in Object.keys(element)" :key="indexNest">
            <template v-if="dropzones.includes(itemNest) && Array.isArray(element[itemNest])">
              <div class="">
                <BDModulosDropzones :data="element" :item-key="itemNest" :level="level + 1" :parentblock="element.block" />
              </div>
            </template>
          </template>
        </template>
      </div>
    </template>
  </draggable>
  <UToast ref="copyToast" position="bottom" align="left" />
</template>
