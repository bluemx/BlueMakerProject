import { supabase } from './supabase'
import { type UserModule } from '~/types'

async function authFn() {
  supabase.auth.getSession().then(({ data }) => {
    const user = useUserStore()
    user.setUser(data.session)
    return data.session
  })
}

export const install: UserModule = ({ isClient, router }) => {
  if (isClient) {
    router.beforeEach(async (to, from, next) => {
      const requiredAuth = to.meta.requiresAuth
      const session = ref()
      const user = useUserStore()

      session.value = await authFn()

      if (requiredAuth) {
        if (user)
          next()
        else
          next('/')
      }
      else {
        next()
      }
      /*
      else {
        if (to.path === '/' && user)
          next('/dashboard')
        else
          next()
      }
      */
    }) // router.beforeEach
  }
}
