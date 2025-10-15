<script setup>
const router = useRoute()
const builderstore = useBuilderStore()
const loading = ref()
builderstore.type = 'riodas'

async function loadDoc(document, key, files) {
  await builderstore.loadDoc(document, key, files)
  setTimeout(() => {
    iframeready.value = true
  }, 500)
  sendData()
}

//const iframeurl = ref(window.location.href.includes('localhost') ? 'https://localhost:3333/#MAKER' : 'https://odas.win/#MAKER')
const iframeurl = ref('https://odas.win/#MAKER')
const iframe = ref()
const iframeready = ref(false)

/* # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #  LOCAL */

const folder = ref({ dirHandle: null, dirName: '', files: [], odaContent: '' });
const refDrop = ref();
function onChange(payload) {
  // payload.odaContent ya contiene el texto de oda.json (si existe)
  console.log('Carpeta:', payload.dirName, 'oda bytes:', payload.odaContent?.length ?? 0);
  loadDoc({key:payload.dirName, content: JSON.parse(payload.odaContent)}, payload.dirName, payload.files)

}

async function saveLocal() {
  try {

    await refDrop.value.saveOda(builderstore?.doc?.content);
    alert('Guardado');
  } catch (e) {
    alert(e.message || e);
  }
}
/* # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #  /LOCAL */


function sendData() {
  const datos = {
    type: 'oda',
    oda: builderstore?.doc?.content,
  }
  iframe.value.contentWindow.postMessage(JSON.stringify(datos), '*')
}

onMounted(() => {

  watch((builderstore), (ncontent) => {
    if (ncontent.doc)
      sendData()
  }, { deep: true })
  setTimeout(() => {
    loadDoc()
  }, 200)

  iframe.value.onload = () => {
    sendData()
    builderstore.iframe = iframe.value
  }
})

function restartoda() {
  const datos = { type: 'restartoda' }
  iframe.value.contentWindow.postMessage(JSON.stringify(datos), '*')
  setTimeout(() => {
    sendData()
  }, 200)
}
</script>

<template>

  <section relative flex-grow bg-slate-100 p-1 dark:bg-slate-900 flex flex-col h-full>
    <div class="flex gap-2 justify-center p-1">
      <BuilderLocalFolder v-model="folder" @change="onChange" ref="refDrop" />
      <div title="Guardar" class="aspect-square flex cursor-pointer items-center justify-center bg-cyan-5/30 hover:bg-amber" @click="saveLocal()">
      <div class="i-solar:diskette-broken" />
    </div>

    </div>
    <iframe ref="iframe" :src="iframeurl" frameborder="0" class="flex-1 w-full" allow="camera;microphone;accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen="true" />
    <div absolute bottom-2 right-2>
      <UButton size="sm" @click="restartoda">
        Reset ODA
      </UButton>
    </div>
  </section>
</template>

<route lang="yaml">
meta:
  layout: builder
  requiresAuth: true
</route>
