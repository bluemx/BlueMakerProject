<script setup>
import A11Conversation from './audios11labs/a11Conversation.vue'

const playuid = import.meta.env.VITE_PLAY_USERID
const playsk = import.meta.env.VITE_PLAY_SK
const playOptions = {
  headers: {
    'accept': 'application/json',
    'content-type': 'application/json',
    'AUTHORIZATION': `Bearer ${playsk}`,
    'X-USER-ID': playuid,
  },
}

const builderstore = useBuilderStore()

const voices = ref(false)

const loading = ref(false)

const file = ref('instruccion')
const content = ref('')
const voice = ref({ value: 'en-US-SaraNeural', name: 'Sara', language: 'English (US)', voiceType: 'Neural', languageCode: 'en-US', gender: 'Female', service: 'ms', styles: ['angry', 'cheerful', 'excited', 'friendly', 'hopeful', 'sad', 'shouting', 'terrified', 'unfriendly', 'whispering'], sample: 'https://media.play.ht/full_-MmMggzQYiUs1EbXmmEv.wav' })

const audiofiles = ref([])

const voicesGenderFilter = ref('-')
const voicesLanguageFilter = ref('en-US')
const voicesNameFilter = ref('')
const voicesFilter = computed(() => {
  const filteredGender = () => {
    let res = []
    if (voicesGenderFilter.value === '-') {
      res = voices.value
    }
    else {
      res = voices.value.filter((item) => {
        return item.gender.toLowerCase() === voicesGenderFilter.value.toLowerCase()
      })
    }
    return res
  }

  const filteredLang = filteredGender().filter((item) => {
    return item.languageCode.toLowerCase() === voicesLanguageFilter.value.toLowerCase()
  })

  const filteredName = filteredLang.filter((item) => {
    return item.name.toLowerCase().includes(voicesNameFilter.value.toLowerCase())
  })
  return filteredName
})
async function generateAudio() {
  console.log('generateAudio()')
  loading.value = true

  const options = {
    ...playOptions,
    method: 'POST',
    body: JSON.stringify({
      content: [content.value],
      voice: voice.value.value,
      title: file.value || 'abc',
      // narrationStyle: false,
      globalSpeed: '100%',
      // pronunciations: [],
      trimSilence: true,
      // transcriptionvalue: 'string'
    }),
  }
  fetch('https://play.ht/api/v1/convert', options)
    .then(response => response.json())
    .then((response) => {
      if (response.status === 'CREATED') {
        console.log('created')
        checkForFileConvertion(response.transcriptionId, options)
      }
    })
    .catch(err => console.error(err))
}

function checkForFileConvertion(transcriptionId, options) {
  console.log('checking')
  const newoptions = { ...playOptions, method: 'GET' }
  fetch(`https://play.ht/api/v1/articleStatus?transcriptionId=${transcriptionId}`, newoptions)
    .then(responseFile => responseFile.json())
    .then((responseFile) => {
      if (responseFile.converted) {
        console.log('file:', responseFile)
        const thefile = {
          ...responseFile,
          voice: voice.value,
          content: content.value,
        }
        audiofiles.value.push(thefile)
        loading.value = false
      }
      else {
        setTimeout(() => {
          console.log('check again...')
          checkForFileConvertion(transcriptionId, newoptions)
        }, 1000)
      }
    })
    .catch(errFile => console.error(errFile))
}

function playudio(theid) {
  document.querySelectorAll('audio').forEach((i) => {
    i.pause()
  })
  const player = document.getElementById(theid)
  player.play()
}
function stopaudio(theid) {
  document.querySelectorAll('audio').forEach((i) => {
    i.pause()
  })
}

const conversationVoices = ref(null)
function addToConversation(item) {
  conversationVoices.value.add(item)
}

onMounted(() => {
  // loadVoices()
})
</script>

