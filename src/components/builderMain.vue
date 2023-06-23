<template>

</template>
<script>
const builderstore = useBuilderStore()
watch((builderstore), (ncontent) => {
    if(ncontent.doc){
      console.log(ncontent.doc.content)
      //document.querySelector()
    }
  }, {deep: true})
</script>
