import { getToken } from '../shared/handleToken'
import { useState } from 'react'
import axios from 'axios'

export const usePeopleActions = () => {
  const [isMatch, setIsMatch] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const token = getToken()

  const setPeopleAction = async ({ action, id }) => {
    try {
      setLoading(true)
      const response = await axios.get('/api/people-action', {
        params: {
          token,
          action,
          id,
        },
      })

      setIsMatch(response.match)
    } catch (error) {
      console.error(error)
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  const onLike = (id) => setPeopleAction({ action: 'like', id })
  const onPass = (id) => setPeopleAction({ action: 'pass', id })

  return { loading, error, isMatch, onLike, onPass }
}
