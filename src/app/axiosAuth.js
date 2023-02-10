import axios from 'axios'

export const axiosAuth = axios.create({
  baseURL: 'https://whatsapp_clone_api.onrender.com/users',
  headers: {'Content-Type':  'application/json'}
})

export const openaiAxios = axios.create({
  baseURL: 'https://whatsapp_clone_api.onrender.com/openai',
  headers: { 'Content-Type': 'application/json' }
})