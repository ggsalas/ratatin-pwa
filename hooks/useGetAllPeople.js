import Localbase from 'localbase'
import { useEffect, useState } from 'react'
import { getToken } from '../shared/handleToken'
import { getPeopleWithLikes } from '../shared/matchLikesAndPeople'

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
        const people = await db.collection('people').get()
        const likes = await db.collection('likes').get()
        const peopleWithLikes = getPeopleWithLikes({ people, likes })

        setData({ results: peopleWithLikes })
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
