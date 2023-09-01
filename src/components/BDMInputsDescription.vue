<script setup>
const props = defineProps({
  properties: [Object, Boolean],
})
</script>

<template>
  <div v-if="properties" class="inline-block cursor-pointer align-top hover:text-amber">
    <UPopover trigger="click">
      <div i-solar-question-circle-bold />
      <template #content>
        <div v-if="properties.description" class="m-1 w-40 text-xs leading-3 text-amber">
          {{ properties?.description }}
        </div>
      </template>
    </UPopover>
  </div>
</template>
