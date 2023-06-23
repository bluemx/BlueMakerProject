<script setup lang="ts">
defineOptions({
  name: 'DashboardPage',
})
const user = useUserStore()
const router = useRouter()
</script>

<template>
  <div>
    <div>
      <img src="favicon.svg" alt="BlueMaker" mx-auto w-6>
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
    <button aspect-square w-full bg-slate-1>
      MAILING
    </button>
    <button aspect-square w-full bg-slate-1>
      SITIO
    </button>
    <button aspect-square w-full bg-slate-1 />
  </div>
  <div mt-36>
    <UserAdmin v-if="user?.profile?.role == 'admin'" />
    <UserLogout />
  </div>
</template>

<route lang="yaml">
meta:
  layout: default
  requiresAuth: true
</route>
