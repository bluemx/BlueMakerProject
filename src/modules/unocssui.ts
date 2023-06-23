
import { type UserModule } from '~/types'
import '@unocss/reset/tailwind.css'
import 'unocss-ui/style.css'
import unocssui from 'unocss-ui'
// Setup Pinia
// https://pinia.vuejs.org/
export const install: UserModule = ({ isClient, initialState, app }) => {

  app.use(unocssui)

}
