<script setup>
import { onMounted, ref } from 'vue'
import hljsVuePlugin from '@highlightjs/vue-plugin'
import 'highlight.js/styles/github.css'
import 'highlight.js/styles/stackoverflow-light.css'

const code = ref('')
const dataoda = ref('{"title":"PRUEBA","clock":true,"countdown":0,"attempts":3,"intro":{"buttons":{"start":"Start"},"content":[]},"activity":{"scenes":[{"block":"scene","name":"SC1","countdown":0,"instructions":{"open":true,"content":[{"block":"group","class":"flex gap-2 items-center","content":[{"block":"text","class":"","text":"Read the questions and choose the right answer.","name":"xIwU"}],"background":"","name":"lgeG"}]},"content":[{"class":"flex flex-col gap-10 my-10 max-w-3xl mx-auto","content":[{"block":"group","class":"bg-slate-100 rounded p-5 text-center","content":[{"block":"text","class":"text-neutral text-xl","text":"HOLA"},{"options":[{"text":"1","block":"text"},{"text":"2","block":"text"},{"text":"3","block":"text"}],"evaluation":"auto","showResult":false,"block":"option","attempts":0}]}],"block":"group","name":"questions"},{"symbol":"FinalizeGroup"}]}]},"end":{"buttons":{"restart":false},"content":[{"symbol":"finishedAll"}]},"symbols":{"finishedAll":{"class":"w-full","content":[{"block":"group","class":"bg-slate-100 rounded p-5 text-center w-full","content":[{"block":"text","text":"Congratulations, you finished the activity.","class":"","name":"Congra"}],"background":"","name":"CongraGroup"},{"block":"group","class":"text-center p-5","content":[{"block":"finished","name":"finishedBlock"}],"background":"","name":"finishedGroup"}],"background":"","block":"group"},"FinalizeGroup":{"block":"group","class":"text-center mt-10","content":[{"block":"button","class":"mx-auto","to":"/end","text":"Finalize","name":"FinalizeBTN"}],"background":""}}}')
onMounted(() => {

})

function sendinputs() {
  const theiframe = document.querySelector('iframe')
  const datos = {
    type: 'oda',
    oda: JSON.parse(dataoda.value),
  }
  console.log(datos)
  theiframe.contentWindow.postMessage(JSON.stringify(datos), '*')
}

const studentinputs = ref('eyJsb2NhdGlvbiI6Ii9lbmQiLCJ0b3RhbHRpbWUiOjUsImlucHV0cyI6eyIwLTAtMC0xIjoiVTJGc2RHVmtYMTlxY0pva0htN2kxVXB6RlFjNlA0NVgzb2NXWWxGUk1iU0pUTFJyVmNLL2NRNi9hWFpkSDBPYnBuUi9JVDFKUnZ6K04yTkczeTZTcGc9PSJ9fQ==')
function sendstudentinputs() {
  const theiframe = document.querySelector('iframe')
  const datos = {
    type: 'student-inputs',
    inputs: studentinputs.value,
  }
  theiframe.contentWindow.postMessage(JSON.stringify(datos), '*')
}

const dataInputs = ref('')
function builderInputs() {
  const theiframe = document.querySelector('iframe')
  const datos = {
    type: 'builder',
    inputs: JSON.parse(dataInputs.value),
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
    BUILDER
    <div class="p-1 text-xs">
      dataODA:
    </div>
    <textarea v-model="dataoda" class="h-60 w-full text-xs text-dark" placeholder="{&quot;title&quot;:&quot;...&quot;, &quot;clock&quot;:true, &quot;countdown&quot;: 0, &quot;intro&quot;: &quot;&quot; ... }" />

    <UButton @click="sendinputs()">
      Enviar
    </UButton>
    <div class="p-1 text-xs">
      Enviar inputs de alumno
    </div>
    <textarea v-model="studentinputs" placeholder="Inputs" class="h-60 w-full text-xs text-dark" />
    <UButton @click="sendstudentinputs()">
      Enviar
    </UButton>

    <div class="p-1 text-xs">
      Cargar inputs para editar
    </div>
    <textarea v-model="dataInputs" placeholder="Inputs" class="h-60 w-full text-xs text-dark" />
    <UButton @click="builderInputs()">
      Enviar
    </UButton>
    <!-- <Highlightjs language="json" :code="code" class="text-xs" /> -->
  </div>
</template>
