import axios from 'axios'

axios.defaults.baseURL = import.meta.env.VITE_API_URL || 'http://localhost'

axios.defaults.withCredentials = true

export async function login(email: string, password: string) {
  try {
     
    await axios.get('/sanctum/csrf-cookie')

    
    const response = await axios.post('/api/login', {
      email,
      password,
    })
    const token = response.data.token
    localStorage.setItem('token', token)
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    return response.data
  } catch (error) {
    console.error('Erro ao fazer login:', error)
    throw error
    
  }
  
}

export async function getUser() {
  console.log(axios.defaults.baseURL)
  const token = localStorage.getItem('token')
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }

  const response = await axios.get('/api/users/1')
  return response.data
}


export async function logout() {
  await axios.post('/api/logout')
  localStorage.removeItem('token')
  delete axios.defaults.headers.common['Authorization']
}

