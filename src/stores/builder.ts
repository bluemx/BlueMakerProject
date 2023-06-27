import { defineStore } from 'pinia'
import * as JSZip from 'jszip'
import JSZipUtils from "jszip-utils";
import { saveAs } from 'file-saver';

export const useBuilderStore = defineStore('builder', () => {
  const router = useRouter()
  const type = ref(null)
  const doc = ref(null)
  const files = ref()
  const dockey = ref()
  const menu = ref(null)
  const modulos = ref()
  const modulosobj = ref({})

  const newDoc = async (key, content) => {
    const { data, error } = await supabase
      .from('documents')
      .insert([
        { key, content },
      ])
      .select()
      .single()
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

  const loadModulos = async () => {
    const { data: modulos, error } = await supabase
    .from('modulos')
    .select('*')
    .eq('type', type.value)
    modulos.value = modulos

    modulos?.forEach(i => {
      modulosobj.value[i.name] = {...i.schema, icon: i.icon}
    })
    return modulos
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



  const metadata = (key, val) => {
    if(!doc.value.content?.metadata){
      doc.value.content.metadata = {}
    }
    doc.value.content.metadata[key] = val
  }


  const urlToPromise = async (url) => {
    return new Promise(function (resolve, reject) {
      JSZipUtils.getBinaryContent(url, function (err, data) {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  };

  const download = () => {
    var zip = new JSZip();

    let document = JSON.stringify(doc.value.content)

    var mainfolder = zip.folder(dockey.value)

    var filesfolder = mainfolder.folder("files");

    files.value.forEach((file)=>{
      document = document.replaceAll(file.url, 'files/'+file.name)

      filesfolder.file(
        file.name,
        urlToPromise(file.url),
        { binary: true }
      );

    })

    mainfolder.file("oda.json", document);

    //img.file("smile.gif", imgData, {base64: true});
    zip.generateAsync({type:"blob"})
    .then(function(content) {
        // see FileSaver.js
        saveAs(content, dockey.value+".zip");
    });
  }

  return { menu, type, doc, dockey, files, modulos, modulosobj, newDoc, loadDoc, getContent, updateAssets, saveDoc, downloadDoc, loadModulos, metadata, download }
})




/*
if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore as any, import.meta.hot))
*/
