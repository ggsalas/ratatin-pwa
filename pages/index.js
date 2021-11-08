import { useEffect } from 'react'
import { getToken } from '../shared/handleToken'
import { useRouter } from 'next/router'
import { Layout } from '../components/Layout'

import styles from '../styles/Home.module.css'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    const token = getToken()
    if (token) return router.push('/new')
  }, [router])

  return (
    <Layout>
      <div className={styles.container}>
        <h2>Tinder clone that displays hidden data.</h2>
        <p>For 🐀 pepple</p>
        <p>😆</p>
        <button onClick={() => router.push('/login')}>Login</button>
        <p>
          <a
            href="https://github.com/ggsalas/ratatinApp"
            rel="noopener noreferrer"
            target="_blank"
          >
            Read the code on Github
          </a>
        </p>
      </div>
    </Layout>
  )
}
