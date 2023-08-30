<script setup>
import draggable from 'vuedraggable'

const props = defineProps({
  data: Object,
  keyval: String,
  level: Number,
  parent: String,
  blockparent: String,
})
const builderstore = useBuilderStore()
const thelist = ref(props.data[props.keyval])

const dinamodel = ref({})
const thisname = props.parent + props.level + props.keyval
function open(key) {
  dinamodel.value[key] = !dinamodel.value[key]
}
const drag = ref(false)

const getRandomCharacters = _ => 'xxxx'.replace(/x/g, _ => '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'[Math.random() * 62 | 0])

function fnClone(el) {
  const newel = JSON.parse(JSON.stringify(el))
  if (!el?.symbol)
    newel.name = getRandomCharacters()

  thelist.value.push(newel)
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

function levelbg() {

}
</script>

<template>
  <draggable
    :list="thelist"
    :group="{ name: 'people', pull: true, put: true }"
    item-key="name"
    class="ml-1"
    handle=".handle"
    @start="drag = true"
    @end="drag = false"
  >
    <template #item="{ element, index }">
      <div class="mb-0.5 rounded-sm bg-slate-600/10 p-1 ring-1 ring-slate-300 transition-all !aspect-auto" :class="[dinamodel[thisname + index] ? 'shadow !bg-slate-600/30 ring-primary ring-1 !my-2' : '', drag ? 'ring-4' : '']">
        <div flex items-center justify-between gap-1 class="rounded-sm p-1" :class="[dinamodel[thisname + index] ? 'bg-slate-800/50 text-white' : 'bg-gradient-to-r from-teal-300 to-primary-300']">
          <div class="handle flex grow cursor-grab items-center justify-between gap-1 px-1" @click="open(thisname + index)">
            <template v-if="element?.symbol">
              <div>symbol</div>
              <div>{{ element.symbol }}</div>
            </template>
            <template v-else>
              <div>{{ element.block }} </div>
              <div>{{ element.name }}</div>
            </template>
          </div>
          <UPopover trigger="hover">
            <div i-solar-copy-line-duotone class="cursor-pointer hover:text-white" @click="fnClone(element)" />
            <template #content>
              <span p-1 text-xs dark:text-white>Duplicar</span>
            </template>
          </UPopover>
          <UPopover trigger="hover">
            <div i-solar-link-round-bold-duotone class="cursor-pointer hover:text-white" @click="fnSymbol(element, index)" />
            <template #content>
              <span p-1 text-xs dark:text-white>A símbolo</span>
            </template>
          </UPopover>
          <UPopover trigger="click">
            <div i-solar-trash-bin-trash-linear class="cursor-pointer hover:text-white" />
            <template #content>
              <UButton size="xs" class="mx-1 px-1" type="primary" @click="fnDelete(element, index)">
                Eliminar bloque
              </UButton>
            </template>
          </UPopover>
        </div>

        <div v-if="dinamodel[thisname + index]">
          <BuilderDetailsContainers v-for="(keyval2, index2) in Object.keys(element)" :key="index2" text-dark :data="element" :keyval="keyval2" :parent="keyval" :level="level + 1" :blockparent="blockparent" />
        </div>
        <!-- //FIXME: OPTIONS DESAPARECE -->
        <!--
          {{ Array.isArray(element.content) || Array.isArray(element.options) }}
          <div v-if="element.options">{{ element.options }} {{thelist}}</div>
        -->
        <BuilderDetailsContainersDraggable v-if="Array.isArray(element.content) || Array.isArray(element.options)" :data="element" :keyval="keyval" :level="level" :parent="parent" :blockparent="blockparent" />
      </div>
    </template>
  </draggable>
</template>
