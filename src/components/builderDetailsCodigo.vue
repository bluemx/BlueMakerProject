<script setup>
import { Vue3JsonEditor } from 'vue3-json-editor'
import { storeToRefs } from 'pinia'

const builderstore = useBuilderStore()
const { doc } = storeToRefs(builderstore)

const loading = ref(true)
// const code = ref({ ...builderstore.doc.content })

function onJsonChange(value) {
  builderstore.doc.content = value
}

function onModeChange(value) {
  // console.log('value:', value)
}

const contentModel = ref(builderstore.doc ? builderstore.doc.content : '')

// const jsoncode = ref(JSON.stringify(contentModel.value, null, "\t"))

// Watch for changes in builderstore.doc.content and update contentModel
watch(() => builderstore.doc.content, (newContent) => {
  contentModel.value = newContent
})
</script>

<template>
  <div relative h-full bg-stone-6>
    <Vue3JsonEditor v-model="contentModel" mode="code" class="h-full bg-white" @json-change="onJsonChange" @mode-change="onModeChange" />
  </div>
</template>
