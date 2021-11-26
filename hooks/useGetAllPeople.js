import Localbase from 'localbase'
import { useEffect, useState } from 'react'
import { getPeopleWithLikes } from '../shared/matchLikesAndPeople'
import { updateMatches } from '../shared/updateMatches'
import { getToken } from '../shared/handleToken'
import { RATATIN_STATUS } from '../shared/ratatinStatus'
import axios from 'axios'

const getNewPeople = async () => {
  const token = await getToken()
  const response = await axios.get(`/api/people?token=${token}`)

  let db = new Localbase('ratatin')

  await response.data.data.results?.forEach((person) => {
    db.collection('people').add(
      {
        ...person,
        ratatinUpdatedAt: Date.now(),
        ratatinStatus: RATATIN_STATUS.undefined,
      },
      person.user._id
    )
  })

  return response
}

const getLikes = async () => {
  const token = await getToken()
  const response = await axios.get(`/api/likes?token=${token}`)

  let db = new Localbase('ratatin')

  await response.data.data.results?.forEach((like) => {
    db.collection('likes').add(
      { ...like, ratatinUpdatedAt: Date.now() },
      like.user._id
    )
  })

  return response
}

export const useGetAllPeople = () => {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fn = async () => {
      try {
        setLoading(true)
        await getNewPeople()
        await getLikes()

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
