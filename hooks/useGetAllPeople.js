import Localbase from 'localbase'
import { useEffect, useState } from 'react'
import { getPeopleWithLikes } from '../shared/matchLikesAndPeople'
import { updateMatches } from '../shared/updateMatches'

export const useGetAllPeople = () => {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fn = async () => {
      try {
        setLoading(true)
        const db = new Localbase('ratatin')
        await updateMatches()
        const people = await db
          .collection('people')
          .orderBy('ratatinUpdatedAt', 'desc')
          .get()
        const likes = await db
          .collection('likes')
          .orderBy('ratatinUpdatedAt', 'desc')
          .get()

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
  }, [])

  return { data, error, loading }
}
