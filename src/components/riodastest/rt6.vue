<script setup>
import { onMounted, ref } from 'vue'
import 'highlight.js/styles/github.css'
import 'highlight.js/styles/stackoverflow-light.css'

const code = ref('')
const inputs = ref('eyJsb2NhdGlvbiI6Ii9lbmQiLCJ0b3RhbHRpbWUiOjcsImlucHV0cyI6eyIwLTAtMC0yIjoiVTJGc2RHVmtYMStXR1ZleTNRWmNmVTlXRmZYVFZ0U0dTYmFSOVBqem5OV2lUUHJnUWN5ZXI4T294OFM4K2RzNnZOcTNPQldyVjZmU3dlaloyMmdNOXJaZjdwUlRaZytQd1JBc3c1OTNhWllJK3hTUmNmRGhJTmxYNzVpYXl6ZysiLCIwLTEtMC0yIjoiVTJGc2RHVmtYMThhT3JVemhqV0NzYmIyajgxbUpzM3ZtdnVRSE9FYVZNNjZPM2hSc3hOVitaMXdLdm1qMExqa0h2M1N1eUczaytvYll0L3Z6MjFZZElmdGlNa0FXQisrV0p4L0d1QTE4SE0zYTBmK21sc2d5cm1SMXpzN3FEQUsiLCIwLTItMC0yIjoiVTJGc2RHVmtYMTl2VSsvZjZ6YkRKUEFKaEN6djVTc3dPWlZvYlowaHVMWjd4SEJOYWVqM2Q2aWF4WnNQa1RDQ3lOZzBCK3ZDYmxiWUdlVFlnNklTWFE9PSIsIjAtMy0wLTIiOiJVMkZzZEdWa1gxKzRiekJnYXN5V1dVd0ZSME9PNmpsU20wY2N3YmFZSGdGM0NwSmt1cWtUelpZNENzcGl2eTB4TFN6aVA1WDhBRVdaQlZ5V0FOOG1XQT09IiwiMC00LTAtMiI6IlUyRnNkR1ZrWDE4SVRnYXk0VG12cmRSNTRrdmpEdlVUSzcyNU8ycmhWNkhBOEFGWTl3aS9lR0lNY0hranNHZll4RGs5T0I5ZVZXbGl0RFFmR0EwbC9BPT0iLCIwLTUtMC0yIjoiVTJGc2RHVmtYMThWYnp2cDR3UER4M2x4ellmSkx4NmZvdWMrc2x2VldKQXV0bEx5SCttSmNmd1RpMVFoZ0UraUFLWXBtRVR3cDFDR0F0UVhFV0JPVmc9PSIsIjAtNi0wLTIiOiJVMkZzZEdWa1gxL0JEbGt3Szl5SkhscXIzaUM0TXNCWXdDSDFQWVl2Y2FpdlA2SkxIZjdheWFqZlMxUXliOWlpVXRYazlHM1BOTWZiaHhhSTkrN0VVZz09IiwiMC03LTEtMSI6IlUyRnNkR1ZrWDE4VjFPVjZ2aHJSVHFDRFIrV1NXbWtCQnRkYldIcml0YnMwYUdyYVRjUHVRaitVTmRmYUhBS2laZnpsTUdvVElFWlAyTldUK1VxNk5BPT0iLCIwLTctMi0xIjoiVTJGc2RHVmtYMS94QmdWRnozbFZZNUFHSTY2WElWSnF6bjlkNWpqSXFHNDhLaWFpcFUwTEt1Q1h3Z2VjKzU5clpYSEJPWlZaeXhtUFlpR2VSNkcxWGc9PSIsIjAtNy0zLTEiOiJVMkZzZEdWa1gxOVpsT2tlWEFQUEorOUg1aUVwZWRQTXVHZ2xmOVZpUG13NE53cUE3RWFIbm1sVGlUdmE1c1MvbjE5QmFPRzlhTXdIRWJ0a1l5YmlDdz09IiwiMC03LTQtMSI6IlUyRnNkR1ZrWDE4V3RwU1piMlU1ektJQnZtVFNSbENDWXRwais5Umh2a1ZSQk9kZGw1NzlvVFFSNlZQSDBsTFROSUR2ZFVPaEQwYkFKbHBIWHlrZ3BnPT0iLCIwLTctNS0xIjoiVTJGc2RHVmtYMTlNNnRsOVVOdy85WG9rdVBFSGZpMHc4Ym5NQ1Ixc2dmRkFCNkdpc3dUcEMxZ1FpWjlmUWN3S0lqejNTNnlQa2Z4K2w0Nzhpbkg5MEE9PSJ9fQ==')
onMounted(() => {
  window.addEventListener('message', (event) => {
    if (JSON.parse(event.data).datatype === 'student')
      code.value = JSON.stringify(JSON.parse(event.data), null, '\t')
  })
})

function sendinputs() {
  const theiframe = document.querySelector('iframe')
  const datos = {
    type: 'teacher-inputs',
    inputs: inputs.value,
  }
  theiframe.contentWindow.postMessage(JSON.stringify(datos), '*')
}
</script>

<script>
export default {
  components: {
    // Highlightjs: hljsVuePlugin.component,
  },
}
</script>

<template>
  <div class="bg-zinc-500 p-1">
    <div class="p-1 text-xs">
      Enviar inputs de alumno
    </div>
    <textarea v-model="inputs" placeholder="Inputs" class="h-60 w-full text-xs text-dark" />
    <UButton @click="sendinputs()">
      Enviar
    </UButton>
    <!-- <Highlightjs language="json" :code="code" class="text-xs" /> -->
  </div>
</template>
