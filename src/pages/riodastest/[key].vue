<script setup>
const router = useRouter()
const route = useRoute()

const odaID = route.params.key
const loading = ref()
const iframe = ref()
const currentviewID = ref(0)
const currentviewURL = ref('')

const url = window.location.href.includes('localhost') ? 'https://localhost:5173/#' : 'https://odas.win/#'
const iframeurl = ref(url + odaID)

const views = [
  { name: 'Vista alumno', url: '' },
  { name: 'Número de intentos', url: '' },
  { name: 'Cargar input de alumno', url: '' },
  { name: 'Alumno congelado', url: '/freeze' },
  { name: 'Vista de maestro', url: '/freeze/teacher' },
  { name: 'Cargar input de maestro', url: '/freeze/teacher' },
  { name: 'Maestro congelado', url: '/freeze/teacher/freeze' },
]

function changeView(item, index) {
  currentviewID.value = index
  currentviewURL.value = item.url
  iframeurl.value = false
  setTimeout(() => {
    iframeurl.value = url + odaID + item.url
  }, 250)
}

onMounted(() => {
  console.log(odaID)
})
</script>

<template>
  <div class="w-full flex">
    <div class="w-2/5 bg-slate-700 text-white">
      <!-- menu -->
      <div class="flex flex-col gap-1 p-1 text-xs">
        <div v-for="(item, index) in views" :key="index" class="cursor-pointer rounded p-1" :class="[currentviewID == index ? 'bg-primary' : 'bg-slate-900']" @click="changeView(item, index)">
          {{ index + 1 }} {{ item.name }}
        </div>
      </div>
      <!-- interactions -->
      <rt1 v-if="currentviewID == 0" />
      <rt3 v-if="currentviewID == 2" />
    </div>
    <div class="h-full w-full flex flex-col bg-slate-700 p-1">
      <div v-if="iframeurl" class="p-1 text-xs">
        {{ iframeurl }}
      </div>
      <iframe v-if="iframeurl" ref="iframe" :src="iframeurl" frameborder="0" class="h-full w-full" allow="camera;microphone;accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen="true" />
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: builder
  requiresAuth: false
</route>
