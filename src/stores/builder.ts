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
  const loading = ref(false)
  const iframeurl = ref(window.location.href.includes('localhost') ? 'https://localhost:5173/#MAKER' : 'https://odas.win/#MAKER')
  const iframeurlProd = ref(iframeurl)

  const getUserTemplates = async () => {
    const { data: usertemplates } = await supabase
      .from('usertemplates')
      .select('*')
      .eq('type', type.value)

    usertemplates.value = usertemplates
    return usertemplates
  }

  const newDoc = async (key, content) => {
    const { data } = await supabase
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
    const { data } = await supabase
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
    const { data: document } = await supabase
      .from('documents')
      .select('*')
      .eq('key', key)
      .single()
    iframeurlProd.value = iframeurlProd.value.replace('MAKER', key)
    const thejson = document
    if (!thejson.content.hasOwnProperty('attempts'))
      thejson.content.attempts = 0
    doc.value = thejson
    updateAssets()
    return true
  }

  const getContent = () => {
    return doc.value ? doc.value.content : null
  }

  const saveDoc = async () => {
    // console.log('guardando...', doc.value)
    const { data } = await supabase
      .from('documents')
      .update(doc.value)
      .eq('key', dockey.value)
  }

  const downloadDoc = () => {

  }

  const loadModulos = async () => {
    const { data: modulos } = await supabase
      .from('modulos')
      .select('*')
      .eq('type', type.value)
    modulos.value = modulos

    modulos?.forEach((i) => {
      modulosobj.value[i.name] = { ...i.schema, icon: i.icon, color: i.color }
    })
    return modulos
  }

  const updateDocScenes = (data) => {
    doc.value.content.activity.scenes = []
    loading.value = true
    setTimeout(() => {
      data.forEach((element) => {
        doc.value.content.activity.scenes.push(element)
      })
      loading.value = false
    }, 500)
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

  return { menu, usertemplates, type, doc, dockey, files, modulos, modulosobj, loading, newDoc, loadDoc, getContent, updateAssets, saveDoc, downloadDoc, loadModulos, metadata, download, blockprops, getUserTemplates, updateDocScenes, iframeurl, iframeurlProd }
})

/*
if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore as any, import.meta.hot))
*/
