<script setup>
const builderstore = useBuilderStore()
const router = useRoute()
builderstore.updateAssets()

async function deleteAsset(item) {
  const { data, error } = await supabase
    .storage
    .from(builderstore.type)
    .remove([`${builderstore.dockey}/${item.name}`])
  builderstore.updateAssets()
}

function cleanname(name) {
  return name.replaceAll(' ', '_').replaceAll('ñ', 'n').toLowerCase().replaceAll('.', '_')
}

function playudio(index) {
  const theid = `audio${index}`
  const player = document.getElementById(theid)
  player.play()
}
</script>

<template>
  <template v-for="(item, index) in builderstore.files" :key="index">
    <div class="my-1 flex items-center justify-between gap-2 bg-slate-100 p-1 dark:bg-slate-700">
      <template v-if="item.mimetype.includes('image')">
        <div flex items-center gap-2>
          <div i-solar-sun-fog-line-duotone text-lg />
          <img :src="item.url" class="w-12">
        </div>
      </template>

      <template v-if="item.mimetype.includes('video')">
        <div flex items-center gap-2>
          <div i-solar-clapperboard-open-play-line-duotone text-lg />
          <div class="aspect-square w-12 rounded bg-slate-1/10" />
        </div>
      </template>
      <template v-if="item.mimetype.includes('audio')">
        <div flex items-center gap-2>
          <div i-solar-music-notes-line-duotone />
          <div class="aspect-square w-12 flex justify-center rounded bg-slate-1/10 text-3xl !text-black">
            <audio :id="`audio${index}`" :src="item.url" type="audio/mp3" w-full />
            <UButton class="i-solar-play-linear bg-black" @click="playudio(index)" />
          </div>
        </div>
      </template>

      <div mr-auto>
        {{ item.name }}
      </div>

      <UPopover trigger="hover">
        <a :href="item.url" target="_blank">
          <div i-solar-square-bottom-up-line-duotone class="cursor-pointer" />
        </a>
        <template #content>
          <span p-1 text-xs dark:text-white>Abrir archivo</span>
        </template>
      </UPopover>

      <UPopover trigger="click">
        <div i-solar-trash-bin-trash-linear class="cursor-pointer" />

        <template #content>
          <UButton p-1 text-xs dark:text-dark @click="deleteAsset(item)">
            Eliminar archivo
          </UButton>
        </template>
      </UPopover>
    </div>
  </template>
</template>