<template>
  <div>
    <A11LoadVoices @loaded="voices = $event" />
    <A11FilterVoices v-if="voices" :voices="voices" @addconversation="addToConversation" />
    <A11Conversation ref="conversationVoices" />
  </div>
  <!--
  <div class="h-full flex flex-col bg-slate-800">
    <div class="border-l-4 border-r-4 border-slate-500 p-2">
      <div class="grid grid-cols-2 my-1 items-center justify-center gap-1">
        <div class="my-1 flex items-center gap-1">
          <UButton v-for="(item, index) in ['en-US', 'en-CA', 'en-GB', 'es-MX']" :key="index" size="xs" class="px-1" :type="voicesLanguageFilter === item ? 'primary' : 'default'" @click="voicesLanguageFilter = item">
            {{ item }}
          </UButton>
        </div>
        <div class="flex items-center justify-end gap-1">
          <UButton v-for="(item, index) in ['-', 'Female', 'Male']" :key="index" size="xs" class="px-1" :type="voicesGenderFilter === item ? 'secondary' : 'default'" @click="voicesGenderFilter = item">
            {{ item }}
          </UButton>
        </div>
      </div>
      <UInput v-model="voicesNameFilter" placeholder="Nombre" class="p-0.5 text-xs text-dark" />
    </div>
  -->
  <!-- lista -->
  <!--
    <div v-if="!loading" class="border-4 border-slate-500 p-2">
      <div class="h-[180px] overflow-y-scroll text-xs">
        <div v-for="(item, index) in voicesFilter" :key="index" class="mb-0.5 w-full flex cursor-pointer justify-between gap-1 hover:bg-primary-700" :class="[item.value === voice.value ? 'bg-accent' : 'bg-slate-500']" @click="voice = item">
          <div>
            <strong>{{ item.name }}</strong>
            <span v-if="item.isKid" class="ml-2 inline-block text-amber">(Niño)</span>
            <span class="ml-2 inline-block text-[8px] opacity-50">{{ item.voiceType }}</span>
          </div>
          <div class="flex justify-center gap-1 rounded">
            <UButton size="xs" class="i-solar-user-plus-line-duotone bg-white" @click="addToConversation(item)" />
            <UButton size="xs" class="i-solar-play-linear bg-white" @click="playudio(`a${index}`)" />
            <UButton size="xs" class="i-solar-stop-linear bg-white" @click="stopaudio()" />
            <audio :id="`a${index}`" :src="item.sample" type="audio/mp3" invisible w-0 />
          </div>
        </div>
      </div>
    </div>

    <div mt-1 flex flex-col gap-2>
      <textarea v-if="!loading" id="" v-model="content" :placeholder="`${voice.name}: Diálogo`" name="" class="w-full resize-none rounded bg-dark text-xs text-white" />
      <UButton v-if="!loading" class="ml-auto" type="accent" @click="generateAudio">
        Generar audio
      </UButton>
      <template v-if="loading">
        <div class="flex items-center justify-center gap-1 text-xs text-accent-100">
          <div class="i-solar-refresh-circle-broken ml-auto text-xl" animate-spin />
          <span>Procesando...</span>
        </div>
      </template>
    </div>
    -->
  <!-- list of files -->
  <!--
    <div class="mt-2 bg-slate-400 p-1">
      <div v-for="(item, index) in audiofiles" :key="index" class="mb-0.5 w-full bg-slate-700 p-1">
        <div class="flex items-center gap-1 text-sm">
          <div>
            <strong class="text-sm">{{ item.voice.name }}</strong>
            <span class="ml-1 inline-block text-[8px] leading-2">{{ item.content }}</span>
          </div>
          <span class="ml-1 inline-block text-[8px] opacity-50">({{ item.audioDuration }}s)</span>
          <div class="ml-auto flex justify-center gap-1 rounded">
            <UButton size="xs" class="i-solar-play-linear bg-white" @click="playudio(`b${index}`)" />
            <UButton size="xs" class="i-solar-stop-linear bg-white" @click="stopaudio(index)" />
            <audio :id="`b${index}`" :src="item.audioUrl" type="audio/mp3" invisible w-0 />
          </div>
          <div class="ml-2 flex justify-center text-right">
            <UPopover trigger="click" class="leading-2">
              <UButton size="sm" type="primary">
                A assets
              </UButton>
              <template #content>
                <AudioToAssets :item="item" />
              </template>
            </UPopover>
          </div>
        </div>
      </div>
    </div>
    <BDAudioConversation  />

  </div>
-->
</template>
