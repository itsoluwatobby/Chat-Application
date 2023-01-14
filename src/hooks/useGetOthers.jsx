import { useEffect, useState } from 'react'
import { axiosAuth } from '../app/axiosAuth'
import { useChatContext } from './useChatContext'

export const useGetOthers = (loggedInUser) => {
  const {refresh} = useChatContext()
  const [users, setUsers] = useState([])
  const [errors, setErrors] = useState('')
  
  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()

    const getAllUsers = async() => {
      try{
        const res = await axiosAuth.get('/', {
          signal: controller.signal
        })
        isMounted && setUsers(res?.data)
        refresh()
      }catch(error) {
        let errorMessage;
        !error.response ? errorMessage = 'no server response' : 
        error.response.status === 400 ? errorMessage = 'no users available' :
        error.response.status === 500 ? errorMessage = 'internal error' : ''
        setErrors(errorMessage)
      }
    }
    getAllUsers()

    return () => {
      controller.abort()
      isMounted = false
    }
  }, [])

  const otherUsers = users.filter(user => user._id !== loggedInUser)
  const editedUsers = otherUsers && otherUsers.map(user => ({ ...user, done: false}))
  const result = editedUsers.length ? editedUsers : errors
  return [result, users]
}
