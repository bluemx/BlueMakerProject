<script setup>
const authorized = ref([])
const newuser = ref()
async function loadItems() {
  const { data } = await supabase
    .from('authorized')
    .select()
  authorized.value = data
  newuser.value = null
}
loadItems()

async function handleNew() {
  const { error } = await supabase
    .from('authorized')
    .insert({ email: newuser.value })
  if (!error)
    loadItems()
}
async function handleDelete(usr) {
  const { _error } = await supabase
    .from('authorized')
    .delete()
    .eq('id', usr.id)
  loadItems()
}
</script>

<template>
  <div class="mx-auto my-10 max-w-4xl">
    <template v-for="(item, index) in authorized" :key="index">
      <div class="grid grid-cols-2 mb-0.5 bg-slate-1 p-1">
        <div text-sm dark:text-dark>
          {{ item.email }}
        </div>

        <button class="bg-rose text-xs text-white hover:bg-slate-5" @click="handleDelete(item)">
          Eliminar
        </button>
      </div>
    </template>

    <form class="grid grid-cols-2 bg-slate-1 p-1" @submit.prevent="handleNew">
      <input v-model="newuser" type="email" placeholder="nuevo" required rounded p-2 text-center text-xs dark:text-neutral>
      <button class="bg-slate-5 text-xs text-white hover:bg-blue">
        Añadir
      </button>
    </form>
  </div>
</template>
