<template>
  <template v-for="(item, index) in builderstore.files" :key="index" >
    <div class="flex gap-2 justify-between items-center p-1 my-1 bg-slate-100 dark:bg-slate-700" >

      <template v-if="item.mimetype.includes('image')">
        <div flex gap-2 items-center>
          <div i-solar-sun-fog-line-duotone text-lg></div>
          <img :src="item.url" class="w-12">
        </div>
      </template>

      <template v-if="item.mimetype.includes('video')">
        <div flex gap-2 items-center>
          <div i-solar-clapperboard-open-play-line-duotone text-lg></div>
          <div class="w-12 aspect-square bg-slate-1/10 rounded"></div>
        </div>
      </template>

      <template v-if="item.mimetype.includes('audio')">
        <div flex gap-2 items-center>
          <div i-solar-music-notes-line-duotone></div>
          <div class="w-12 aspect-square bg-slate-1/10 rounded"></div>
        </div>
      </template>

      <div mr-auto>{{ item.name }}</div>

      <UPopover trigger="hover" >
        <a :href="item.url" target="_blank">
          <div i-solar-square-bottom-up-line-duotone class="cursor-pointer "  />
        </a>
        <template #content><span dark:text-white text-xs p-1>Abrir archivo</span></template>
      </UPopover>

      <UPopover trigger="click" >

        <div i-solar-trash-bin-trash-linear class="cursor-pointer "  />

        <template #content><UButton dark:text-dark text-xs p-1 @click="deleteAsset(item)">Eliminar archivo</UButton></template>
      </UPopover>

    </div>



  </template>
</template>


<script setup>
const builderstore = useBuilderStore()
const router = useRoute()
builderstore.updateAssets()


const deleteAsset = async (item) => {
  const { data, error } = await supabase
    .storage
    .from(builderstore.type)
    .remove([builderstore.dockey+'/'+item.name])
  builderstore.updateAssets()
}

</script>
