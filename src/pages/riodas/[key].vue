<script setup>
const router = useRoute()
const builderstore = useBuilderStore()
const loading = ref()
builderstore.type = 'riodas'


const iframeurl = window.location.href.includes('localhost')? 'https://localhost:5173/#MAKER' : 'https://odas.win/#MAKER'


const loadDoc =async () => {
  await builderstore.loadDoc(router.params.key)
  sendData()
}


const iframe = ref()
const iframeready = ref(false)

const sendData = () => {
  const datos = {
    type: 'oda',
    oda: builderstore?.doc?.content
  }
  iframe.value.contentWindow.postMessage(JSON.stringify(datos) , '*')
}



onMounted(() => {

  loading?.value?.showModal()


  watch((builderstore), (ncontent) => {
    if(ncontent.doc){
      sendData()
    }
  }, {deep: true})
  setTimeout(()=>{
    loadDoc()
  }, 200)


  iframe.value.onload = () => {
   sendData()
   builderstore.iframe = iframe.value
  }


})

const restartoda = () => {
  const datos = { type: 'restartoda' }
  iframe.value.contentWindow.postMessage(JSON.stringify(datos) , '*')
  setTimeout(()=>{
    sendData()
  }, 200)
}



</script>

<template>
  <dialog v-if="!builderstore.doc" ref="loading">
    Loading...
  </dialog>
  <section flex-grow bg-slate-100 p-1 dark:bg-slate-900 relative>
    <iframe ref="iframe" :src="iframeurl" frameborder="0" class="w-full h-full" allow="camera;microphone;accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="true" ></iframe>
    <div absolute right-2 bottom-2>
      <UButton @click="restartoda" size="sm">Reset ODA</UButton>
    </div>
  </section>

</template>

<route lang="yaml">
meta:
  layout: builder
  requiresAuth: true
</route>
