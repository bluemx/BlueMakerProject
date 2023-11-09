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
      // const requiredAuth = to.meta.requiresAuth
      // const session = ref()
      // const user = useUserStore()

      await authFn()
      next()
      /*
      if (requiredAuth) {
        if (user.auth)
          next()
        else
          next('/')
      }
      else {
        next()
      }
      */
    }) // router.beforeEach
  }
}
