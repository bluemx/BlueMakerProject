<script setup>
const emit = defineEmits(['loaded'])
const xiapikey = import.meta.env.VITE_11LABSAPIKEY
const requestheader = {
  headers: {
    'accept': 'application/json',
    'xi-api-key': xiapikey,
  },
}
const voices = ref([])

async function loadVoices() {
  const res = await axios.get('https://api.elevenlabs.io/v1/voices', requestheader)
  voices.value = res.data.voices.map((x) => {
    return {
      value: x.voice_id,
      name: x.name,
      language: x.labels.accent,
      age: x.labels.age,
      gender: x.labels.gender,
      usecase: x.labels['use case'],
      sample: x.preview_url,
    }
  })
  emit('loaded', voices.value)
}

onMounted(() => {
  loadVoices()
})
</script>

<template>
  <div v-if="voices.length === 0" p-2 text-center text-xs text-white>
    Loading voices
  </div>
</template>
