import { useEffect, useState } from 'react'
import { getToken, saveToken, removeToken } from '../shared/handleToken'

export const useGetToken = () => {
  const [token, setToken] = useState()

  useEffect(() => {
    const fn = async () => {
      const token = await getToken()

      setToken(token)
    }

    fn()
  }, [])

  return token
}
