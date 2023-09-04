<script setup>
import { onMounted, ref } from 'vue'
import hljsVuePlugin from '@highlightjs/vue-plugin'
import 'highlight.js/styles/github.css'
import 'highlight.js/styles/stackoverflow-light.css'

const code = ref('')

onMounted(() => {
  window.addEventListener('message', (event) => {
    if (JSON.parse(event.data).datatype === 'student')
      code.value = JSON.stringify(JSON.parse(event.data), null, '\t')
  })
})
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
      Datos recibidos
    </div>
    <Highlightjs language="json" :code="code" class="text-xs" />
  </div>
</template>
