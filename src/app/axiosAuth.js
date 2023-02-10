import axios from 'axios'

export const axiosAuth = axios.create({
  baseURL: 'https://whatsapp-clone-api-vuwx.onrender.com/users',
  headers: {'Content-Type':  'application/json'}
})

export const openaiAxios = axios.create({
  baseURL: 'https://whatsapp-clone-api-vuwx.onrender.com/openai',
  headers: { 'Content-Type': 'application/json' }
})