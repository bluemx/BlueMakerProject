<script setup>

import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
  apiKey: window.atob(import.meta.env.VITE_OPENAI_API_KEY)
});
delete configuration.baseOptions.headers['User-Agent'];

const openai = new OpenAIApi(configuration);

const promptSystemText = `You are a JSON coder that turns the prompt into json a object.The code you write will be compiler into ant html interactive learning activity. You can use three json blocks: "group", "text", "image".
{ "block": "group", "class": "", "content": [], "background": "", "id": "", "name": "YxOn" }
{ "text": "texto", "class": "", "id": "", "block": "text", "name": "j4DU" }
{ "file": "", "class": "", "id": "", "block": "image", "name": "bEVs" }
The class field uses classes from tailwind and daisyui. Only the group has "content" where you can nest more blocks. Text block has "text" key where texts should go. Next there is an usage example. All names and structures should be replaced accordingly:
{"class":"bg-slate-200 rounded p-1","content":[{"class":"text-center","content":[{"text":"Im a text","class":"text-2xl font-bold mb-4","id":"","block":"text","name":"abcd"}],"background":"","id":"","block":"group","name":"h4ip"},{"block":"group","class":"grid grid-cols-2 gap-5","content":[{"block":"group","class":"bg-sky-800 p-1 rounded flex justify-center items-center","content":[{"text":"Hello! Im a text.","class":"text-white text-4xl","id":"","block":"text","name":"zCKP"}],"background":"","id":"","name":"Elli","hidden":false},{"block":"group","class":"bg-rose-500 p-1 rounded","content":[{"file":"https://mtvmbpemhwbrljhzdrci.supabase.co/storage/v1/object/public/riodas/A1-2U1L1EB/shot.png","class":"","id":"","block":"image","name":"9AqT"}],"background":"","id":"","name":"C5i6","hidden":false}],"background":"","id":"","name":"klmn","hidden":false}],"background":"","id":"","block":"group","name":"PT:Zuow"}
The name is a random 4 characters string.  The first groups name (the one the root), where all the items are, should be prefixed with "PT:"+[4 caracters]. Only one "PT:" per object. Is important that every "name" is unique through all the document.
I will ask you for structures and you will write them using group, text, and image. I will give you specific instructions in spanish.
If images are required use the ones from the "Pool of images" that have a closer name to the requirement. Put the name of the image from the pool on the "file" key.
Do not include any explanations, only provide a RFC8259 compliant JSON response following this format without deviation.`;

const builderstore = useBuilderStore()
const theprompt = ref()
const imagespool = ref()
const loading = ref(false)
const sending = async () => {

  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {"role": "system", "content": promptSystemText + imagespool.value},
      {role: "user", content: theprompt.value}
    ],
  });
  const content = completion.data.choices[0].message.content
  try {
    //return JSON.parse(completion.data.choices[0].message?.content);
    const response = JSON.parse(content)
    pushToscene(response)
  } catch (e) {
    throw new Error('The json strucure generated from gpt is not a valid one, please try again');
    alert('Error... intenta de nuevo o usa un prompt más corto')
  }

  loading.value = false
}

const pushToscene = (obj) => {
  builderstore.doc.content.activity.scenes[0].content.push(obj)
  imagespool.value = ' Pool of images:' + builderstore.files.map((i)=>i.url).toString()

}





const promptSend = () => {
loading.value = true
  sending()
}

</script>

<template>
  <div class=" h-full bg-slate-800 flex flex-col ">
    <textarea placeholder="PROMPT" id="" name=""  class=" h-full resize-none text-xs rounded m-2 text-neutral" v-model="theprompt" />
    <div class="text-right p-5" v-if="theprompt">
      <UButton v-if="!loading" @click="promptSend" class="ml-auto">Enviar prompt</UButton>
      <div v-else> <div class="i-solar-refresh-circle-broken ml-auto" animate-spin></div> Cargando... </div>
    </div>
  </div>
</template>
