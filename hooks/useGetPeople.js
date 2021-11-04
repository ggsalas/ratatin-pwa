import { useEffect, useState } from 'react'
import { getToken } from '../shared/handleToken'
import Localbase from 'localbase'

import axios from 'axios'
import { mock } from './mockPeople'

export const useGetPeople = () => {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const token = getToken()

  useEffect(() => {
    const fn = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`/api/people?token=${token}`)

        let db = new Localbase('ratatin')

        response.data.data.results.forEach((item) => {
          db.collection('people').add(item, item.user._id)
        })

        setData(response.data.data)
      } catch (error) {
        console.error(error)
        setError(error)
      } finally {
        setLoading(false)
      }
    }

    fn()
  }, [token])

  return { data, error, loading }
}
