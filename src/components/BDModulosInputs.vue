<script setup>
const props = defineProps({
  data: Object,
  itemKey: String,
  level: Number,
  parentblock: String,
})
const moduloName = `${props.itemKey}_${props.level}_${Math.round(Math.random() * 100)}`

const builderstore = useBuilderStore()
const refData = ref(props.data)

watch(() => props.data, (nuevo, viejo) => {
  refData.value = false
  refData.value = props.data
}, { deep: true })

const properties = ref(false)

const propertiesInterval = setInterval(() => {
  if (Object.keys(builderstore.modulosobj).length) {
    if (refData.value.block)
      properties.value = builderstore.modulosobj[refData.value.block]?.properties[props.itemKey]

    clearInterval(propertiesInterval)
  }
}, 500)

const filesmap = computed(() => {
  const fm = builderstore.files.map((item) => {
    return {
      label: item.name,
      value: item.url,
      mime: item.mimetype,
    }
  })
  fm.unshift({ label: ' - ', value: ' ' })
  return fm
})

function levelColor() {
  if (props.parentblock) {
    return `${builderstore?.modulosobj[props.parentblock]?.color}-500`
  }
  else {
    let col = ''
    if (props.level === 0)
      col = 'accent-700'
    if (props.level === 1)
      col = 'accent-900'
    if (props.level === 2)
      col = 'success-700'
    if (props.level === 3)
      col = 'success-900'
    if (props.level === 4)
      col = 'warning-700'
    if (props.level === 5)
      col = 'warning-900'
    if (props.level === 6)
      col = 'info-700'
    if (props.level === 7)
      col = 'info-900'
    if (props.level === 8)
      col = 'primary-700'
    if (props.level === 9)
      col = 'primary-900'
    return col
  }
}

const accordion = ref({})
function open() {
  accordion.value[moduloName] = !accordion.value[moduloName]
}

const dropzones = ['content', 'scenes', 'options']

const symbolReplaceFN = ref()
function symbolReplaceNew() {
  if (!symbolReplaceFN.value)
    return false
  refData.value[symbolReplaceFN.value] = ''
  symbolReplaceFN.value = null
}

const blobWindow = ref(false)
</script>

