import axios from 'axios'
import { ref } from 'vue'

const users = ref([])

export function useUsers() {
  const fetchUsers = async () => {
  
    const { data } = await axios.get('/api/users')
      
    return data;
  }

  const createUser = async (user: any) => {
   
    const userData = {
      name: user.name,
      email: user.email,
      password: user.password,
      password_confirmation: user.checkPassword,
      roles: user.roles
    }
   
    await axios.post('/api/users', userData)
  }

  const updateUser = async (id: number, user: any) => {
    
    await axios.put(`/api/users/${id}`, user)
    
  }

  const removeUser = async (id: number) => {
    await axios.delete(`/api/users/${id}`)
  }

  return {
    users,
    fetchUsers,
    createUser,
    updateUser,
    removeUser
  }
}
