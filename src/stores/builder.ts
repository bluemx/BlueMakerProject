import { defineStore } from 'pinia'

export const useBuilderStore = defineStore('builder', () => {
  const router = useRouter()
  const type = ref(null)
  const doc = ref(null)
  const files = ref()
  const dockey = ref()
  const menu = ref(null)
  const newDoc = async (key, content) => {
    const { data, error } = await supabase
      .from('documents')
      .insert([
        { key, content },
      ])
      .select()
      .single()
      console.log(data)
    router.push(`/${type.value}/${data.key}`)
  }
  const loadDoc = async (key) => {
    dockey.value = key
    const { data: document, error } = await supabase
      .from('documents')
      .select('*')
      .eq('key', key)
      .single()
    doc.value = document
    updateAssets()
    return true
  }

  const getContent = () => {
    return doc.value ? doc.value.content : null
  }

  const geturl = (name) => {
    const { data } = supabase
        .storage
        .from(type.value)
        .getPublicUrl(dockey.value+'/'+name)
    return data.publicUrl
  }
  const saveDoc = async () => {
    const { data, error } = await supabase
      .from('documents')
      .update(doc.value)
      .eq('key', dockey.value)
  }
  const downloadDoc = () => {

  }

  const updateAssets = async () => {
    files.value = []
    const { data, error } = await supabase
      .storage
      .from(type.value)
      .list(dockey.value, {
        limit: 100,
        offset: 0,
        sortBy: { column: 'name', order: 'asc' },
      })

    data.forEach((itm)=>{
      files.value.push({name: itm.name, url: geturl(itm.name), mimetype:itm.metadata.mimetype})
    })
  }

  return { menu, type, doc, dockey, files, newDoc, loadDoc, getContent, updateAssets, saveDoc, downloadDoc }
})
/*
if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore as any, import.meta.hot))
*/
