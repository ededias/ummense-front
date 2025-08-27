import axios from 'axios'
axios.defaults.baseURL = 'http://localhost' // ajuste conforme sua porta
axios.defaults.withCredentials = true
export async function getUser() {
  try {
    await axios.get('/api/user/1', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
      }
    })
   
  } catch (err) {
    console.error('Erro ao obter usuário:', err)
    console.error('Usuário não autenticado')
  }
}
