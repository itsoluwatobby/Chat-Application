import axios from 'axios'

export const GLOBAL_URL = 'https://whatsapp-clone-api-vuwx.onrender.com'
export const LOCAL_URL = 'http://localhost:5000'

export const axiosAuth = axios.create({
  baseURL: `${GLOBAL_URL}/users`,
  headers: {'Content-Type':  'application/json'}
})

export const openaiAxios = axios.create({
  baseURL: `${GLOBAL_URL}/openai`,
  headers: { 'Content-Type': 'application/json' }
})