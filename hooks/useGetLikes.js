import Localbase from 'localbase'
import { useEffect, useState } from 'react'
import { getToken } from '../shared/handleToken'
import { getLikesWithPeopleInfo } from '../shared/matchLikesAndPeople'
import { updateMatches } from '../shared/updateMatches'

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

        let db = new Localbase('ratatin')

        response.data.data.results.forEach((item) => {
          db.collection('likes').add(item, item.user._id)
        })

        const allLikes = await db.collection('likes').get()
        const people = await db.collection('people').get()
        await updateMatches()

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
  }, [token])

  return { data, error, loading }
}
