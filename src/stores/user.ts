import { defineStore } from 'pinia'
import { supabase } from '../modules/supabase'

export const useUserStore = defineStore('user', () => {
  const auth = ref(null)
  const profile = ref(null)
  const setUser = async (supabaseAuth) => {
    if (supabaseAuth) {
      auth.value = supabaseAuth
      const { data, error, status } = await supabase
        .from('profiles')
        .select('username, role, avatar_url')
        .eq('id', supabaseAuth.user.id)
        .single()
      if (error && status !== 406)
        throw error

      if (data)
        profile.value = data
    }
  }
  function logout() {
    auth.value = null
  }
  return { auth, profile, setUser, logout }
})
/*
if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore as any, import.meta.hot))
*/
