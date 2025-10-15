<script setup>
import { ref, onBeforeUnmount } from 'vue'

const builderstore = useBuilderStore()

const width = ref(300)          // px
const minW  = 220
const maxW  = 900

const isResizing = ref(false)
let startX = 0
let startW = 0
let rafId = null

const clamp = (v, a, b) => Math.min(b, Math.max(a, v))

const onPointerDown = (e) => {
  isResizing.value = true
  startX = e.clientX
  startW = width.value

  // Captura el puntero para no perder el drag aunque salgas del handle
  e.target.setPointerCapture?.(e.pointerId)

  // feedback y evita selección de texto
  document.body.style.cursor = 'col-resize'
  document.body.style.userSelect = 'none'
}

const onPointerMove = (e) => {
  if (!isResizing.value) return
  // throttle con rAF para suavidad
  if (rafId) return
  rafId = requestAnimationFrame(() => {
    const dx = e.clientX - startX
    width.value = clamp(startW + dx, minW, maxW)
    rafId = null
  })
}

const onPointerUp = (e) => {
  if (!isResizing.value) return
  isResizing.value = false
  e.target.releasePointerCapture?.(e.pointerId)
  document.body.style.cursor = ''
  document.body.style.userSelect = ''
}

const onWindowBlur = () => {
  // si la ventana pierde foco durante el drag, cerramos limpio
  if (!isResizing.value) return
  isResizing.value = false
  document.body.style.cursor = ''
  document.body.style.userSelect = ''
}

window.addEventListener('blur', onWindowBlur)
onBeforeUnmount(() => {
  window.removeEventListener('blur', onWindowBlur)
  if (rafId) cancelAnimationFrame(rafId)
  document.body.style.cursor = ''
  document.body.style.userSelect = ''
})
</script>

<template>
  <main class="h-screen w-screen flex">
    <div
      class="relative h-full flex-shrink-0 bg-slate-100 border-r flex"
      :style="{ width: width + 'px' }"
    >
      <BuilderMenu v-if="builderstore.doc" />
      <BuilderDetails v-if="builderstore.doc" class="flex-grow" />

      <!-- Handle -->
      <div
        class="absolute top-0 right-0 w-1 h-full bg-slate-300 hover:bg-slate-500 cursor-col-resize"
        @pointerdown="onPointerDown"
        @pointermove="onPointerMove"
        @pointerup="onPointerUp"
      />
    </div>

    <RouterView class="flex-1" />

    <!-- Overlay para capturar eventos sobre iframes/elementos interactivos -->
    <div
      v-show="isResizing"
      class="fixed inset-0 cursor-col-resize"
      @pointermove="onPointerMove"
      @pointerup="onPointerUp"
    />
  </main>
</template>