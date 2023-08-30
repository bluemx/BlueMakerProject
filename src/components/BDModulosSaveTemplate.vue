<script setup>
const props = defineProps({
  data: Object,
})
const builderstore = useBuilderStore()
const stored = ref(false)
const name = ref('')

async function save() {
  const theitem = { name: name.value, object: props.data, type: builderstore.type }

  const { data, error } = await supabase
    .from('usertemplates')
    .insert([
      theitem,
    ])
    .select()
  if (data)
    stored.value = true
}
</script>

<template>
  <div class="p-1">
    <div class="flex justify-between gap-1 text-xs">
      <div>Template:</div>
      <div class="text-primary">
        <strong>{{ data.block }}</strong> [{{ data.name }}]
      </div>
    </div>
    <div v-if="!stored" class="mt-1 flex gap-1">
      <UInput v-model="name" size="sm" placeholder="Nombre de template" class="text-neutral" />
      <UButton v-if="name.length > 2" size="sm" color="primary" @click="save">
        Guardar
      </UButton>
    </div>
    <div v-else class="text-center text-amber">
      {{ name }} guardado
    </div>
  </div>
</template>
