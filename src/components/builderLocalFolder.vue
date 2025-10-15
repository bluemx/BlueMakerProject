<template>
  <div
    ref="box"
    class="folder-box border-dashed border-2 border-slate-400 p-1 max-h-14 flex flex-col text-xs flex-grow mb-1"
    @dragover.prevent="onDragOver"
    @drop.prevent="onDrop"
    title="Arrastra aquí una carpeta"
  >
   

    <div class="content text-xs h-full overflow-auto inline">
      <div class="flex gap-1 flex-wrap items-center">
        <div class="text-rose ">{{ state.dirName || 'Arrastrar ODA (folder) ⬇️ ' }}</div>
        <div v-for="p in state.files" :key="p.path" class="bg-slate-100/30 px-1 opacity-70">
          {{ p.path }}
        </div>
        <button class="px-2 py-0.5 border border-slate-300 rounded hover:bg-slate-100 ml-auto mt-auto" @click="pickFolder">
        Seleccionar carpeta…
      </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, watch, defineProps, defineEmits, defineExpose } from 'vue';

/** v-model: { dirHandle, dirName, files, odaContent } */
const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({ dirHandle: null, dirName: '', files: [], odaContent: '' }),
  },
});
const emit = defineEmits(['update:modelValue', 'change']);

const state = reactive({
  dirHandle: null,
  dirName: '',
  files: [],          // [{ path, name, dataUrl, mimetype }]
  odaContent: '',
  _odaHandle: null,
  assetsMap: {},      // files/* -> data:...
});

/* Sync con padre (si lo usas con v-model) */
watch(
  () => props.modelValue,
  (v) => {
    if (!v) return;
    state.dirHandle = v.dirHandle ?? null;
    state.dirName = v.dirName ?? '';
    const incoming = Array.isArray(v.files) ? v.files : [];
    state.files = incoming.map((x) =>
      typeof x === 'string'
        ? ({ path: x, name: x.split('/').pop(), dataUrl: null, mimetype: '' })
        : x
    );
    state.odaContent = typeof v.odaContent === 'string' ? v.odaContent : '';
  },
  { immediate: true, deep: true }
);

function pushUp() {
  const payload = {
    dirHandle: state.dirHandle,
    dirName: state.dirName,
    files: state.files,
    odaContent: state.odaContent,
  };
  emit('update:modelValue', payload);
  emit('change', payload);
}

function onDragOver(e) { e.dataTransfer.dropEffect = 'copy'; }

async function onDrop(e) {
  try {
    const items = Array.from(e.dataTransfer.items || []);
    let dirHandle = null;
    for (const it of items) {
      if (it.getAsFileSystemHandle) {
        const h = await it.getAsFileSystemHandle();
        if (h?.kind === 'directory') { dirHandle = h; break; }
      }
    }
    if (!dirHandle) return;
    await loadFromHandle(dirHandle);
  } catch (err) {
    console.error(err);
  }
}

/** Botón: seleccionar carpeta con picker */
async function pickFolder() {
  try {
    if (!window.showDirectoryPicker) {
      alert('Tu navegador no soporta showDirectoryPicker(). Prueba Chrome/Edge recientes.');
      return;
    }
    const handle = await window.showDirectoryPicker();
    await loadFromHandle(handle);
  } catch (err) {
    if (err?.name !== 'AbortError') console.error(err);
  }
}

/** Lógica común para cargar desde un FileSystemDirectoryHandle */
async function loadFromHandle(dirHandle) {
  state.dirHandle = dirHandle;
  state.dirName = dirHandle.name || 'Carpeta';

  // 1) Lista todas las rutas planas
  const allPaths = await readAllPaths(dirHandle);

  // 2) Construye objetos { path, name, dataUrl, mimetype } y assetsMap (solo para files/*)
  const { fileObjs, assetsMap } = await buildFilesWithData(dirHandle, allPaths, 'files/');
  state.files = fileObjs;
  state.assetsMap = assetsMap;

  // 3) Lee/crea oda.json y resuelve "files/..." -> data:... en odaContent
  const { text, handle } = await readRootFileText(dirHandle, 'oda.json');
  state._odaHandle = handle;

  let odaObj = {};
  try { odaObj = JSON.parse(text || '{}'); } catch { odaObj = {}; }

  const replacer = (k, v) =>
    (typeof v === 'string' && v.startsWith('files/') && state.assetsMap[v])
      ? state.assetsMap[v]
      : v;

  state.odaContent = JSON.stringify(odaObj, replacer, 2);
  pushUp();
}

/* ===== Helpers ===== */

