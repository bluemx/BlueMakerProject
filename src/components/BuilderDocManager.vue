<script setup>
const props = defineProps({
  defaultDoc: Object,
})
const builderstore = useBuilderStore()
const dialog = ref()

const filter = ref('')
const docs = ref([])
const docsFilter = computed(() => {
  if (filter.value === '' || filter.value === null) {
    return docs.value
  }
  else {
    return docs.value.filter((item) => {
      return item.key.toLowerCase().includes(filter.value.toLowerCase())
    })
  }
})

async function loadItems() {
  const { data: documents, error } = await supabase
    .from('documents')
    .select('key')
  docs.value = documents
}

function onInput() {
  filter.value = filter.value.toUpperCase()
}

const canCreate = computed(() => {
  let res = false
  if (docsFilter.value && docsFilter.value.length) {
    if (docsFilter.value[0].key === filter.value)
      res = true
  }
  return res
})

function builderNewDoc() {
  console.log(filter.value, props.defaultDoc)
  builderstore.newDoc(filter.value, props.defaultDoc)
}

onMounted(() => {
  dialog.value.showModal()
  loadItems()
})
</script>

<template>
  <dialog ref="dialog" class="flex flex-col gap-2 bg-slate-100">
    <div class="flex">
      <input v-model="filter" required flex-grow rounded-tl p-2 text-center dark:text-neutral type="text" placeholder="ID" @input="onInput">
      <button :disabled="canCreate" border-1 rounded-tr bg-slate px-6 py-1 text-xs text-white disabled:bg-slate-1 @click="builderNewDoc">
        Nuevo
      </button>
    </div>
    <div grid grid-cols-2 my-5 gap-1 md:grid-cols-6 dark:text-neutral>
      <template v-for="(item, _index) in docsFilter" :key="_index">
        <router-link :to="`/${builderstore.type}/${item.key}`" border-1 border-slate rounded p-1 text-center text-xs>
          <button>
            {{ item.key }}
          </button>
        </router-link>
      </template>
    </div>
  </dialog>
</template>
