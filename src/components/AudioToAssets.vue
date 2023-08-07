<template>
<div class="p-1" v-if="!loading">
  <div class="text-xs flex justify-between gap-1">
    <div>Nombre de archivo:</div>
  </div>
  <div class="flex mt-1 gap-1" v-if="!stored">
    <UInput size="sm" v-model="name" placeholder="Nombre de template" class="text-neutral">
      <template #append>.mp3</template>
    </UInput>
    <UButton v-if="name.length>2" size="sm" color="primary" @click="save">Guardar</UButton>
  </div>
  <div v-else class="text-center text-amber">{{ name }} guardado</div>
</div>
<div class="p-1" v-else>
  <div class="text-center text-accent-100">Guardando en assets</div>
</div>
</template>

<script setup>
const builderstore = useBuilderStore()
const router = useRoute()
const props = defineProps({
  item: Object
})
const stored = ref(false)
const name = ref('')
const loading = ref(false)
const saved = ref(false)
const save = async () => {
  fetchFileFromURL(props.item.audioUrl).then(uploadFile).catch(console.error);
}

const fetchFileFromURL = async (url, filename) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}`);
  }
  const blob = await response.blob();
  // Assign the provided filename or extract from URL if not provided.
  blob.name = name.value;
  return blob;
}

const uploadFile = async (file) => {
  loading.value = true
  const { data, error } = await supabase
    .storage
    .from(builderstore.type)
    .upload(router.params.key+'/'+file.name, file, {
      cacheControl: '3600',
      upsert: false
    })
  //console.log(data,error)
  builderstore.updateAssets()
  name.value = ''
  loading.value = false
  stored.value = true
}

</script>
