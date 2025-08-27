import axios from 'axios'
import { ref } from 'vue'

const roles = ref([])

export function useRoles() {
  const fetchRoles = async () => {
    const { data } = await axios.get('/api/roles')
    
    return data;
  }

  const createRole = async (user: any) => {
    await axios.post('/api/roles', user)
  }

  const updateRole = async (id: number, user: any) => {
    await axios.put(`/api/roles/${id}`, user)
  }

  const removeRole = async (id: number) => {
    await axios.delete(`/api/roles/${id}`)
  }

  return {
    roles,
    fetchRoles,
    createRole,
    updateRole,
    removeRole
  }
}
