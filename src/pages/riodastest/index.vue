<script setup>
const router = useRouter()
const idoda = ref()
function ir() {
  console.log(idoda.value)
  router.push(`/riodastest/${idoda.value}`)
}
</script>

<template>
  <div class="h-full w-full flex items-center justify-center">
    <div class="flex">
      <input v-model="idoda" required flex-grow rounded-tl p-2 text-center dark:text-neutral type="text" placeholder="ID de ODA">
      <button border-1 rounded-tr bg-slate px-6 py-1 text-xs text-white disabled:bg-slate-1 @click="ir">
        IR
      </button>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: builder
  requiresAuth: true
  </route>
