import { useEffect, useState } from 'react'
import { getToken } from '../shared/handleToken'

import axios from 'axios'

export const useGetLikes = () => {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const token = getToken()

  useEffect(() => {
    const fn = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setLoading(true)
        const response = await axios.get(`/api/likes?token=${token}`)
        setData(response.data.data)
      } catch (error) {
        console.error(error)
        setError(error)
      } finally {
        setLoading(false)
      }
    }

    fn()
  }, [])

  return { data, error, loading }
}
