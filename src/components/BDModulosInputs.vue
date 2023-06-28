<template>
  <div border-l-1 :class="['border-'+levelColor(), 'm-0.5']" text-xs  v-if="itemKey!='block'" :data-level="level">

      <!--STRING inputs-->
      <template v-if="typeof refData[itemKey] != 'object'">
        <div v-if="properties?.input" class="grid grid-cols-4 items-center p-1">
          <!--{{itemKey}} PROPERTY #: {{ properties.input }}-->
          <!-- FILE -->
          <template  v-if="typeof refData[itemKey] == 'string' ">
            <label>{{ itemKey }}</label>
            <div col-span-3>
              <USelect v-model="refData[itemKey]" :options="filesmap" />
            </div>
          </template>
        </div>
         <!--NO INPUT DEFINED -->
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
  level: Number
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
  let col = ''
  if(props.level==0){ col = 'accent-500'}
  if(props.level==1){ col = 'accent-900'}
  if(props.level==2){ col = 'success-500'}
  if(props.level==3){ col = 'success-900'}
  if(props.level==4){ col = 'warning-500'}
  if(props.level==5){ col = 'warning-900'}
  if(props.level==6){ col = 'info-500'}
  if(props.level==7){ col = 'info-900'}
  if(props.level==8){ col = 'primary-500'}
  if(props.level==9){ col = 'primary-900'}
  return col
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
