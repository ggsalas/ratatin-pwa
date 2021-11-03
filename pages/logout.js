import { useEffect } from 'react'
import { useRouter } from 'next/router'

import { removeToken } from '../shared/handleToken'

const Logout = () => {
  const router = useRouter()

  useEffect(() => {
    removeToken()
    router.push('/login')
  }, [router])

  return null
}

export default Logout
