<template>
  <div border-l-1 :class="['mb-0.5 border-'+levelColor(), '']" text-xs  v-if="itemKey!='block'" :data-level="level">

      <!--STRING inputs-->
      <template v-if="typeof refData[itemKey] != 'object'">
        <div v-if="properties?.input" class="grid grid-cols-4 items-center p-1">
          <!-- FILE -->
          <template  v-if="typeof refData[itemKey] == 'string' && properties?.input == 'file'">
            <label>{{ itemKey }}</label>
            <div col-span-3>
              <USelect v-model="refData[itemKey]" :options="filesmap" />
            </div>
          </template>
          <template  v-if="properties?.input == 'color'">
            <label>{{ itemKey }}</label>
            <div col-span-3>
              <UInput v-model="refData[itemKey]" class="dark:text-neutral w-full" size="sm" type="color" />
            </div>
          </template>
        </div>
        <div v-else-if="properties?.enum" class="grid grid-cols-4 items-center p-1">
          <label>{{ itemKey }}</label>
          <div col-span-3 class="flex flex-wrap text-white gap-2">
            <URadio v-for="(pItem, pIndex) in properties.enum" :key="pIndex" v-model="refData[itemKey]" :value="pItem" type="primary" class="bg-white px-1 rounded">
              {{ pItem }}
            </URadio>
          </div>
        </div>
         <!--NO INPUT or ENUM DEFINED -->
        <div v-else class="grid grid-cols-4 items-center p-1">
          <!-- TEXT-->
          <template  v-if="typeof refData[itemKey] == 'string' ">
            <label>{{ itemKey }}</label>
            <div col-span-3><UInput v-model="refData[itemKey]" class="dark:text-neutral w-full" size="sm" /></div>
          </template>
          <!-- NUMBER -->
          <template v-if="typeof refData[itemKey] == 'number'">
            <label>{{ itemKey }}</label>
            <div col-span-3><UInput v-model="refData[itemKey]" class="dark:text-neutral w-full" size="sm" type="number" /></div>
          </template>
          <!-- boolean -->
          <template v-if="typeof refData[itemKey] == 'boolean'">
            <label>{{ itemKey }}</label>
            <div col-span-3><USwitch v-model="refData[itemKey]" size="sm" /></div>
          </template>

          <template v-if="itemKey=='symbol'">
            <label mt-1>Reemplazo:</label>
            <div col-span-3 mt-1>
              <UInput v-model="symbolReplaceFN" class="dark:text-neutral w-full" size="sm">
                <template #append>
                  <div w-full px-2 cursor-pointer @click="symbolReplaceNew">+</div>
                </template>
              </UInput>
            </div>

          </template>
        </div>
      </template> <!--/ string inputs -->


      <!-- OBJECT inputs-->
      <div v-else >

        <div p-1 :class="['bg-'+levelColor()]" text-white @click="open()" cursor-pointer>
          {{ itemKey }} {{ properties?.input }}
          <!-- : {{ data[itemKey].block }} : {{ properties?.input }}-->
        </div>
          <template v-if="!dropzones.includes(itemKey)" v-for="(keyNest, indexNested) in Object.keys(refData[itemKey])" :key="indexNested">
            <div v-show="accordion[moduloName]">
            <BDModulosInputs :data="refData[itemKey]" :item-key="keyNest" :level="level+1"></BDModulosInputs>
            </div>
          </template>
          <!-- dropzones-->
          <template v-else>
            <BDModulosDropzones :data="refData" :item-key="itemKey" :level="level+1"></BDModulosDropzones>
          </template>
      </div><!-- /objects-->

  </div>
</template>
<script setup>
import { watchOnce } from '@vueuse/core'

const props = defineProps({
  data: Object,
  itemKey: String,
  level: Number,
  parentblock: String
})
const moduloName = props.itemKey+'_'+props.level+'_'+(Math.round(Math.random()*100))

const builderstore = useBuilderStore()
const refData = ref(props.data)

const properties = ref(false)


const propertiesInterval = setInterval(()=>{
  if(Object.keys(builderstore.modulosobj).length){
    if(refData.value.block){
      properties.value = builderstore.modulosobj[refData.value.block]?.properties[props.itemKey]
    }
    clearInterval(propertiesInterval)
  }
}, 500)

const filesmap = computed(()=>{

  let fm = builderstore.files.map((item)=>{
    return {
      label: item.name,
      value: item.url,
    }
  })
  fm.unshift({label:' - ', value: ' '})
  return fm
})


const levelColor = () => {





  if(props.parentblock){
    return builderstore?.modulosobj[props.parentblock]?.color+'-500'

  } else {
    let col = ''
    if(props.level==0){ col = 'accent-700'}
    if(props.level==1){ col = 'accent-900'}
    if(props.level==2){ col = 'success-700'}
    if(props.level==3){ col = 'success-900'}
    if(props.level==4){ col = 'warning-700'}
    if(props.level==5){ col = 'warning-900'}
    if(props.level==6){ col = 'info-700'}
    if(props.level==7){ col = 'info-900'}
    if(props.level==8){ col = 'primary-700'}
    if(props.level==9){ col = 'primary-900'}
    return col
  }
}

const accordion = ref({})
const open = () => {
  accordion.value[moduloName] = !accordion.value[moduloName]
}


const dropzones = ['content', 'scenes', 'options']


const symbolReplaceFN = ref()
const symbolReplaceNew = () => {
  if(!symbolReplaceFN.value){ return false }
  refData.value[symbolReplaceFN.value] = ''
  symbolReplaceFN.value = null
}

</script>
