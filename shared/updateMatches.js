import Localbase from 'localbase'
import { RATATIN_STATUS } from '../shared/ratatinStatus'
import { getToken } from '../shared/handleToken'
import axios from 'axios'

export const updateMatches = async () => {
  const db = new Localbase('ratatin')

  try {
    const people = await db.collection('people').get()
    const token = await getToken()

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
  } catch (error) {
    console.error('Error on updateMatches: ', error)
    throw new Error(error)
  }
}
