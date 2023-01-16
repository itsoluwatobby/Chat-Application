import axios from 'axios'

export const axiosAuth = axios.create({
  baseURL: 'http://localhost:5000/users',
  headers: {'Content-Type':  'application/json'}
})

export const openaiAxios = axios.create({
  baseURL: 'http://localhost:5000/openai',
  headers: { 'Content-Type': 'application/json' }
})