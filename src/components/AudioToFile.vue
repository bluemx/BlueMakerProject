<script setup>
const props = defineProps({
  fileurl: Object,
  filename: String,
})
function download() {
  // Create a link element
  const link = document.createElement('a')

  // Set the link's href to the blob URL
  link.href = props.fileurl

  // Set the download attribute to the desired file name
  link.download = props.filename

  // Append the link to the body
  document.body.appendChild(link)

  // Programatically click the link to start the download
  link.click()

  // Remove the link when done
  document.body.removeChild(link)
}
</script>

<template>
  <div>
    <UButton size="sm" type="secondary" title="Descargar" @click="download">
      <i i-solar-download-line-duotone />
    </UButton>
  </div>
</template>
