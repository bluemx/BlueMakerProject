<template>
  <div class="bg-primary-900 px-1 pb-5 border-t-teal border-t-4 mt-2">
    <div class="font-bold text-xs p-1 mt-4">Conversación</div>

    <draggable
      :list="voices"
      :group="{ name: 'voices', pull: true, put: true }"
      item-key="uid"
      :class="['mx-1', 'p-1']"
      @start="drag = true"
      @end="drag = false"
      handle=".handle"
      >
    <template #item="{element,index}">
      <div class="bg-slate-600/60 ring-1  text-xs mb-0.5  transition-all">
        <div class="flex gap-1 items-center justify-between bg-gradient-to-r from-teal-600 to-primary-300">
          <div class="handle items-center justify-between grow px-1 cursor-grab">
            {{ element.name }}
          </div>
          <UPopover trigger="hover" class="flex items-center">
            <div i-solar-copy-line-duotone class="cursor-pointer hover:text-white" @click="fnClone(element)" />
            <template #content><span dark:text-white text-xs p-1>Duplicar</span></template>
          </UPopover>
          <UPopover trigger="click" class="flex items-center">
            <div i-solar-trash-bin-trash-linear class="cursor-pointer hover:text-white"   />
            <template #content><UButton size="xs" class="mx-1 px-1" type="primary"  @click="fnDelete(element, index)">Eliminar bloque</UButton></template>
          </UPopover>
        </div>
        <div>
          <textarea placeholder="Diálogo" class=" w-full resize-none text-xs rounded text-white bg-dark" v-model="element.content" />
          <div v-if="element.audiofile" class="text-xs flex gap-1 pb-2 px-1">
            <div class="rounded flex justify-center gap-1">
              <UButton size="xs" class="i-solar-play-linear bg-white" @click="playudio('dial'+index)"></UButton>
              <UButton  size="xs" class="i-solar-stop-linear bg-white" @click="stopaudio(index)"></UButton>
              <audio :src="element.audiofile.audioUrl" type="audio/mp3" invisible w-0 :id="'dial'+index"></audio>
            </div>
            <div class="text-[6px]">
              {{ element.audiofile.audioUrl }}
            </div>
          </div>

        </div>
      </div>
    </template>
    </draggable>
    <UButton v-if="!loading && voices.length" @click="generateDialog" class="ml-auto" type="accent">Generar conversación</UButton>
    <template v-if="loading">
        <div class="text-accent-100 text-xs flex gap-1 justify-center items-center">
          <div class="i-solar-refresh-circle-broken ml-auto text-xl" animate-spin></div>
          <span>Procesando...</span>
        </div>
      </template>

      <!-- dialogo generado-->
      <!-- list of files -->
      <div class="bg-slate-400 p-1 mt-2">
        <div :class="[' w-full  bg-slate-700 mb-0.5 p-1 ']" v-for="(item, index) in audiofiles" :key="index">
          <div class="flex gap-1  items-center text-sm">
            <div>
              <strong class="text-sm">{{ item.voice }}</strong>
              <span class="text-[8px] leading-2 inline-block ml-1">{{ item.content }}</span>
            </div>
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

      <!-- END -->
</div>

</template>




<script setup>
import Crunker from 'crunker'
import draggable from 'vuedraggable'
const props = defineProps()
const voices = ref([])
const drag = ref(false)
const loading = ref(false)

const audiofiles = ref([])

const add = (item) => {
  const theitem = {...item, uid:getRandomCharacters()}
  voices.value.push(theitem)
}

const getRandomCharacters=_=>"xxxx".replace(/x/g,_=>"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"[Math.random()*62|0]);

const fnClone = (el) => {
  const newel = JSON.parse(JSON.stringify(el))
  if(!el?.symbol){
    newel['uid'] = getRandomCharacters()
  }
  voices.value.push(newel)
}
const fnDelete= (el, index) => {
  voices.value.splice(index, 1)
}


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






function convertAndCheckStatus(convertOptions) {
  console.log('convertAndCheckStatus()', convertOptions)
  return axios.post('https://play.ht/api/v1/convert', convertOptions.body, {headers: convertOptions.headers}  )
    .then(response => response.status === 201 ? response.data.transcriptionId : Promise.reject('Conversion request failed'))
    .then(transcriptionId => {
      const articleStatusUrl = `https://play.ht/api/v1/articleStatus?transcriptionId=${transcriptionId}`;
      let convertedData = null;

      const intervalId = setInterval(() => {
        axios.get(articleStatusUrl, {headers: convertOptions.headers} )
          .then(response => response.data)
          .then(data => {
            if (data.converted) {
              clearInterval(intervalId); // Stop polling
              convertedData = data; // Store the converted data
            }
          })
          .catch(error => {
            console.error('Error:', error);
            clearInterval(intervalId); // Stop polling on error
          });
      }, 1000); // Poll every second

      return new Promise((resolve) => {
        const checkInterval = setInterval(() => {
          if (convertedData !== null) {
            clearInterval(checkInterval);
            resolve(convertedData);
          }
        }, 100); // Check every 100 milliseconds
      });
    })
    .catch(error => {
      console.error('Error:', error);
      return null;
    });
}



const generateDialog = async () => {
  loading.value = true;

  for (const [index, item] of voices.value.entries()) {
    var options = {
      ...playOptions,
      body: JSON.stringify({
        content: [item.content],
        voice: item.value,
        title: 'dialog_' + index,
        trimSilence: true,
      }),
    };

    try {
      const data = await convertAndCheckStatus(options);
      if (data !== null) {
        voices.value[index].audiofile = data;
      }
    } catch (error) {
      console.error('Error in conversion:', error);
    }
  }

  loading.value = false;
  console.log('READY TO MERGE AUDIOS!');
  mergeAudios();
};



const mergeAudios = () => {
  const crunker = new Crunker()
  const audios = []
  voices.value.forEach(element => {
    audios.push(element.audiofile.audioUrl)
  });
  crunker
    .fetchAudio(...audios)
    .then((buffers) => {
      // => [AudioBuffer, AudioBuffer]
      return crunker.concatAudio(buffers);
    })
    .then((merged) => {
      // => AudioBuffer
      return crunker.export(merged, 'audio/mp3');
    })
    .then((output) => {
      // => {blob, element, url}
      // SAVE MERGED AUDIO

      const thefile = {
        audioUrl: output.url,
        blob: output.blob,
        voice: "dialogo_"+getRandomCharacters(),
        content: ""
      }
      audiofiles.value.push(thefile)
      //crunker.download(output.blob);
    })
    .catch((error) => {
      // => Error Message
    });

}






const playudio = (theid) => {
  document.querySelectorAll('audio').forEach((i)=>{ i.pause() })
  const player = document.getElementById(theid)
  player.play()
}
const stopaudio = (theid) => {
  document.querySelectorAll('audio').forEach((i)=>{ i.pause() })
}


defineExpose({add})
</script>
