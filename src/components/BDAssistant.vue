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
  scenesOBJ.value = []
  scenes.value.forEach((element, index) => {
    const scene = JSON.parse(JSON.stringify(objects.scene))
    const buttonNext = JSON.parse(JSON.stringify(objects.buttonNext))
    const buttonFinalize = JSON.parse(JSON.stringify(objects.buttonFinalize))
    const sceneContent = JSON.parse(JSON.stringify(objects.sceneContent))

    // BtnNext
    buttonNext.name = buttonNext.id = `nxt${index + 1}`
    buttonNext.name = buttonNext.marker = '➡️'
    buttonNext.content[0].to = `/activity/${index + 1}`
    buttonNext.content[0].id = buttonNext.content[0].name = `btn${index + 1}`

    // Instructions
    scene.name = `SC${index + 1}`
    scene.instructions.content[0].content[0].file = element.instruction
    scene.instructions.content[0].content[1].text = element.text

    // SceneContent
    sceneContent.name = sceneContent.id = `gpo${index + 1}`
    sceneContent.content[0].id = sceneContent.content[0].name = `txt${index + 1}`
    sceneContent.content[0].text = `Escena ${index + 1}`
    scene.content.push(sceneContent)

    // Buttons
    if (index < scenes.value.length - 1)
      scene.content.push(buttonNext)
    else
      scene.content.push(buttonFinalize)

    scenesOBJ.value.push(scene)
  })

  scenes.value = []
  builderstore.updateDocScenes(scenesOBJ.value)
  close()
}

onMounted(() => {
  scenes.value = []
  setTimeout(() => { sceneAdd() }, 200)
  open()
})
</script>

<template>
  <div p-1>
    <UButton size="sm" bg-blue-300 @click="open">
      <i i-solar-meditation-line-duotone />
      <span>&nbsp; Asistente</span>
    </UButton>
  </div>

  <dialog ref="dialog" h-full max-h-2xl max-w-2xl min-h-md w-full bg-blue-500 shadow-blue shadow-md>
    <div flex items-center justify-between p-0.5 text-xs text-white>
      <div class="text-white">
        <div><i i-solar-meditation-line-duotone /></div>
        Asistente
      </div>
      <div i-solar-close-square-line-duotone cursor-pointer @click="close" />
    </div>

    <div mt-1 bg-blue-600 p-5>
      <div flex justify-between p-1 font-bold>
        Escenas
        <UButton @click="sceneAdd">
          <i i-solar-add-square-line-duotone /> &nbsp; Agregar escena
        </UButton>
      </div>
      <!--------------------->
      <div v-for="(item, index) in scenes" :key="index" my-1 bg-blue-800 p-2 text-xs>
        <div grid grid-cols-4 gap-2>
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
            <UButton mx-auto type="primary" @click="sceneDelete(index)">
              <i i-solar-trash-bin-trash-line-duotone cursor-pointer />
            </UButton>
          </div>
        </div>

        <div class="mt-1 bg-white/10 p-1">
          <div>
            Botón: <span font-bold text-amber>{{ index < scenes.length - 1 ? 'Next' : 'Finalize' }}</span>
          </div>
        </div>
      </div>
      <!----------------------->
      <UButton v-if="scenes.length" mx-auto mt-2 type="accent" @click="generar">
        Generar escenas
      </UButton>
    </div>
  </dialog>
</template>
