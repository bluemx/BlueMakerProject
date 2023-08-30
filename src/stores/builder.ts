import { defineStore } from 'pinia'

// import * as JSZip from 'jszip'
import JSZipUtils from 'jszip-utils'
import saveAs from 'file-saver'

export const useBuilderStore = defineStore('builder', () => {
  const router = useRouter()
  const type = ref(null)
  const doc = ref(null)
  const files = ref()
  const dockey = ref()
  const menu = ref(null)
  const modulos = ref()
  const modulosobj = ref({})
  const usertemplates = ref([])

  const getUserTemplates = async () => {
    const { data: usertemplates, _error } = await supabase
      .from('usertemplates')
      .select('*')
      .eq('type', type.value)

    usertemplates.value = usertemplates
    return usertemplates
  }

  const newDoc = async (key, content) => {
    const { data, _error } = await supabase
      .from('documents')
      .insert([
        { key, content },
      ])
      .select()
      .single()
    router.push(`/${type.value}/${data.key}`)
  }

  const geturl = (name) => {
    const { data } = supabase
      .storage
      .from(type.value)
      .getPublicUrl(`${dockey.value}/${name}`)
    return data.publicUrl
  }

  const updateAssets = async () => {
    files.value = []
    const { data, _error } = await supabase
      .storage
      .from(type.value)
      .list(dockey.value, {
        limit: 100,
        offset: 0,
        sortBy: { column: 'name', order: 'asc' },
      })

    data.forEach((itm) => {
      files.value.push({ name: itm.name, url: geturl(itm.name), mimetype: itm.metadata.mimetype })
    })
  }

  const loadDoc = async (key) => {
    dockey.value = key
    const { data: document, _error } = await supabase
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

  const saveDoc = async () => {
    // console.log('guardando...', doc.value)
    const { data, _error } = await supabase
      .from('documents')
      .update(doc.value)
      .eq('key', dockey.value)
  }

  const downloadDoc = () => {

  }

  const loadModulos = async () => {
    const { data: modulos, _error } = await supabase
      .from('modulos')
      .select('*')
      .eq('type', type.value)
    modulos.value = modulos

    modulos?.forEach((i) => {
      modulosobj.value[i.name] = { ...i.schema, icon: i.icon, color: i.color }
    })
    return modulos
  }

  const blockprops = (blockname) => {
    // if(Object.keys(modulosobj.value)>0){
    return modulosobj.value[blockname]
    // } else {
    // return 'nup'
    // }
  }

  const metadata = (key, val) => {
    if (!doc.value.content?.metadata)
      doc.value.content.metadata = {}

    doc.value.content.metadata[key] = val
  }

  const urlToPromise = async (url) => {
    return new Promise((resolve, reject) => {
      JSZipUtils.getBinaryContent(url, (err, data) => {
        if (err)
          reject(err)
        else
          resolve(data)
      })
    })
  }

  const download = async () => {
    const JSZip = await import('jszip/dist/jszip')
    // console.trace('download()')
    // var zip = new JSZip();
    const zip = new JSZip.default()
    // console.trace('new JSZip')
    let document = JSON.stringify(doc.value.content)
    const mainfolder = zip.folder(dockey.value)
    const filesfolder = mainfolder.folder('files')
    // console.trace('document + folders')
    files.value.forEach((file) => {
      // console.trace('files foreach', file.name)
      document = document.replaceAll(file.url, `files/${file.name}`)
      filesfolder.file(
        file.name,
        urlToPromise(file.url),
        { binary: true },
      )
    })
    mainfolder.file('oda.json', document)
    // console.trace('added document')
    zip.generateAsync({ type: 'blob' })
      .then((content) => {
        saveAs(content, `${dockey.value}.zip`)
        // console.trace('saveAs')
      })
  }

  return { menu, usertemplates, type, doc, dockey, files, modulos, modulosobj, newDoc, loadDoc, getContent, updateAssets, saveDoc, downloadDoc, loadModulos, metadata, download, blockprops, getUserTemplates }
})

/*
if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore as any, import.meta.hot))
*/
