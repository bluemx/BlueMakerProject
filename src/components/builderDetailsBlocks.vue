<script setup>
import draggable from 'vuedraggable'

const builderstore = useBuilderStore()
const drag = ref(false)
const modules = ref()

async function loadModulos() {
  modules.value = await builderstore.loadModulos()
}
const getRandomCharacters = _ => 'xxxx'.replace(/x/g, _ => '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'[Math.random() * 62 | 0])

function clonedModule(i) {
  const props = JSON.parse(JSON.stringify(i.schema.properties))
  const item = {}
  Object.keys(i.schema.properties).forEach((el) => {
    const prop = props[el]

    if (prop.type === 'string')
      item[el] = ''

    if (prop.type === 'boolean')
      item[el] = false

    if (prop.type === 'array')
      item[el] = []

    if (prop.default)
      item[el] = prop.default
  })

  item.block = i.name
  item.name = getRandomCharacters()
  item.id = getRandomCharacters()
  // item["schema"] = props

  return item
}
loadModulos()
</script>

<template>
  <draggable
    :list="modules"
    :group="{ name: 'people', pull: 'clone', put: false }"
    item-key="id"
    class="grid grid-cols-4 gap-0.5 p-0.5 lg:grid-cols-9 md:grid-cols-7" :class="[drag ? 'bg-pink' : '']"
    :sort="false" :clone="clonedModule"
    @start="drag = true"
    @end="drag = false"
  >
    <template #item="{ element }">
      <div :title="element.name" flex flex-col cursor-grab items-center justify-center bg-white dark:bg-slate-8>
        <div v-html="element.icon" />
        <div class="break-words text-[6px]">
          {{ element.name }}
        </div>
      </div>
    </template>
  </draggable>
</template>
