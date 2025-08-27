<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded shadow-md w-full max-w-sm">
      <h2 class="text-2xl font-bold mb-6 text-center">Login</h2>

      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <label class="block mb-1 text-gray-700">Email</label>
          <input
            type="email"
            v-model="email"
            required
            class="w-full px-3 py-2 border rounded"
          />
        </div>

        <div class="mb-6">
          <label class="block mb-1 text-gray-700">Senha</label>
          <input
            type="password"
            v-model="password"
            required
            class="w-full px-3 py-2 border rounded"
          />
        </div>

        <button
          type="submit"
          class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Entrar
        </button>

        <p v-if="error" class="text-red-600 mt-4 text-sm text-center">
          {{ error }}
        </p>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '../services/auth.ts'

const email = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()

async function handleLogin() {
  error.value = ''
  try {
    await login(email.value, password.value)
    router.push('/')
  } catch (err: any) {
    error.value = err?.response?.data?.message || 'Falha ao autenticar.'
  }
}
</script>
