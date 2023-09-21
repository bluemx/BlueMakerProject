<script setup>
import { onMounted, ref } from 'vue'
import hljsVuePlugin from '@highlightjs/vue-plugin'
import 'highlight.js/styles/github.css'
import 'highlight.js/styles/stackoverflow-light.css'

const code = ref('')
const attempts = ref(1)
onMounted(() => {

})

function sendinputs() {
  const theiframe = document.querySelector('iframe')
  const datos = {
    type: 'attempts',
    time: attempts.value,
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
      Intentos
    </div>
    <UInput v-model="attempts" type="number" text-dark />
    <UButton @click="sendinputs()">
      Enviar
    </UButton>
    <!-- <Highlightjs language="json" :code="code" class="text-xs" /> -->
  </div>
</template>
