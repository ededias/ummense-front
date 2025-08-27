<template>
  <div class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
    <div class="bg-white p-6 rounded shadow-lg w-full max-w-md">
      <h2 class="text-xl font-semibold mb-4">
        {{ user?.id ? 'Editar Usuário' : 'Novo Usuário' }}
      </h2>

      <form @submit.prevent="save">
        <input v-model="form.name" type="text" placeholder="Nome" class="w-full mb-3 p-2 border rounded" />
        <input v-model="form.email" type="email" placeholder="Email" class="w-full mb-3 p-2 border rounded" />
        <input v-model="form.password" type="password" placeholder="Senha" class="w-full mb-3 p-2 border rounded" />

        <div class="flex justify-end space-x-2">
          <button @click="$emit('close')" type="button" class="px-4 py-2 border rounded">Cancelar</button>
          <button type="submit" class="px-4 py-2 bg-green-600 text-white rounded">Salvar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useUsers } from '../../composables/useUsers'

const props = defineProps<{ user?: any }>()
const emit = defineEmits(['close', 'saved'])

const form = ref({
  name: '',
  email: '',
  password: ''
})

watch(
  () => props.user,
  (newUser) => {
    if (newUser) {
      form.value.name = newUser.name
      form.value.email = newUser.email
      form.value.password = ''
    } else {
      form.value = { name: '', email: '', password: '' }
    }
  },
  { immediate: true }
)

const { createUser, updateUser } = useUsers()

const save = async () => {
  if (props.user?.id) {
    await updateUser(props.user.id, form.value)
  } else {
    await createUser(form.value)
  }

  emit('saved')
  emit('close')
}
</script>
