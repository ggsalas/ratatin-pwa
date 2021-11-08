import Localbase from 'localbase'
import { useEffect, useState } from 'react'

export default function MigrateDb() {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fn = async () => {
      try {
        setLoading(true)
        let db = new Localbase('ratatin')

        const allLikes = await db.collection('likes').get()
        const people = await db.collection('people').get()

        allLikes.forEach(async (like) => {
          await db
            .collection('likes')
            .doc(like.user._id)
            .update({ ratatinUpdatedAt: Date.now() })
        })

        people.forEach(async (person) => {
          await db
            .collection('people')
            .doc(person.user._id)
            .update({ ratatinUpdatedAt: Date.now() })
        })

        setData({ res: 'ok' })
      } catch (error) {
        console.error(error)
        setError(error)
      } finally {
        setLoading(false)
      }
    }

    fn()
  }, [])

  return (
    <div>
      {loading && <div>Loading...</div>}
      {data && <div>{JSON.stringify(data, null, 4)}</div>}
      {error && <div>{JSON.stringify(error, null, 4)}</div>}
    </div>
  )
}
