<template>
  <draggable
    ghost-class="moduleghost"
    :list="doccontent"
    group="people"
    item-key="id"
    class="min-h-md flex flex-col gap-0.5 bg-slate-4 p-1"
    :sort="true"
    @start="drag = true" @end="drag = false"
  >
    <template #item="{ element }">
      <div :title="element.name" flex cursor-grab items-center justify-center bg-white p-1>
        <div>{{ element.name }}</div>
      </div>
    </template>
  </draggable>
</template>
