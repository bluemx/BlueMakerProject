<script setup>
import { supabase } from '~/modules/supabase'

const loading = ref(false)
const email = ref('')
const sent = ref('')
const router = useRouter()
const route = useRoute()

async function handleAuthorization() {
  try {
    loading.value = true
    const { data, error } = await supabase
      .from('authorized')
      .select('email')
      .eq('email', email.value)
      .single()
    return data
  }
  catch (error) {
    if (error instanceof Error)
      return false
  }
  finally {
    loading.value = false
  }
}
async function handleLogin() {
  console.log(window.location.origin)
  try {
    const isAuthorized = await handleAuthorization()
    loading.value = true
    if (isAuthorized) {
      const { error } = await supabase.auth.signInWithOtp({
        email: email.value,
        options: {
          emailRedirectTo: window.location.origin
        }
      })
      if (error)
        throw error
      sent.value = 'Acceso enviado a correo electrónico'
    }
    else {
      alert('No autorizado')
    }
  }
  catch (error) {
    if (error instanceof Error)
      alert(error.message)
  }
  finally {
    loading.value = false
  }
}

supabase.auth.onAuthStateChange((_, _session) => {
  if (_session && route.path == '/')
    router.push('/dashboard')
})
</script>

<template>
  <form mx-auto my-10 max-w-xs rounded bg-slate-9 p-5 shadow-xl @submit.prevent="handleLogin">
    <input v-model="email" class="inputField dark:text-neutral" required rounded p-2 text-center type="email" placeholder="Tu correo">
    <input mt-5 cursor-pointer rounded bg-slate-5 p-2 text-xs font-bold text-slate-1 hover:bg-blue-3 type="submit" :value="loading ? 'Procesando' : 'Enviar acceso por correo'" :disabled="loading">
    <div v-if="sent" pt-2 text-xs text-white>
      {{ sent }}
    </div>
  </form>
</template>
