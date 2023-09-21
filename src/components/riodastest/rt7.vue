<script setup>
import { onMounted, ref } from 'vue'
import hljsVuePlugin from '@highlightjs/vue-plugin'
import 'highlight.js/styles/github.css'
import 'highlight.js/styles/stackoverflow-light.css'

const code = ref('')
const dataoda = ref('')
onMounted(() => {

})

function sendinputs() {
  const theiframe = document.querySelector('iframe')
  const datos = {
    type: 'oda',
    oda: JSON.parse(dataoda.value),
  }
  theiframe.contentWindow.postMessage(JSON.stringify(datos), '*')
}
</script>

<script>
export default {
  components: {
    Highlightjs: hljsVuePlugin.component,
  },
}
</script>

<template>
  <div class="bg-zinc-500 p-1">
    <div class="p-1 text-xs">
      dataODA:
    </div>
    <textarea v-model="dataoda" class="h-60 w-full text-xs text-dark" placeholder="{&quot;title&quot;:&quot;...&quot;, &quot;clock&quot;:true, &quot;countdown&quot;: 0, &quot;intro&quot;: &quot;&quot; ... }" />

    <UButton @click="sendinputs()">
      Enviar
    </UButton>
    <!-- <Highlightjs language="json" :code="code" class="text-xs" /> -->
  </div>
</template>
