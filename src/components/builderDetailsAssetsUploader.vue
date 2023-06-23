<template>
  <div
    class="upload-area p-5 border-dashed border-4 border-slate-500 bg-white shadow m-2"
    @dragover.prevent
    @dragenter.prevent
    @drop.prevent="onDrop"
    @click="onClick"
    cursor-pointer text-center text-xs text-slate-500 hover:border-slate-800
  >
    Soltar archivos o clic
    <input type="file" ref="fileInput" @change="onFileChange" hidden />
  </div>
</template>


<script setup>
const builderstore = useBuilderStore()
const router = useRoute()
const fileInput = ref(null)
const onDrop = async (e) => {
  await uploadFile(e.dataTransfer.files[0])
}
const onClick = () => {
  fileInput.value.click()
}
const onFileChange = async (e) => {
  await uploadFile(e.target.files[0])
}
const uploadFile = async (file) => {
  console.log(file)
  const { data, error } = await supabase
    .storage
    .from(builderstore.type)
    .upload(router.params.key+'/'+file.name, file, {
      cacheControl: '3600',
      upsert: false
    })
  console.log(data,error)
  builderstore.updateAssets()
}
</script>
