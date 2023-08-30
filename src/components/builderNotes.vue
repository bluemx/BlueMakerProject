<script setup>
import { UseDraggable as Draggable } from '@vueuse/components'

const builderstore = useBuilderStore()
const dialog = ref(false)
const note = ref(builderstore.doc.notes)
const handleWindow = ref(null)

const widthWindow = ref('w-60')

function updateNote() {
  builderstore.doc.notes = note.value
}

function dialogClick() {
  dialog.value = !dialog.value
}
</script>

<template>
  <div title="Notas" class="aspect-square flex cursor-pointer items-center justify-center bg-amber-600/30 hover:bg-amber" @click="dialogClick">
    <div class="i-solar-notebook-line-duotone" />
  </div>
  <div class="fixed bottom-0 left-20 w-80 bg-slate-700 p-1 text-xs shadow" />

  <Draggable v-if="dialog" v-slot="{ _x, _y }" :prevent-default="true" :handle="handleWindow" class="floating-window fixed z-90 min-h-[220px] min-w-[220px] flex flex-col resize overflow-auto border-2 border-amber-500 bg-white text-xs shadow-xl">
    <header ref="handleWindow" class="flex cursor-grab gap-2 bg-amber-500 p-0.5 text-slate-600" @mousedown="startDragging">
      Notas
    </header>
    <textarea v-model="note" class="textarea h-60 h-full w-full flex-grow resize-none rounded-0 p-2 text-[12px] leading-4 dark:text-slate-900" @input="updateNote" />
  </Draggable>
</template>
