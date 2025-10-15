<template>
  <div>
    <button @click="pickDir">Abrir carpeta…</button>

    <ul v-if="files.length">
      <li v-for="f in files" :key="f">{{ f }}</li>
    </ul>

    <div v-if="odaContent">
      <h3>Contenido de oda.json</h3>
      <textarea v-model="odaContent" rows="12" cols="80"></textarea>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const files = ref([]);
const odaContent = ref("");

async function pickDir() {
  try {
    const dirHandle = await window.showDirectoryPicker();
    files.value = [];
    odaContent.value = "";

    // Recorrido recursivo
    async function walk(handle, prefix = "") {
      for await (const [name, h] of handle.entries()) {
        const rel = prefix ? `${prefix}/${name}` : name;

        if (h.kind === "directory") {
          await walk(h, rel);
        } else {
          files.value.push(rel);

          // Solo si está en la raíz
          if (name === "oda.json" && !prefix) {
            const file = await h.getFile();
            odaContent.value = await file.text();
          }
        }
      }
    }

    await walk(dirHandle);
  } catch (err) {
    if (err.name !== "AbortError") console.error(err);
  }
}
</script>