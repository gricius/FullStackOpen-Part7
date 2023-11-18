// ../services/login.js
import axios from 'axios'
const baseUrl = '/api/login'

const login = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

// logout
const logout = async () => {
  const response = await axios.post('/api/logout')
  return response.data
}

export default { login, logout }