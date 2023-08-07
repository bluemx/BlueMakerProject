<script setup>
import { UInput } from 'unocss-ui';


const playuid = import.meta.env.VITE_PLAY_USERID
const playsk = import.meta.env.VITE_PLAY_SK
const playOptions = {
    headers: {
      'accept': 'application/json',
      'content-type': 'application/json',
      'AUTHORIZATION': 'Bearer '+playsk,
      'X-USER-ID': playuid,
    }
  };


const builderstore = useBuilderStore()

const voices = ref([])

const loading = ref(false)



const loadVoices = () => {
  const options = {...playOptions, method: 'GET'}
  fetch('https://play.ht/api/v1/getVoices', options)
  .then(response => response.json())
  .then((response)=>{
    voices.value = response.voices
  })
  .catch(err => console.error(err));
}


const audiofiles = ref([])

const voicesGenderFilter = ref('-')
const voicesLanguageFilter = ref('en-US')
const voicesNameFilter = ref('')
const voicesFilter = computed(()=>{

    const filteredGender = () => {
      let res = [];
      if(voicesGenderFilter.value=='-'){
        res = voices.value
      } else {
        res = voices.value.filter((item) => {
          return item.gender.toLowerCase() == voicesGenderFilter.value.toLowerCase()
        })
      }
      return res
    }

    const filteredLang = filteredGender().filter((item) => {
      return item.languageCode.toLowerCase() == voicesLanguageFilter.value.toLowerCase()
    })

    const filteredName = filteredLang.filter((item) => {
      return item.name.toLowerCase().includes(voicesNameFilter.value.toLowerCase())
    })
    return filteredName

})
const generateAudio = async () => {
  console.log('generateAudio()')
  loading.value = true

  var options = {
    ...playOptions,
    method: 'POST',
    body: JSON.stringify({
      content: [content.value],
      voice: voice.value.value,
      title: file.value || 'abc',
      //narrationStyle: false,
      globalSpeed: '100%',
      //pronunciations: [],
      trimSilence: true,
      //transcriptionvalue: 'string'
    })
  }
  fetch('https://play.ht/api/v1/convert', options)
  .then(response => response.json())
  .then( (response) => {
    if(response.status == "CREATED"){
      console.log('created')
      checkForFileConvertion(response.transcriptionId, options)
    }
  })
  .catch(err => console.error(err));
}


const checkForFileConvertion = (transcriptionId, options) => {
  console.log('checking')
  var options = {...playOptions, method: 'GET'}
  fetch('https://play.ht/api/v1/articleStatus?transcriptionId='+transcriptionId, options)
  .then(responseFile => responseFile.json())
  .then((responseFile) => {
    if(responseFile.converted){
      console.log('file:', responseFile)
      const thefile = {
        ...responseFile,
        voice: voice.value,
        content: content.value
      }
      audiofiles.value.push(thefile)
      loading.value = false
    } else {
      setTimeout(()=>{
        console.log('check again...')
        checkForFileConvertion(transcriptionId, options)
      }, 1000)
    }
  })
  .catch(errFile => console.error(errFile));
}

const file = ref('instruccion')
const content = ref('')
const voice = ref({ "value": "en-US-SaraNeural", "name": "Sara", "language": "English (US)", "voiceType": "Neural", "languageCode": "en-US", "gender": "Female", "service": "ms", "styles": [ "angry", "cheerful", "excited", "friendly", "hopeful", "sad", "shouting", "terrified", "unfriendly", "whispering" ], "sample": "https://media.play.ht/full_-MmMggzQYiUs1EbXmmEv.wav" })


const playudio = (theid) => {
  document.querySelectorAll('audio').forEach((i)=>{ i.pause() })
  const player = document.getElementById(theid)
  player.play()
}
const stopaudio = (theid) => {
  document.querySelectorAll('audio').forEach((i)=>{ i.pause() })
}



onMounted(() => {
  loadVoices()
})

</script>

