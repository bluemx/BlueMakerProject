<script setup>
import { Vue3JsonEditor } from 'vue3-json-editor'
import { storeToRefs } from 'pinia'
import { Codemirror } from 'vue-codemirror'
import { json } from '@codemirror/lang-json'
import { oneDark } from '@codemirror/theme-one-dark'

console.log(json)
const extensions = [json(), oneDark]
const view = shallowRef()
const handleReady = (payload) => {
  view.value = payload.view
}

const builderstore = useBuilderStore()
const { doc } = storeToRefs(builderstore)

const loading = ref(true)
const code = ref({ ...builderstore.doc.content })

function onJsonChange(value) {
  builderstore.doc.content = value
}

function onModeChange(value) {
  // console.log('value:', value)
}

const contentModel = ref(builderstore.doc ? builderstore.doc.content : '')

const jsoncode = ref(JSON.stringify(contentModel.value, null, "\t"))

// Watch for changes in builderstore.doc.content and update contentModel
watch(() => builderstore.doc.content, (newContent) => {
  contentModel.value = newContent
})
</script>

<template>
  <!--
    <Vue3JsonEditor v-model="contentModel" class="bg-white" @json-change="onJsonChange" @mode-change="onModeChange" />
  -->
  <codemirror
    v-model="jsoncode"
    placeholder="Code goes here..."
    class="h-full"

    :autofocus="true"
    :indent-with-tab="true"
    :tab-size="2"
    :extensions="extensions"
    @ready="handleReady"></codemirror>
</template>
