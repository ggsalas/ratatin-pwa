import Localbase from 'localbase'
import { useEffect, useState } from 'react'
import { getToken } from '../shared/handleToken'
import { getPeopleWithLikes } from '../shared/matchLikesAndPeople'
import { RATATIN_STATUS } from '../shared/ratatinStatus'
import axios from 'axios'

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
          db.collection('people').add(
            { ...item, ratatinStatus: RATATIN_STATUS.undefined },
            item.user._id
          )
        })

        const likes = await db.collection('likes').get()
        const peopleWithLikes = getPeopleWithLikes({
          people: response.data.data.results,
          likes,
        })

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
