<script setup>
import { supabase } from '../modules/supabase'

const user = useUserStore()
const router = useRouter()
async function logout() {
  try {
    const { error } = await supabase.auth.signOut()
    if (error)
      throw error
  }
  catch (error) {
    alert(error.message)
  }
  finally {
    user.logout()
    router.push('/')
  }
}
</script>

<template>
  <button class="bg-slate-400 p-2" @click="logout">
    Logout
  </button>
</template>
