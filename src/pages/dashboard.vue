<script setup lang="ts">
import favicon from '../favicon.svg'

defineOptions({
  name: 'DashboardPage',
})
const user = useUserStore()
const router = useRouter()
</script>

<template>
  <div>
    <div>
      <img :src="favicon" alt="BlueMaker" mx-auto w-6>
    </div>
    <div my-5>
      {{ user?.profile?.username }}
    </div>
  </div>
  <div grid grid-cols-4 mx-auto max-w-2xl gap-2>
    <router-link to="/riodas">
      <button aspect-square w-full bg-rose>
        RIODAS
      </button>
    </router-link>
    <button aspect-square w-full bg-slate-1 dark:text-neutral>
      MAILING
    </button>
    <button aspect-square w-full bg-slate-1 dark:text-neutral>
      SITIO
    </button>
    <button aspect-square w-full bg-slate-1 dark:text-neutral />
  </div>
  <div mt-36>
    <UserAdmin v-if="user?.profile?.role === 'admin'" />
    <UserLogout />
  </div>
</template>

<route lang="yaml">
meta:
  layout: default
  requiresAuth: true
</route>
