import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import { axiosAuth } from '../app/axiosAuth'

export const registerUser = createAsyncThunk('auth/registerUser', async(initialState) => {
  try{
    const register = await axiosAuth.post('/register', initialState)
    return register.data
  }catch(error) {
    return error.message
  }
})

export const loginUser = createAsyncThunk('auth/loginUser', async(initialState) => {
  try{
    const res = await axiosAuth.post('/login', initialState)
    return res.data
  }catch(error) {
    return error.message
  }
})

export const logoutUser = createAsyncThunk('auth/logoutUser', async(id) => {
  try{
    const res = await axiosAuth.get(`/logout/${id}`)
    return res.data
  }catch(error) {
    return error.message
  }
})

export const updateUser = createAsyncThunk('auth/updateUser', async(id, initialState) => {
  try{
    const updateUser = await axiosAuth.put(`/update/${id}`, initialState)
    return updateUser.data
  }catch(error) {
    return error.message
  }
})

export const getAllUsers = createAsyncThunk('auth/getAllUsers', async() => {
  try{
    const users = await axiosAuth.get('/')
    console.log('users', users.data)
    return [...users.data]
  }catch(error) {
    return error.message
  }
})

const authSlice = createSlice({
  name: 'auth',
  initialState: {loading: null, user: {}, users: [], error: null, status: false},
  reducers:{
    register: (state, action) => {
      state.status = action.payload
    },
    login: (state, action) => {
      state.user = action.payload
    },
    getUsers: (state, action) => {
      state.user.push(...action.payload)
    },
    logout: (state) => {
      state.user = {}
      state.users = []
      state.conversation = []
    }
  },
  extraReducers: builder => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = action.payload
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload
      })
      .addCase(loginUser.pending, state => {
        state.loading = 'loading'
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = 'succeeded'
        state.user = action.payload
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = 'failed'
        state.error = action.payload
      })
      .addCase(logoutUser.fulfilled, state => {
        state.user = null
        state.users = []
      })
      .addCase(getAllUsers.pending, state => {
        state.loading = 'loading'
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = 'succeeded'
        state.users = action.payload
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = 'failed'
        state.error = action.payload
      })
      
  }
})

export const {login, register, logout} = authSlice.actions
export const getCurrentUser = state => state.auth.user
export const selectAllUsers = state => {
  state.auth.users.filter(user => user._id !== state.auth.user._id)
}
export const userLoading = state => state.auth.loading
export const userError = state => state.auth.error

export const getSingleUser = (state, userId) => {
  return state?.auth?.users.find(user => user?._id === userId)
}

export default authSlice.reducer
