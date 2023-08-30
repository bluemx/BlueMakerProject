<script setup>
const builderstore = useBuilderStore()
const router = useRoute()
const fileInput = ref(null)
async function onDrop(e) {
  const files = e.dataTransfer.files
  for (let i = 0; i < files.length; i++)
    await uploadFile(files[i])
}
function onClick() {
  fileInput.value.click()
}
async function onFileChange(e) {
  const files = e.target.files
  for (let i = 0; i < files.length; i++)
    await uploadFile(files[i])
}
async function uploadFile(file) {
  const { data, error } = await supabase
    .storage
    .from(builderstore.type)
    .upload(`${router.params.key}/${file.name}`, file, {
      cacheControl: '3600',
      upsert: false,
    })
  // console.log(data,error)
  builderstore.updateAssets()
}
</script>

<template>
  <div
    class="upload-area m-2 border-4 border-white border-dashed bg-slate-500 p-5 shadow"
    cursor-pointer
    text-center
    text-xs
    text-white
    hover:border-slate-800 @dragover.prevent @dragenter.prevent @drop.prevent="onDrop" @click="onClick"
  >
    <div class="mx-auto mb-1 text-2xl" i-solar-upload-line-duotone />
    <div>Arrastrar archivos o seleccionarlos dando click</div>
    <input ref="fileInput" type="file" multiple hidden @change="onFileChange">
  </div>
</template>