async function buildFilesWithData(rootHandle, allPaths, prefix = 'files/') {
  const assetsMap = {};  // files/* -> data:
  const fileObjs = [];

  for (const path of allPaths) {
    const name = path.split('/').pop();
    const fh = await getFileHandleFromPath(rootHandle, path);
    const file = await fh.getFile();

    if (path.startsWith(prefix)) {
      const dataUrl = await fileToDataURL(file);
      assetsMap[path] = dataUrl;
      fileObjs.push({
        path,
        name,
        dataUrl,
        mimetype: file.type || 'application/octet-stream',
      });
    } else {
      fileObjs.push({
        path,
        name,
        dataUrl: null,
        mimetype: file.type || 'application/octet-stream',
      });
    }
  }

  return { fileObjs, assetsMap };
}

async function fileToDataURL(file) {
  return await new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result);
    r.onerror = reject;
    r.readAsDataURL(file);
  });
}

async function getFileHandleFromPath(rootHandle, path) {
  const parts = path.split('/').filter(Boolean);
  let dir = rootHandle;
  for (let i = 0; i < parts.length - 1; i++) dir = await dir.getDirectoryHandle(parts[i]);
  return await dir.getFileHandle(parts.at(-1));
}

async function readAllPaths(root) {
  const out = [];
  async function walk(dir, prefix = '') {
    for await (const [name, handle] of dir.entries()) {
      const rel = prefix ? `${prefix}/${name}` : name;
      if (handle.kind === 'directory') await walk(handle, rel);
      else out.push(rel);
    }
  }
  await walk(root, '');
  out.sort((a, b) => a.localeCompare(b));
  return out;
}

async function readRootFileText(dirHandle, filename) {
  try {
    const fh = await dirHandle.getFileHandle(filename, { create: true }); // crea si no existe
    const f  = await fh.getFile();
    const t  = await f.text();
    return { text: t, handle: fh };
  } catch {
    return { text: '', handle: null };
  }
}

/* ===== Guardado con restauración a rutas locales ===== */

function deepReplace(node, transform) {
  if (typeof node === 'string') return transform(node);
  if (Array.isArray(node)) return node.map(n => deepReplace(n, transform));
  if (node && typeof node === 'object') {
    const out = {};
    for (const k in node) out[k] = deepReplace(node[k], transform);
    return out;
  }
  return node;
}

/** Restaura data: -> "files/..." usando el assetsMap actual */
function restoreOdaToLocal(jsonText) {
  let obj;
  try { obj = JSON.parse(jsonText || '{}'); } catch { return jsonText; }
  const reverse = new Map(Object.entries(state.assetsMap).map(([k, v]) => [v, k]));
  const restored = deepReplace(obj, (val) => (reverse.get(val) ?? val));
  return JSON.stringify(restored, null, 2);
}

/** Guarda siempre en local (con rutas "files/...") */
async function saveOda(newText) {
  // NO doble-serializar:
  let source;
  if (typeof newText === 'string') source = newText;
  else if (newText && typeof newText === 'object') source = JSON.stringify(newText, null, 2);
  else source = state.odaContent;

  const toSave = restoreOdaToLocal(source);

  if (!state._odaHandle && state.dirHandle) {
    state._odaHandle = await state.dirHandle.getFileHandle('oda.json', { create: true });
  }
  if (!state._odaHandle) throw new Error('No hay acceso a oda.json');

  const q = await state._odaHandle.queryPermission?.({ mode: 'readwrite' });
  if (q === 'denied') {
    const g = await state._odaHandle.requestPermission?.({ mode: 'readwrite' });
    if (g !== 'granted') throw new Error('Permiso de escritura denegado.');
  }

  const w = await state._odaHandle.createWritable();
  await w.write(toSave);
  await w.close();

  // Mantén estado: re-lista y re-resuelve para seguir trabajando con data:
  const allPaths = await readAllPaths(state.dirHandle);
  const rebuilt = await buildFilesWithData(state.dirHandle, allPaths, 'files/');
  state.files = rebuilt.fileObjs;
  state.assetsMap = rebuilt.assetsMap;

  let odaObj = {};
  try { odaObj = JSON.parse(toSave || '{}'); } catch { odaObj = {}; }
  const replacer = (k, v) =>
    (typeof v === 'string' && v.startsWith('files/') && state.assetsMap[v])
      ? state.assetsMap[v]
      : v;
  state.odaContent = JSON.stringify(odaObj, replacer, 2);

  pushUp();
}

/** Reset total */
function reset() {
  state.dirHandle = null;
  state.dirName = '';
  state.files = [];
  state.odaContent = '';
  state._odaHandle = null;
  state.assetsMap = {};
  pushUp();
}

defineExpose({ reset, saveOda });
</script>