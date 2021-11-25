import Localbase from 'localbase'

const USER = 'ratatin-user'

const isBrowser = typeof window !== 'undefined'

export const getToken = async () => {
  if (isBrowser) {
    try {
      let db = new Localbase('ratatin')
      const user = await db.collection('user').doc(USER).get()

      return user?.token ?? null
    } catch (error) {
      return null
    }
  }

  return null
}

export const saveToken = async (token) => {
  if (isBrowser) {
    try {
      let db = new Localbase('ratatin')
      const user = await db.collection('user').add({ token }, USER)

      return user?.token ?? null
    } catch (error) {
      console.error('Error on saveToken: ', error)
      throw new Error(error)
    }
  }

  return null
}

export const removeToken = async () => {
  if (isBrowser) {
    try {
      let db = new Localbase('ratatin')
      const user = await db.collection('user').doc(USER).update({ token: null })

      return user?.token ?? null
    } catch (error) {
      console.error('Error on removeToken: ', error)
      throw new Error(error)
    }
  }

  return null
}
