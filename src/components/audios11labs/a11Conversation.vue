<script setup>
import draggable from 'vuedraggable'
import { concatenateAudioBlobs } from '../BDAudioConcatenator'

const xiapikey = import.meta.env.VITE_11LABSAPIKEY

const requestheader = {
  headers: {
    'Content-Type': 'application/json',
    'accept': 'audio/mpeg',
    'xi-api-key': xiapikey,
  },
}

// import { Crunker } from 'crunker'

// const props = defineProps()
const voices = ref([])
const drag = ref(false)
const loading = ref(false)
const getRandomCharacters = _ => 'xxxx'.replace(/x/g, _ => '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'[Math.random() * 62 | 0])

const audiofiles = ref([])
const generatedAudios = ref([])

function add(item) {
  const theitem = { ...item, uid: getRandomCharacters() }
  voices.value.push(theitem)
}

function fnClone(el) {
  const newel = JSON.parse(JSON.stringify(el))
  if (!el?.symbol)
    newel.uid = getRandomCharacters()
  voices.value.push(newel)
}
function fnDelete(el, index) {
  voices.value.splice(index, 1)
}

async function genAudios(voiceid, voicetext, filename) {
  const res = await axios.request({
    method: 'POST',
    url: `https://api.elevenlabs.io/v1/text-to-speech/${voiceid}`,
    headers: {
      'accept': 'audio/mpeg',
      'content-type': 'application/json',
      'xi-api-key': xiapikey,
    },
    data: {
      text: voicetext,
    },
    responseType: 'arraybuffer',
  })

  const blob = new Blob([res.data], { type: 'audio/mpeg' })
  const url = URL.createObjectURL(blob)

  return blob
  // return res.data
}

async function generateDialog() {
  loading.value = true

  for (const [index, item] of voices.value.entries()) {
    try {
      // const data = await convertAndCheckStatus(options)
      const data = await genAudios(item.value, item.content, `dialog_${index}`)
      if (data != null)
        voices.value[index].audiofile = data
      voices.value[index].fileurl = URL.createObjectURL(data)
    }
    catch (_error) {
      console.error('Error in conversion:', _error)
    }
  }

  // console.log('READY TO MERGE AUDIOS!')
  mergeAudios()
}

async function mergeAudios() {
  // const crunker = new Crunker()
  const audios = []
  let textscontent = ''
  voices.value.forEach((element) => {
    // audios.push(element.audiofile.audioUrl)
    audios.push(element.audiofile)
    textscontent += `${element.content} `
  })

  const audioOutput = await concatenateAudioBlobs.init(audios)
  const thefile = {
    audioUrl: URL.createObjectURL(audioOutput),
    blob: audioOutput,
    voice: `dialogo_${getRandomCharacters()}`,
    content: textscontent,
  }
  audiofiles.value.push(thefile)
  loading.value = false
}

function playudio(theid) {
  document.querySelectorAll('audio').forEach((i) => {
    i.pause()
  })
  const player = document.getElementById(theid)
  player.play()
}
function stopaudio() {
  document.querySelectorAll('audio').forEach((i) => {
    i.pause()
  })
}

defineExpose({ add })
</script>

<template>
  <div class="mt-2 border-t-4 border-t-teal bg-primary-900 px-1 pb-5">
    <div class="mt-4 p-1 text-xs font-bold text-white">
      Conversación
    </div>

    <draggable
      :list="voices"
      :group="{ name: 'voices', pull: true, put: true }"
      item-key="uid"
      class="mx-1 p-1"
      handle=".handle"
      @start="drag = true"
      @end="drag = false"
    >
      <template #item="{ element, index }">
        <div class="mb-0.5 bg-slate-600/60 text-xs ring-1 transition-all">
          <div class="flex items-center justify-between gap-1 from-teal-600 to-primary-300 bg-gradient-to-r">
            <div class="handle grow cursor-grab items-center justify-between px-1">
              {{ element.name }}
            </div>
            <UPopover trigger="hover" class="flex items-center">
              <div i-solar-copy-line-duotone class="cursor-pointer hover:text-white" @click="fnClone(element)" />
              <template #content>
                <span p-1 text-xs dark:text-white>Duplicar</span>
              </template>
            </UPopover>
            <UPopover trigger="click" class="flex items-center">
              <div i-solar-trash-bin-trash-linear class="cursor-pointer hover:text-white" />
              <template #content>
                <UButton size="xs" class="mx-1 px-1" type="primary" @click="fnDelete(element, index)">
                  Eliminar bloque
                </UButton>
              </template>
            </UPopover>
          </div>
          <div>
            <textarea v-model="element.content" placeholder="Diálogo" class="w-full resize-none rounded bg-dark text-xs text-white" />
            <div v-if="element.audiofile" class="flex gap-1 px-1 pb-2 text-xs">
              <div class="flex justify-center gap-1 rounded">
                <UButton size="xs" class="i-solar-play-linear bg-white" @click="playudio(`dial${index}`)" />
                <UButton size="xs" class="i-solar-stop-linear bg-white" @click="stopaudio(index)" />
                <audio :id="`dial${index}`" :src="element.fileurl" type="audio/mp3" invisible w-0 />
              </div>
              <AudioToFile :fileurl="element.fileurl" :filename="`${element.content}.mp3`" />
            </div>
          </div>
        </div>
      </template>
    </draggable>
    <UButton v-if="!loading && voices.length" class="ml-auto" type="accent" @click="generateDialog">
      Generar conversación
    </UButton>
    <template v-if="loading">
      <div class="flex items-center justify-center gap-1 text-xs text-accent-100">
        <div class="i-solar-refresh-circle-broken ml-auto text-xl" animate-spin />
        <span>Procesando...</span>
      </div>
    </template>

    <!-- dialogo generado -->
    <!-- list of files -->
    <div class="mt-2 bg-slate-400 p-1">
      <div v-for="(item, index) in audiofiles" :key="index" class="mb-0.5 w-full bg-slate-700 p-1">
        <div class="flex items-center gap-1 text-sm text-white">
          <div class="max-h-[80px] overflow-y-scroll">
            <strong class="text-sm">{{ item.voice }}</strong>
            <span class="ml-1 inline-block text-[8px] leading-2">{{ item.content }}</span>
          </div>
          <div class="ml-auto flex justify-center gap-1 rounded">
            <UButton size="xs" class="i-solar-play-linear bg-white" @click="playudio(`a11b${index}`)" />
            <UButton size="xs" class="i-solar-stop-linear bg-white" @click="stopaudio(index)" />
            <audio :id="`a11b${index}`" :src="item.audioUrl" type="audio/mp3" invisible w-0 />
          </div>
          <AudioToFile :fileurl="item.audioUrl" :filename="item.voice" />
          <div class="ml-0.5 flex justify-center text-right">
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

    <!-- END -->
  </div>
</template>
