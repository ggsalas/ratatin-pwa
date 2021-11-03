import { useEffect, useRef } from 'react'

import { useRouter } from 'next/router'

import { Layout } from '../components/Layout'
import { getToken, saveToken } from '../shared/handleToken'

import s from '../styles/Login.module.css'

const Login = () => {
  const router = useRouter()
  const formRef = useRef()

  useEffect(() => {
    const token = getToken()
    if (token) router.push('/')
  }, [])

  const onSubmit = (e) => {
    e.preventDefault()
    const token = formRef.current.token.value

    saveToken(token)
    router.push('/')
  }

  return (
    <Layout>
      <div className={s.main}>
        <form onSubmit={onSubmit} className={s.form} ref={formRef}>
          <input type="text" name="token" required />
          <button type="submit">Login</button>
        </form>
      </div>
    </Layout>
  )
}

export default Login
