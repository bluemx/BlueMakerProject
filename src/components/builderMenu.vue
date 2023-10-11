<script setup>
const builderstore = useBuilderStore()

const buttons = ref([
  { name: 'Módulos', id: 'modulos', icon: 'i-solar:box-minimalistic-broken' },
  { name: 'Código', id: 'codigo', icon: 'i-solar:code-2-bold-duotone' },
  { name: 'Prompts', id: 'prompts', icon: 'i-solar:chat-square-call-line-duotone' },
  { name: 'Assets', id: 'assets', icon: 'i-solar:file-smile-broken' },
  { name: 'Audios PlayHT', id: 'audios', icon: 'i-solar:translation-2-line-duotone' },
  { name: 'Audios ElevenLabs', id: 'audiosv2', icon: 'i-solar:translation-2-broken' },
])
const currentbutton = ref(buttons.value[0])
builderstore.menu = currentbutton.value
function onClick(item) {
  currentbutton.value = item
  builderstore.menu = currentbutton.value
}

const saveToast = ref()
const saveLoading = ref(false)
async function saveDoc() {
  if (saveLoading.value)
    return false
  saveLoading.value = true
  await builderstore.saveDoc()
  saveLoading.value = false
  saveToast.value.show('success', 'Documento guardado')
}

function syncDoc() {
  builderstore.metadata('sync', Math.random())
}

function downloadDoc() {
  builderstore.download()
  saveToast.value.show('success', 'Descargando...')
}
</script>

<template>
  <aside w-10 flex flex-col gap-2 bg-slate-8 text-white>
    <template v-for="(item, index) in buttons" :key="index">
      <div :title="item.name" class="aspect-square flex cursor-pointer items-center justify-center hover:text-amber" :class="[currentbutton === item ? 'bg-slate-5' : '']" @click="onClick(item)">
        <div :class="item.icon" />
      </div>
    </template>
    <UToast ref="saveToast" position="bottom" align="left" />

    <router-link class="mt-auto" :to="`/${builderstore.type}`">
      <div title="Regresar" class="mb-20 mt-auto aspect-square flex cursor-pointer items-center justify-center bg-neutral-900/30 hover:bg-amber">
        <div class="i-solar-arrow-left-broken" />
      </div>
    </router-link>

    <BuilderNotes />

    <div title="Sincronizar" class="aspect-square flex cursor-pointer items-center justify-center bg-stone-5/30 hover:bg-amber" @click="syncDoc()">
      <div class="i-solar-refresh-circle-line-duotone" />
    </div>
    <div title="Guardar" class="aspect-square flex cursor-pointer items-center justify-center bg-cyan-5/30 hover:bg-amber" @click="saveDoc()">
      <div v-if="!saveLoading" class="i-solar:diskette-broken" />
      <div v-if="saveLoading" class="i-solar-diskette-bold animate-spin" />
    </div>
    <div title="Descargar" class="aspect-square flex cursor-pointer items-center justify-center bg-emerald-5/30 hover:bg-amber" @click="downloadDoc()">
      <div class="i-solar:cloud-download-line-duotone" />
    </div>
  </aside>
</template>
