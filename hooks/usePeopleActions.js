import Localbase from 'localbase'
import { getToken } from '../shared/handleToken'
import { useState } from 'react'
import axios from 'axios'
import { RATATIN_STATUS } from '../shared/ratatinStatus'

export const usePeopleActions = () => {
  const [status, setStatus] = useState(null)
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
      const db = new Localbase('ratatin')
      const getStatus = () => {
        if (response.data?.match?._id) return RATATIN_STATUS.match
        if (action === 'like') return RATATIN_STATUS.sendedLike
        if (action === 'pass') return RATATIN_STATUS.sendedPass
        return RATATIN_STATUS.undefined
      }
      const ratatinStatus = getStatus()

      await db.collection('people').doc(id).update({ ratatinStatus })

      setStatus(ratatinStatus)
    } catch (error) {
      console.error(error)
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  const onLike = (id) => setPeopleAction({ action: 'like', id })
  const onPass = (id) => setPeopleAction({ action: 'pass', id })

  return { loading, error, status, onLike, onPass }
}
