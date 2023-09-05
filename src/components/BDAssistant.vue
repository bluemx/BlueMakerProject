<script setup>
import objects from './BDAssistantObjects.js'

const builderstore = useBuilderStore()

const scenesOBJ = ref([])

const dialog = ref()

const sceneBase = {
  instruction: '',
  text: '',
}
const scenes = ref([])
function sceneAdd() { scenes.value.push({ ...sceneBase }) }
function sceneDelete(index) { scenes.value.splice(index, 1) }
function open() {
  dialog.value.showModal()
}
function close() {
  dialog.value.close()
}

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

function generar() {
  scenes.value.forEach((element, index) => {
    const content = JSON.parse(JSON.stringify(objects.scene))
    content.name = `SC${index + 1}`
    content.instructions.content[0].content[0].file = element.instruction
    content.instructions.content[0].content[1].text = element.text
    scenesOBJ.value.push(content)
  })

  builderstore.updateDocScenes(scenesOBJ.value)
}

onMounted(() => {
  scenes.value = []
  open()
  setTimeout(() => { sceneAdd() }, 250)
})
</script>

<template>
  <div p-1>
    <UButton size="sm" @click="open">
      <i i-solar-meditation-line-duotone />
      <span>&nbsp; Asistente</span>
    </UButton>
  </div>

  <dialog ref="dialog" h-full max-w-2xl min-h-md w-full bg-blue-500 shadow-blue shadow-md>
    <div flex items-center justify-between p-0.5 text-xs text-white>
      <div class="text-white">
        <div><i i-solar-meditation-line-duotone /></div>
        Asistente
      </div>
      <div i-solar-close-square-line-duotone cursor-pointer @click="close" />
    </div>

    <div mt-1 bg-blue-600 p-1>
      <div flex justify-between p-1 font-bold>
        Escenas
        <UButton @click="sceneAdd">
          <i i-solar-add-square-line-duotone /> &nbsp; Agregar escena
        </UButton>
      </div>
      <div v-for="(item, index) in scenes" :key="index" grid grid-cols-4 gap-2 p-1 text-xs>
        <div>
          Audio
          <USelect v-model="item.instruction" :options="filesmap" />
        </div>
        <div col-span-2>
          Texto
          <UInput v-model="item.text" text-xs text-dark placeholder="Texto de instrucción" />
        </div>
        <div>
          Eliminar
          <UButton @click="sceneDelete(index)">
            <i i-solar-trash-bin-trash-line-duotone cursor-pointer />
          </UButton>
        </div>
      </div>
    </div>
    <UButton @click="generar">
      Generar
    </UButton>
  </dialog>
</template>
