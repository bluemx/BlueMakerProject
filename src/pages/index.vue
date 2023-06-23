<script setup lang="ts">
defineOptions({
  name: 'IndexPage',
})
const user = useUserStore()
const name = ref(user.savedName)

const router = useRouter()
function go() {
  if (name.value)
    router.push(`/hi/${encodeURIComponent(name.value)}`)
}

const { t } = useI18n()
</script>

<template>
  <div>
    <div text-4xl>
      <img src="favicon.svg" alt="BlueMaker" mx-auto w-12>
    </div>
    <p font-bold>
      BlueMaker
    </p>

    <UserAuth />
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
  requiresAuth: false
</route>
