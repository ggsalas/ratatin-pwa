import { useEffect } from 'react'
import Head from 'next/head'
import { getToken } from '../shared/handleToken'
import { useRouter } from 'next/router'
import { Layout } from '../components/Layout'

import styles from '../styles/Home.module.css'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    const token = getToken()
    if (token) return router.push('/likes')
  }, [])

  return (
    <Layout>
      <div className={styles.container}>
        <Head>
          <title>RataTin</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        If you are a 🐀 mice like me, you are covered!!!
        <button onClick={() => router.push('/login')}>Login</button>
      </div>
    </Layout>
  )
}
