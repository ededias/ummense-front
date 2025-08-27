<template>
    <div>hello world</div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { getUser } from '../services/me.ts'

const email = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()

onMounted(() => {
    handleme()
})

async function handleme() {
  error.value = ''
  try {
    const data = await getUser()
    
    router.push('/')
  } catch (err: any) {
    error.value = err?.response?.data?.message || 'Falha ao autenticar.'
  }
}
</script>