import axios from 'axios'

export const axiosAuth = axios.create({
  baseURL: 'http://localhost:5000/users',
  headers: {'Content-Type':  'application/json'}
})