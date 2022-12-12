import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { axiosAuth } from '../app/axiosAuth';

export const createConversation = createAsyncThunk('messages/createConversation', async(initialState) => {
  try{
      const conversation = await axiosAuth.post(`/conversation/create`, initialState)
      return conversation.data
    }catch(error) {
      return error.message
    }
})

export const deleteConversation = createAsyncThunk('messages/deleteConversation', async(id) => {
  try{
      const removeConversation = await axiosAuth.delete(`/conversation/delete/${id}`)
      return removeConversation.data
    }catch(error) {
      return error.message
    }
})

export const getMessages = createAsyncThunk('messages/getMessages', async(conversationId) => {
  try{
    const messages = await axiosAuth.get(`/messages/${conversationId}`)
    return [...messages.data]
  }catch(error) {
    return error.message
  }
})

export const getConversation = createAsyncThunk('messages/getConversation', async(conversationId) => {
  try{
    const conversation = await axiosAuth.get(`/conversation/${conversationId}`)
    return [...conversation?.data]
  }catch(error) {
    return error.message
  }
})

const messageSlice = createSlice({
  name: 'messages',
  initialState: {loading: null, messages: [], conversation: [], newConversation: [], error: null},
  reducers:{},
  extraReducers: builder => {
    builder
      .addCase(createConversation.pending, state => {
        state.loading = true
      })
      .addCase(createConversation.fulfilled, (state, action) => {
        state.loading = false
        state.newConversation = action.payload
      })
      .addCase(createConversation.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(getConversation.pending, state => {
        state.loading = true
      })
      .addCase(getConversation.fulfilled, (state, action) => {
        state.loading = false
        state.conversation = action.payload
      })
      .addCase(getConversation.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(getMessages.fulfilled, (state, action) => {
        state.loading = false
        state.messages = action.payload
      })
  }
})

export const selectConversation = state => state.messages.conversation
export const newConversation = state => state.messages.newConversation
export const getAllMessages = state => state.messages.messages
export const messageLoading = state => state.messages.loading
export const messageError = state => state.messages.error

export const get = ''

export default messageSlice.reducer
