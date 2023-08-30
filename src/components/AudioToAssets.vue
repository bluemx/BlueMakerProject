<script setup>
const props = defineProps({
  item: Object,
})
const builderstore = useBuilderStore()
const router = useRoute()
const stored = ref(false)
const name = ref('')
const loading = ref(false)
// const saved = ref(false)
async function save() {
  fetchFileFromURL(props.item.audioUrl).then(uploadFile).catch(console.error)
}

async function fetchFileFromURL(url) {
  const response = await fetch(url)
  if (!response.ok)
    throw new Error(`Failed to fetch ${url}`)

  const blob = await response.blob()
  // Assign the provided filename or extract from URL if not provided.
  blob.name = `${name.value}.mp3`
  return blob
}

async function uploadFile(file) {
  loading.value = true
  const { _data, _error } = await supabase
    .storage
    .from(builderstore.type)
    .upload(`${router.params.key}/${file.name}`, file, {
      cacheControl: '3600',
      upsert: false,
    })
  // console.log(data,error)
  builderstore.updateAssets()
  name.value = ''
  loading.value = false
  stored.value = true
}
</script>

<template>
  <div v-if="!loading" class="p-1">
    <div class="flex justify-between gap-1 text-xs">
      <div>Nombre de archivo:</div>
    </div>
    <div v-if="!stored" class="mt-1 flex gap-1">
      <UInput v-model="name" size="sm" placeholder="Nombre de template" class="text-neutral">
        <template #append>
          .mp3
        </template>
      </UInput>
      <UButton v-if="name.length > 2" size="sm" color="primary" @click="save">
        Guardar
      </UButton>
    </div>
    <div v-else class="text-center text-amber">
      {{ name }} guardado
    </div>
  </div>
  <div v-else class="p-1">
    <div class="text-center text-accent-100">
      Guardando en assets
    </div>
  </div>
</template>