<template>
  <div class=" h-full bg-slate-800 flex flex-col ">
    <div class="border-l-4 border-r-4 border-slate-500 p-2">
      <div class="grid grid-cols-2 items-center my-1 gap-1 justify-center">
          <div class="flex gap-1 items-center my-1">
            <UButton size="xs" class="px-1" :type="voicesLanguageFilter==item?'primary':'default'" @click="voicesLanguageFilter=item"  v-for="(item, index) in ['en-US', 'en-CA', 'en-GB']" :key="index">
              {{ item }}
            </UButton>
          </div>
          <div  class="flex gap-1 items-center justify-end" >
            <UButton size="xs" class="px-1" :type="voicesGenderFilter==item?'secondary':'default'" @click="voicesGenderFilter=item"  v-for="(item, index) in ['-', 'Female', 'Male']" :key="index">
              {{ item }}
            </UButton>
          </div>
        </div>
        <UInput v-model="voicesNameFilter" placeholder="Nombre" class="text-xs p-0.5 text-dark"></UInput>
      </div>
      <!-- lista -->
      <div class="border-4 border-slate-500 p-2" v-if="!loading">
        <div class="h-[180px] text-xs overflow-y-scroll">
          <div :class="['flex gap-1 w-full justify-between  mb-0.5 hover:bg-primary-700 cursor-pointer', item.value==voice.value?'bg-accent':'bg-slate-500']"  v-for="(item, index) in voicesFilter" :key="index" @click="voice=item">
            <div>
              <strong>{{ item.name }}</strong>
              <span v-if="item.isKid" class="text-amber inline-block ml-2">(Niño)</span>
              <span class="opacity-50 text-[8px] inline-block ml-2">{{ item.voiceType }}</span>
            </div>
            <div class="rounded flex justify-center gap-1">
              <UButton size="xs" class="i-solar-play-linear bg-white" @click="playudio('a'+index)"></UButton>
              <UButton  size="xs" class="i-solar-stop-linear bg-white" @click="stopaudio()"></UButton>
              <audio :src="item.sample" type="audio/mp3" invisible w-0 :id="'a'+index"></audio>
            </div>
          </div>
        </div>
      </div>

    <div  flex flex-col gap-2 mt-1>
      <textarea v-if="!loading" :placeholder="voice.name+': Diálogo'" id="" name=""  class=" w-full resize-none text-xs rounded text-white bg-dark" v-model="content" />
      <UButton v-if="!loading" @click="generateAudio" class="ml-auto" type="accent">Generar audio</UButton>
      <template v-if="loading">
        <div class="text-accent-100 text-xs flex gap-1 justify-center items-center">
          <div class="i-solar-refresh-circle-broken ml-auto text-xl" animate-spin></div>
          <span>Procesando...</span>
        </div>
      </template>
    </div>
    <!-- list of files -->
    <div class="bg-slate-400 p-1 mt-2">
      <div :class="[' w-full  bg-slate-700 mb-0.5 p-1 ']" v-for="(item, index) in audiofiles" :key="index">
          <div class="flex gap-1  items-center text-sm">
            <div>
              <strong class="text-sm">{{ item.voice.name }}</strong>
              <span class="text-[8px] leading-2 inline-block ml-1">{{ item.content }}</span>
            </div>
            <span class="opacity-50 text-[8px] inline-block ml-1">({{ item.audioDuration }}s)</span>
            <div class="rounded flex justify-center gap-1 ml-auto">
              <UButton size="xs" class="i-solar-play-linear bg-white" @click="playudio('b'+index)"></UButton>
              <UButton  size="xs" class="i-solar-stop-linear bg-white" @click="stopaudio(index)"></UButton>
              <audio :src="item.audioUrl" type="audio/mp3" invisible w-0 :id="'b'+index"></audio>
            </div>
            <div class="text-right flex justify-center ml-2">
              <UPopover trigger="click" class="leading-2">
                <UButton size="sm" type="primary" >A assets</UButton>
                <template #content>
                  <AudioToAssets :item="item"></AudioToAssets>
                </template>
              </UPopover>
            </div>
          </div>
      </div>
    </div>



  </div>
</template>
