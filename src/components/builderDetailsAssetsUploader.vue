<template>
  <div
    class="upload-area p-5 border-dashed border-4 border-white bg-slate-500 shadow m-2"
    @dragover.prevent
    @dragenter.prevent
    @drop.prevent="onDrop"
    @click="onClick"
    cursor-pointer text-center text-xs text-white hover:border-slate-800
  >
    <div class="mx-auto text-2xl mb-1" i-solar-upload-line-duotone></div>
    <div>Arrastrar archivos o seleccionarlos dando click</div>
    <input type="file" multiple ref="fileInput" @change="onFileChange" hidden />
  </div>
</template>


<script setup>
const builderstore = useBuilderStore()
const router = useRoute()
const fileInput = ref(null)
const onDrop = async (e) => {
  const files = e.dataTransfer.files;
  for (let i = 0; i < files.length; i++) {
    await uploadFile(files[i])
  }
}
const onClick = () => {
  fileInput.value.click()
}
const onFileChange = async (e) => {
  const files = e.target.files;
  for (let i = 0; i < files.length; i++) {
    await uploadFile(files[i])
  }
}
const uploadFile = async (file) => {
  const { data, error } = await supabase
    .storage
    .from(builderstore.type)
    .upload(router.params.key+'/'+file.name, file, {
      cacheControl: '3600',
      upsert: false
    })
  //console.log(data,error)
  builderstore.updateAssets()
}
</script>
