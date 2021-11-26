import Localbase from 'localbase'
import { useEffect, useState } from 'react'
import { getLikesWithPeopleInfo } from '../shared/matchLikesAndPeople'
import { updateMatches } from '../shared/updateMatches'
import { getToken } from '../shared/handleToken'

import axios from 'axios'

export const useGetLikes = () => {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fn = async () => {
      try {
        setLoading(true)
        const token = await getToken()
        const response = await axios.get(`/api/likes?token=${token}`)

        let db = new Localbase('ratatin')

        response.data.data.results?.forEach((like) => {
          db.collection('likes').add(
            { ...like, ratatinUpdatedAt: Date.now() },
            like.user._id
          )
        })

        await updateMatches()
        const allLikes = await db
          .collection('likes')
          .orderBy('ratatinUpdatedAt', 'desc')
          .get()
        const people = await db
          .collection('people')
          .orderBy('ratatinUpdatedAt', 'desc')
          .get()

        const allLikesWithPeopleInfo = getLikesWithPeopleInfo({
          people,
          likes: allLikes,
        })

        setData({ results: allLikesWithPeopleInfo })
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
