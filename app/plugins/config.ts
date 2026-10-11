export default defineNuxtPlugin(async () => {
  const config = useState<{ ok: boolean } | null>('config', () => null)
  if (!config.value) {
    config.value = await $fetch<{ ok: boolean }>('/api/config')
  }
})
