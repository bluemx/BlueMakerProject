<script setup>
const props = defineProps({
  data: Object,
  keyval: String,
  level: Number,
  parent: String,
  blockparent: String,
})
const thedata = ref(props.data)
const dinamodel = ref({})
const thisname = props.parent + props.level + props.keyval
function open(key) {
  dinamodel.value[key] = !dinamodel.value[key]
}
const drag = ref(false)

function editable() {
  let vis = true
  if (props.keyval === 'block')
    vis = false
  return vis
}
const classFN = ref(null)
watch(classFN, (nucl, oldw) => {
  if (classFN.value.length)
    props.data[props.keyval] = classFN.value.join(' ')
}, { deep: true })

if (props.keyval === 'class') {
  let classFNval = props.data[props.keyval].trim().split(' ')
  if (classFNval.length === 1 && classFNval[0] === '')
    classFNval = []

  classFN.value = classFNval
}

const symbolReplaceFN = ref()
function symbolReplaceNew() {
  thedata.value[symbolReplaceFN.value] = ''
  symbolReplaceFN.value = null
}
</script>

<template>
  <div v-if="editable()" my-0.5 p-0.5 text-xs :class="[`ml-${level * 0.5}`, dinamodel[keyval] ? 'bg-slate-900/60 text-primary-100 text-bold' : 'bg-slate-100 text-dark']" data-level="level">
    <label v-if="typeof (thedata[keyval]) === 'string'" flex flex-wrap items-center>
      <UTag size="sm" type="info">{{ keyval }}</UTag>

      <template v-if="keyval === 'class' ">
        <UDynamicTags v-model="classFN" size="sm" mx-1 text-dark />
      </template>

      <template v-else>
        <UInput v-model="thedata[keyval]" size="sm" mx-1 text-dark />
      </template>
    </label>

    <template v-if="typeof (thedata[keyval]) === 'boolean'">
      <USwitch v-model="thedata[keyval]" size="sm">
        <span>{{ keyval }}</span>
      </USwitch>
    </template>

    <label v-if="typeof (thedata[keyval]) === 'number'" flex items-center>
      <span>{{ keyval }}</span>
      <UInput v-model="thedata[keyval]" size="sm" type="number" mx-1 text-dark />
    </label>
    <template v-if="typeof (thedata[keyval]) === 'object' && !Array.isArray(thedata[keyval])">
      <div size="sm" mx-1 w-full flex cursor-pointer @click="open(keyval)">
        <div v-if="dinamodel[keyval]" i-solar:arrow-down-bold />
        <div v-else i-solar:alt-arrow-right-line-duotone />
        {{ keyval }}
      </div>
      <div v-if="dinamodel[keyval]" class="m-1 bg-slate-100/50">
        <BuilderDetailsContainers v-for="(keyval2, index) in Object.keys(thedata[keyval])" :key="index" :data="thedata[keyval]" :keyval="keyval2" :parent="keyval" :level="level + 1" :blockparent="blockparent" />
      </div>
    </template>

    <div v-if="keyval === 'symbol'" w-full bg-primary p-1>
      Reemplazos:
      <div class="m-1 flex gap-1 px-1">
        <UInput v-model="symbolReplaceFN" placeholder="Campo" size="xs" />
        <UButton type="secondary" :disabled="!symbolReplaceFN" @click="symbolReplaceNew">
          +
        </UButton>
      </div>
    </div>

    <template v-if="typeof (thedata[keyval]) === 'object' && Array.isArray(thedata[keyval]) && parent !== 'content' ">
      <div class="w-fit flex rounded-t bg-slate-1 px-2 pt-0.5 text-dark">
        <div i-solar-list-arrow-down-minimalistic-bold-duotone />
        {{ keyval }}
      </div>
      <BuilderDetailsContainersDraggable :key="thisname" :data="thedata" :keyval="keyval" :level="level" :parent="parent" :blockparent="blockparent" />
    </template>
  </div>
</template>
