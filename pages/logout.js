import { useEffect } from 'react'
import { useRouter } from 'next/router'

import { removeToken } from '../shared/handleToken'

const Logout = () => {
  const router = useRouter()

  useEffect(() => {
    const fn = async () => {
      await removeToken()
      router.push('/login')
    }

    fn()
  }, [router])

  return null
}

export default Logout
