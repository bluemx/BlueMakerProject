<script setup>
const emit = defineEmits(['update:modelValue'])
const inputs = ref([''])
function addInput() {
  inputs.value.push('')
  emit('update:modelValue', inputs.value)
}

function removeInput(index) {
  inputs.value.splice(index, 1)
  emit('update:modelValue', inputs.value)
}

watch(inputs, (newValue) => {
  emit('update:modelValue', newValue)
}, { deep: true })
</script>

<template>
  <div>
    <div v-for="(input, index) in inputs" :key="index">
      <input v-model="inputs[index]">
      <button @click="removeInput(index)">
        Remove
      </button>
    </div>
    <button @click="addInput">
      Add
    </button>
  </div>
</template>
