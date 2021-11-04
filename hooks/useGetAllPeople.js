import { useEffect, useState } from 'react'
import { getToken } from '../shared/handleToken'
import Localbase from 'localbase'

export const useGetAllPeople = () => {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const token = getToken()

  useEffect(() => {
    const fn = async () => {
      try {
        setLoading(true)
        let db = new Localbase('ratatin')

        const response = await db.collection('people').get()
        setData({ results: response })
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
