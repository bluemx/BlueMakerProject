<script setup>
const builderstore = useBuilderStore()
builderstore.type = 'riodas'
builderstore.doc = null
const defaultDocument = {"title":"Title","clock":true,"countdown":0,"intro":{"buttons":{"start":"Start"},"content":[]},"activity":{"scenes":[{"block":"scene","name":"SC1","countdown":0,"instructions":{"open":true,"content":[{"block":"group","class":"flex gap-2 items-center","content":[{"block":"audio","class":"","file":"instruction.mp3"},{"block":"text","class":"","text":"Instructions text goes here..."}]}]},"content":[{"block":"group","class":"","content":[{"block":"text","class":"","text":"Activity content goes here...","name":"3Ovd","hidden":false}],"background":"","name":"4Cs6","hidden":false},{"symbol":"FinalizeGroup"}]}]},"end":{"buttons":{"restart":false},"content":[{"symbol":"finishedAll"}]},"symbols":{"finishedAll":{"class":"w-full","content":[{"block":"group","class":"bg-slate-100 rounded p-5 text-center w-full","content":[{"block":"text","text":"Congratulations, you finished the activity.","class":"","name":"Congra"}],"background":"","name":"CongraGroup"},{"block":"group","class":"text-center p-5","content":[{"block":"finished","name":"finishedBlock"}],"background":"","name":"finishedGroup"}],"background":"","block":"group"},"FinalizeGroup":{"block":"group","class":"text-center mt-10","content":[{"block":"button","class":"mx-auto","to":"/end","text":"Finalize","name":"FinalizeBTN"}],"background":""}}}
</script>

<template>
  <BuilderDocManager v-if="!builderstore.doc" :default-doc="defaultDocument" />
</template>

<route lang="yaml">
meta:
  layout: builder
  requiresAuth: true
  </route>
