<script setup>
const props = defineProps({
  modelValue: String,
})
const emit = defineEmits(['update:modelValue'])

const visibility = ref(true)

const input = ref(props.modelValue)
const hview = ref()
const editing = ref()
const highlighting = ref()

function changeVisibile() {
  sync_scroll()
  visibility.value = !visibility.value
}

function onInput() {
  hview.value = wrapLines(input.value)
  sync_scroll()
  emit('update:modelValue', input.value)
}

function sync_scroll(element) {
  highlighting.value.scrollTop = editing.value.scrollTop
  highlighting.value.scrollLeft = editing.value.scrollLeft
}

function wrapLines(content) {
  content = content.replace(/(^|\n\n)([^\n]+)/g, (match) => {
    return `${match.startsWith('\n\n') ? '\n\n' : ''}<span class="text-white ring ring-green-500 ring-offset-4 ring-offset-slate-50 dark:ring-offset-slate-900">${match.trim()}</span>`
  })

  content = content.replace(/([^\n]+)(?=(\n\n|$))/g, (match) => {
    return `<span class="ring ring-pink-500 ring-offset-4 ring-offset-slate-50 dark:ring-offset-slate-900">${match.trim()}</span>`
  })

  return content
}

onMounted(() => {
  onInput()
})
</script>

<template>
  <div class="absolute cursor-pointer" @click="changeVisibile()">
    <div i-solar-flashlight-on-bold class="text-xl" :class="[visibility ? 'text-green-400' : 'text-teal-700']" />
  </div>
  <div class="relative h-full w-full">
    <textarea id="editing" ref="editing" v-model="input" class="h-full w-full resize-none border-0 p-1" :class="visibility ? 'text-transparent' : 'text-white'" @input="onInput" @scroll="sync_scroll" />
    <pre v-show="visibility" id="highlighting" ref="highlighting" class="text-ambe h-full w-full border-0 p-1" v-html="hview" />
  </div>
</template>

<style scoped>
#editing, #highlighting, #highlighting * {
  /* Also add text styles to highlighting tokens */
  font-size: 10pt;
  font-family: monospace;
  line-height: 14pt;
}
#editing, #highlighting {
  position: absolute;
  top: 0;
  left: 0;
  overflow: auto;
  white-space: pre;
}
#editing {
  z-index: 1;
  background: transparent;
  caret-color: white; /* Or choose your favorite color */
}

#highlighting {
  z-index: 0;
}
</style>
