import Localbase from 'localbase'
import { useEffect, useState } from 'react'
import { getToken } from '../shared/handleToken'
import { getPeopleWithLikes } from '../shared/matchLikesAndPeople'
import { RATATIN_STATUS } from '../shared/ratatinStatus'
import axios from 'axios'

export const updateMatches = async ({ token, people, db }) => {
  const matchesResponse = await axios.get(`/api/matches?token=${token}`)
  const matches = matchesResponse.data.data.matches

  const peopleWithMatch = people.filter((person) => {
    return matches.find((match) => person.user._id === match.person._id)
  })

  // Update people
  peopleWithMatch.forEach(async (person) => {
    await db.collection('people').doc(person.user._id).update({
      ratatinStatus: RATATIN_STATUS.match,
    })
  })
}

export const useGetAllPeople = () => {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const token = getToken()

  useEffect(() => {
    const fn = async () => {
      try {
        setLoading(true)
        const db = new Localbase('ratatin')
        const people = await db.collection('people').get()
        const likes = await db.collection('likes').get()
        await updateMatches({ token, people, db })

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
