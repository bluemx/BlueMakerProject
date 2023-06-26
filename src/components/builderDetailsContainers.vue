<script setup>


const props = defineProps({
  data: Object,
  keyval: String,
  level: Number,
  parent: String,
  blockparent: String
})
const thedata = ref(props.data)
const dinamodel = ref({})
const thisname = props.parent+props.level+props.keyval
const open = (key) => {
  dinamodel.value[key] = !dinamodel.value[key]
}
const drag = ref(false)

const editable = () => {
  let vis = true
  if(props.keyval == 'block')
    vis = false
  return vis
}
const classFN = ref(null)
watch(classFN, (nucl, oldw) => {
  if(classFN.value.length){
    props.data[props.keyval] = classFN.value.join(' ')
  }
}, {deep:true})

if(props.keyval=='class'){
  let classFNval = props.data[props.keyval].trim().split(' ')
  if(classFNval.length==1 && classFNval[0]==""){
    classFNval = []
  }
  classFN.value = classFNval
}

const symbolReplaceFN = ref()
const symbolReplaceNew = () => {
  thedata.value[symbolReplaceFN.value] = ''
  symbolReplaceFN.value = null
}

</script>

<template>
  <div v-if="editable()" my-0.5 p-0.5 text-xs  :class="[`ml-${level * 0.5}`, dinamodel[keyval]?'bg-slate-900/60 text-primary-100 text-bold':'bg-slate-100 text-dark' ]" data-level="level">





    <label flex flex-wrap items-center v-if="typeof (thedata[keyval]) == 'string'">
      <UTag size="sm" type="info" >{{ keyval }}</UTag>

      <template v-if="keyval == 'class' ">
        <UDynamicTags v-model="classFN" text-dark size="sm" mx-1 />
      </template>

      <template v-else>
        <UInput  v-model="thedata[keyval]" text-dark size="sm" mx-1 />
      </template>
    </label>






    <template v-if="typeof (thedata[keyval]) == 'boolean'">
      <USwitch v-model="thedata[keyval]" size="sm"><span >{{ keyval }}</span></USwitch>
    </template>

    <label flex  items-center v-if="typeof (thedata[keyval]) == 'number'">
      <span>{{ keyval }}</span>
      <UInput  v-model="thedata[keyval]" text-dark size="sm" type="number" mx-1 />
    </label>
    <template v-if="typeof (thedata[keyval]) == 'object' && !Array.isArray(thedata[keyval])">

      <div size="sm" @click="open(keyval)" w-full mx-1 cursor-pointer flex>
        <div v-if="dinamodel[keyval]" i-solar:arrow-down-bold></div>
        <div v-else i-solar:alt-arrow-right-line-duotone></div>
        {{keyval}}
      </div>
      <div v-if="dinamodel[keyval]" class="bg-slate-100/50 m-1">
        <BuilderDetailsContainers v-for="(keyval2, index) in Object.keys(thedata[keyval])" :key="index" :data="thedata[keyval]" :keyval="keyval2" :parent="keyval" :level="level + 1" :blockparent="blockparent" />
      </div>
    </template>



    <div v-if="keyval=='symbol'" bg-primary p-1 w-full>
      Reemplazos:
      <div class="flex gap-1 px-1 m-1">
        <UInput v-model="symbolReplaceFN" placeholder="Campo" size="xs"/>
        <UButton type="secondary" :disabled="!symbolReplaceFN" @click="symbolReplaceNew">+</UButton>
      </div>

    </div>

    <template v-if="typeof (thedata[keyval]) == 'object' && Array.isArray(thedata[keyval]) && parent!='content' ">
      <div class="flex bg-slate-1 text-dark w-fit rounded-t pt-0.5 px-2 ">
        <div i-solar-list-arrow-down-minimalistic-bold-duotone></div>
        {{keyval}}
      </div>
      <BuilderDetailsContainersDraggable  :key="thisname" :data="thedata" :keyval="keyval" :level="level" :parent="parent" :blockparent="blockparent" ></BuilderDetailsContainersDraggable>
    </template>


  </div>

</template>