<template>
  <div v-if="itemKey !== 'block'" border-l-1 class="" :class="[`mb-0.5 border-${levelColor()}`]" text-xs :data-level="level">
    <!-- STRING inputs -->
    <template v-if="typeof refData[itemKey] !== 'object'">
      <div v-if="properties?.input" class="grid grid-cols-4 items-center p-1">
        <!-- FILE -->
        <template v-if="typeof refData[itemKey] === 'string' && properties?.input === 'file'">
          <label>{{ itemKey }}<BDMInputsDescription :properties="properties" /></label>
          <div col-span-3>
            <USelect v-model="refData[itemKey]" :options="filesmap">
              <template #option="{ item }">
                <div class="flex gap-1">
                  <div v-if="item?.mime && item.mime.includes('image')" w-8>
                    <img :src="item.value" w-8>
                  </div>
                  <div v-if="item?.mime && item.mime.includes('audio')" w-8 text-center>
                    <div i-solar-play-linear mx-auto />
                  </div>
                  <div v-if="item?.mime && item.mime.includes('video')" w-8 text-center>
                    <div i-solar-video-frame-play-vertical-line-duotone mx-auto />
                  </div>
                  <div v-if="item?.mime && item.mime.includes('video')">
                    <img :src="item.value" w-8>
                  </div>
                  <div>{{ item.label }}</div>
                </div>
              </template>
            </USelect>
          </div>
        </template>
        <!-- COLOR -->
        <template v-if="properties?.input === 'color'">
          <label>{{ itemKey }}<BDMInputsDescription :properties="properties" /></label>
          <div col-span-3>
            <UInput v-model="refData[itemKey]" class="w-full dark:text-neutral" size="sm" type="color" />
          </div>
        </template>
        <!-- NUMBER -->
        <template v-if="properties?.input === 'number'">
          <label>{{ itemKey }}<BDMInputsDescription :properties="properties" /></label>
          <div col-span-3>
            <UInput v-model="refData[itemKey]" class="w-full dark:text-neutral" size="sm" type="number" />
          </div>
        </template>
        <!-- BLOB -->
        <template v-if="properties?.input === 'blob'">
          <label>{{ itemKey }}<BDMInputsDescription :properties="properties" /></label>
          <div col-span-3 @click="blobWindow = true">
            <UButton color="primary" class="gap-1 bg-green px-2 py-0.5">
              <div i-solar-document-text-broken />
              Editar
            </UButton>
          </div>
          <div v-if="blobWindow" class="fixed left-10 top-2 z-10 h-full max-h-3xl w-1/3 flex flex-col border-2 border-white bg-slate-900 p-2 shadow-xl">
            <div class="m-1 ml-auto cursor-pointer" @click="blobWindow = false">
              <div><div i-solar-close-circle-bold class="text-xl text-white" /></div>
            </div>
            <BDMIBlob v-model="refData[itemKey]" />
          </div>
        </template>
        <!-- REPEAT -->
        <template v-if="properties?.input === 'repeat'">
          <label>{{ itemKey }}<BDMInputsDescription :properties="properties" /></label>

          <div col-span-3 mt-1>
            <!--
            <BDModulosInputsRepeater v-model="refData[itemKey]" />
            {{ refData[itemKey] }}
            -->
            <div w-full cursor-pointer px-2 @click="refData[itemKey].push('')">
              +
            </div>
            <!--
            <UInput v-model="repeater" class="w-full dark:text-neutral" size="sm">
              <template #append>
                <div w-full cursor-pointer px-2 @click="repeaterNew">
                  +
                </div>
              </template>
            </UInput>
            -->
          </div>
        </template>
      </div>
      <div v-else-if="properties?.enum" class="grid grid-cols-4 items-center p-1">
        <label>{{ itemKey }}<BDMInputsDescription :properties="properties" /></label>

        <div col-span-3 class="flex flex-wrap gap-2 text-white">
          <URadio v-for="(pItem, pIndex) in properties.enum" :key="pIndex" v-model="refData[itemKey]" :value="pItem" type="primary" class="rounded bg-white px-1">
            {{ pItem }}
          </URadio>
        </div>
      </div>

      <!-- NO INPUT or ENUM DEFINED -->
      <div v-else class="grid grid-cols-4 items-center px-1 py-0.5" :class="[itemKey === 'class' ? 'bg-primary/70' : '', itemKey === 'id' ? 'bg-secondary/30' : '', itemKey === 'text' ? 'bg-rose-600/30' : '']">
        <!-- TEXT -->
        <template v-if="typeof refData[itemKey] === 'string' ">
          <label>{{ itemKey }}<BDMInputsDescription :properties="properties" /></label>
          <div col-span-3>
            <textarea v-if="itemKey === 'class'" v-model="refData[itemKey]" class="textarea w-full border-1 border-primary rounded text-[12px] leading-3 !p-0.5 dark:text-neutral" size="sm" />
            <UInput v-else v-model="refData[itemKey]" class="w-full !p-0.5 !text-[12px] dark:text-neutral" size="sm" />
          </div>
        </template>
        <!-- NUMBER -->
        <template v-if="typeof refData[itemKey] === 'number'">
          <label>{{ itemKey }}<BDMInputsDescription :properties="properties" /></label>
          <div col-span-3>
            <UInput v-model="refData[itemKey]" class="w-full dark:text-neutral" size="sm" type="number" />
          </div>
        </template>
        <!-- boolean -->
        <template v-if="typeof refData[itemKey] === 'boolean'">
          <label>{{ itemKey }}<BDMInputsDescription :properties="properties" /></label>
          <div col-span-3>
            <USwitch v-model="refData[itemKey]" size="sm" />
          </div>
        </template>

        <template v-if="itemKey === 'symbol'">
          <label mt-1>Reemplazo:</label>
          <div col-span-3 mt-1>
            <UInput v-model="symbolReplaceFN" class="w-full dark:text-neutral" size="sm">
              <template #append>
                <div w-full cursor-pointer px-2 @click="symbolReplaceNew">
                  +
                </div>
              </template>
            </UInput>
          </div>
        </template>
      </div>
    </template> <!-- / string inputs -->

    <!-- OBJECT inputs -->
    <div v-else>
      <div :class="[accordion[moduloName] ? `bg-dark !text-${levelColor()}` : `bg-${levelColor()}`]" flex cursor-pointer p-1 text-white @click="open()">
        {{ itemKey }}<BDMInputsDescription :properties="properties" />
        <template v-if="properties?.input === 'repeat'">
          <span><div i-solar-repeat-line-duotone class="text-amber" /></span>
        </template>
        <template v-else>
          {{ properties?.input }}
        </template>
        <!-- : {{ data[itemKey].block }} : {{ properties?.input }} -->
      </div>
      <template v-if="!dropzones.includes(itemKey)">
        <template v-for="(keyNest, indexNested) in Object.keys(refData[itemKey])" :key="indexNested">
          <div v-show="accordion[moduloName]" class="flex items-center">
            <div v-if=" properties.input === 'repeat'" class="px-1">
              <div i-solar-trash-bin-trash-linear class="cursor-pointer text-amber hover:text-white" @click="refData[itemKey].splice(indexNested, 1)" />
            </div>
            <div class="w-full">
              <BDModulosInputs :data="refData[itemKey]" :item-key="keyNest" :level="level + 1" />
            </div>
          </div>
        </template>
        <div v-show="accordion[moduloName]" class="px-1">
          <div i-solar-add-circle-line-duotone class="cursor-pointer text-amber hover:text-white" @click="refData[itemKey].push('')" />
        </div>
      </template>
      <!-- dropzones -->
      <template v-else>
        <BDModulosDropzones :data="refData" :item-key="itemKey" :level="level + 1" />
      </template>
    </div><!-- /objects -->
  </div>
</template>
