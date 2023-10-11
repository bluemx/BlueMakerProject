import { values } from 'cypress/types/lodash';
import { throttleFilter } from '@vueuse/core';
import { values } from 'cypress/types/lodash';
<script setup>
const props = defineProps({
  voices: Object,
})
const emit = defineEmits(['addconversation'])
const thevoices = props.voices
const thefilter = ref({
  name: '',
  language: '',
  age: '',
  gender: '',
})
const voicesFilter = computed(() => {
  if (thevoices.length === 0)
    return false
  return thevoices.filter((voice) => {
    return Object.keys(thefilter.value).every((key) => {
      return String(voice[key]).toLowerCase().startsWith(String(thefilter.value[key]).toLowerCase())
    })
  })
})

function addToConversation(item) {
  emit('addconversation', item)
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

function genderfilter(item) {
  thefilter.value.gender = thefilter.value.gender == item ? '' : item
}
</script>

<template>
  <div class="flex flex-col bg-slate-800">
    <div class="border-l-4 border-r-4 border-slate-500 p-2">
      <div class="grid grid-cols-2 my-1 items-center justify-center gap-1">
        <div class="flex items-center justify-end gap-0.5">
          <UButton v-for="(item, index) in ['Female', 'Male']" :key="index" size="xs" class="p-1 !rounded-1" :type="thefilter.gender === item ? 'secondary' : 'default'" @click="genderfilter(item)">
            {{ item }}
          </UButton>
        </div>
        <UInput v-model="thefilter.name" placeholder="Nombre" class="p-0.5 text-xs text-dark" />
      </div>
    </div>
  </div>

  <div class="border-4 border-slate-500 p-2">
    <div class="h-[180px] overflow-y-scroll text-xs">
      <div v-for="(item, index) in voicesFilter" :key="index">
        <div class="mb-0.5 w-full flex justify-between gap-1 bg-teal-600 p-1 text-white hover:bg-primary-700 hover:text-white">
          <div class="leading-3">
            <div>{{ item.name }}</div>
            <div class="inline-block text-[8px] opacity-50">
              {{ item.gender }}
            </div>
          </div>
          <div class="ml-2 inline-block text-center text-[8px] leading-3 opacity-80">
            <div>{{ item.age }}</div>
            <div class="font-bold">
              {{ item.language }}
            </div>
          </div>
          <div class="flex justify-center gap-1 rounded">
            <UButton size="xs" class="i-solar-user-plus-line-duotone bg-white" @click="addToConversation(item)" />
            <UButton size="xs" class="i-solar-play-linear bg-white" @click="playudio(`11labs${index}`)" />
            <UButton size="xs" class="i-solar-stop-linear bg-white" @click="stopaudio()" />
            <audio :id="`11labs${index}`" :src="item.sample" type="audio/mp3" invisible w-0 />
          </div>
        </div>
      </div> <!-- vfor -->
    </div>
  </div>
</template>
