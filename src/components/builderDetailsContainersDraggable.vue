<script setup>
import draggable from 'vuedraggable'
const builderstore = useBuilderStore()
const props = defineProps({
  data: Object,
  keyval: String,
  level: Number,
  parent: String,
  blockparent: String
})


const thelist = ref(props.data[props.keyval])

const dinamodel = ref({})
const thisname = props.parent+props.level+props.keyval
const open = (key) => {
  dinamodel.value[key] = !dinamodel.value[key]
}
const drag = ref(false)

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

const levelbg = () => {

}

</script>

<template>
  <draggable
      :list="thelist"
      :group="{ name: 'people', pull: true, put: true }"
      item-key="name"
      :class="['ml-1']"
      @start="drag = true"
      @end="drag = false"
      handle=".handle"
    >
      <template #item="{ element,index }">
        <div :class="['!aspect-auto rounded-sm bg-slate-600/10 ring-1 ring-slate-300 p-1 mb-0.5  transition-all', dinamodel[thisname+index]?'shadow !bg-slate-600/30 ring-primary ring-1 !my-2':'', drag?'ring-4':'']">
          <div flex gap-1 items-center justify-between  :class="[' p-1 rounded-sm', dinamodel[thisname+index]?'bg-slate-800/50 text-white':'bg-gradient-to-r from-teal-300 to-primary-300']">
            <div @click="open(thisname+index)" class="handle flex gap-1 items-center justify-between grow px-1 cursor-grab" >
              <template v-if="element?.symbol">
                <div>symbol</div>
                <div >{{ element.symbol }}</div>
              </template>
              <template v-else>
                <div >{{ element.block }} </div>
                <div>{{ element.name }}</div>
              </template>
            </div>
            <UPopover trigger="hover">
              <div i-solar-copy-line-duotone class="cursor-pointer hover:text-white" @click="fnClone(element)" />
              <template #content><span dark:text-white text-xs p-1>Duplicar</span></template>
            </UPopover>
            <UPopover trigger="hover">
              <div i-solar-link-round-bold-duotone class="cursor-pointer hover:text-white"  @click="fnSymbol(element, index)"  />
              <template #content><span dark:text-white text-xs p-1>A símbolo</span></template>
            </UPopover>
            <UPopover trigger="click">
              <div i-solar-trash-bin-trash-linear class="cursor-pointer hover:text-white"   />
              <template #content><UButton size="xs" class="mx-1 px-1" type="primary"  @click="fnDelete(element, index)">Eliminar bloque</UButton></template>
            </UPopover>
          </div>

          <div v-if="dinamodel[thisname+index]"  >
            <BuilderDetailsContainers text-dark v-for="(keyval2, index2) in Object.keys(element)" :key="index2" :data="element" :keyval="keyval2" :parent="keyval" :level="level + 1" :blockparent="blockparent" />
        </div>
        <!-- //FIXME: OPTIONS DESAPARECE -->
        <!--
          {{ Array.isArray(element.content) || Array.isArray(element.options) }}
          <div v-if="element.options">{{ element.options }} {{thelist}}</div>
        -->
        <BuilderDetailsContainersDraggable v-if="Array.isArray(element.content) || Array.isArray(element.options)" :data="element" :keyval="keyval" :level="level" :parent="parent" :blockparent="blockparent"></BuilderDetailsContainersDraggable>

        </div>
      </template>



    </draggable>
</template>
