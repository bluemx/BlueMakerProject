<script setup>
const textarea = ref('')
const dialog = ref()
function open() {
  dialog.value.showModal()
}
function close() {
  dialog.value.close()
}
function mergeaudios() {
  const audios = textarea.value.split(/\s/).filter(item => item !== '')
  mergeAudios(audios)
}

function mergeAudios(audios) {
  const crunker = new Crunker({ sampleRate: 44100 })
  crunker
    .fetchAudio(...audios)
    .then((buffers) => {
      // => [AudioBuffer, AudioBuffer]
      return crunker.concatAudio(buffers)
    })
    .then((merged) => {
      // => AudioBuffer
      return crunker.export(merged, 'audio/mp3')
    })
    .then((output) => {
      // => {blob, element, url}
      // SAVE MERGED AUDIO
      crunker.download(output.blob)
    })
    .catch((_error) => {
      // => Error Message

    })
}
</script>

<template>
  <div mt-2 flex justify-center bg-slate p-1 text-center>
    <UButton type="accent" @click="open">
      Unir audios por url
    </UButton>
  </div>
  <dialog ref="dialog" bg-blue-500 shadow-blue shadow-md>
    <div flex items-center justify-between p-0.5 text-xs text-white>
      <div class="text-white">
        <div><i i-solar-meditation-line-duotone /></div>
        Unir audios
      </div>
      <div i-solar-close-square-line-duotone cursor-pointer @click="close" />
    </div>
    <div flex flex-col gap-1 bg-blue-600 p-1 text-xs>
      Pegar url's de audios separadas por un espacio.
      <textarea v-model="textarea" text-xs text-dark />
    </div>
    <div w-full flex flex-col bg-blue-700 p-2>
      <UButton type="accent" mx-auto inline-block @click="mergeaudios">
        Unir audios y descargar
      </UButton>
    </div>
  </dialog>
</template>
