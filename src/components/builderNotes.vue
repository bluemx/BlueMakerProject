<template>
  <div title="Notas" class="aspect-square flex cursor-pointer items-center justify-center bg-amber-600/30 hover:bg-amber" @click="dialogClick">
    <div class="i-solar-notebook-line-duotone"/>
  </div>
  <div class="fixed bottom-0 left-20 bg-slate-700 shadow text-xs p-1 w-80" >
  </div>

  <Draggable v-slot="{ x, y }" :prevent-default="true" :handle="handleWindow" :class="['floating-window resize overflow-auto z-90 text-xs fixed bg-white shadow-xl border-2 border-amber-500 min-w-[220px] min-h-[220px] flex flex-col']" v-if="dialog">
    <header ref="handleWindow" class="bg-amber-500 text-slate-600 cursor-grab p-0.5 flex gap-2" @mousedown="startDragging">
      Notas
    </header>
    <textarea v-model="note" class="dark:text-slate-900 h-60 w-full h-full flex-grow resize-none text-[12px] textarea rounded-0 leading-4  p-2 " @input="updateNote"></textarea>


  </Draggable>



</template>


<script setup>

import { useDraggable } from '@vueuse/core'

import { UseDraggable as Draggable } from '@vueuse/components'

const builderstore = useBuilderStore();
const dialog = ref(false);
const note = ref(builderstore.doc.notes);
const handleWindow = ref(null)

const widthWindow = ref('w-60')

const updateNote = () => {
  builderstore.doc.notes = note.value;
};

const dialogClick = () => {
  dialog.value = !dialog.value;
};




</script>




