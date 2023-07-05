<template>
<div class="p-1">
  <div class="text-xs flex justify-between gap-1">
    <div>Template:</div>
    <div class="text-primary"><strong>{{ data.block }}</strong> [{{ data.name }}]</div>
  </div>
  <div class="flex mt-1 gap-1" v-if="!stored">
    <UInput size="sm" v-model="name" placeholder="Nombre de template" class="text-neutral">
    </UInput>
    <UButton v-if="name.length>2" size="sm" color="primary" @click="save">Guardar</UButton>
  </div>
  <div v-else class="text-center text-amber">{{ name }} guardado</div>
</div>
</template>

<script setup>
const builderstore = useBuilderStore()
const props = defineProps({
  data: Object
})
const stored = ref(false)
const name = ref('')

const save = async () => {

  const theitem = { name: name.value, object: props.data, type: builderstore.type }

  const { data, error } = await supabase
    .from('usertemplates')
    .insert([
      theitem
    ])
    .select()
  if(data){
    stored.value = true
  }
}
</script>
