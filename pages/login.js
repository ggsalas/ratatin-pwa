import { useEffect, useRef } from 'react'

import { useRouter } from 'next/router'

import { Layout } from '../components/Layout'
import { getToken, saveToken } from '../shared/handleToken'

import s from '../styles/Login.module.css'

const Login = () => {
  const router = useRouter()
  const formRef = useRef()
  const bookmarklet = useRef()

  useEffect(() => {
    const token = getToken()

    if (token) router.push('/')
  }, [router])

  const onSubmit = (e) => {
    e.preventDefault()
    const token = formRef.current.token.value

    saveToken(token)
    router.push('/')
  }

  async function copyTextToClipboard(text) {
    if ('clipboard' in navigator) {
      return await navigator.clipboard.writeText(text)
    } else {
      return document.execCommand('copy', true, text)
    }
  }

  const onCopyBookmarklet = () => {
    const text = bookmarklet.current.innerText
    copyTextToClipboard(text)
  }

  return (
    <Layout>
      <div className={s.main}>
        <form onSubmit={onSubmit} className={s.form} ref={formRef}>
          <p>Steps to get the Tinder Token:</p>
          <ol>
            <li>
              Copy this code and create a bookmarklet {` `}
              <button onClick={onCopyBookmarklet} type="button">
                Copy code
              </button>
              <pre className={s.bookmarklet} ref={bookmarklet}>
                {`javascript:window.prompt('Copy to clipboard: Ctrl+C, Enter', localStorage.getItem('TinderWeb/APIToken'))`}
              </pre>
            </li>
            <li>
              Login into{' '}
              <a
                href="http://tinder.com"
                rel="noopener noreferrer"
                target="_blank"
              >
                tinder.com
              </a>
              <li>In tinder.com page and go to the saved bookmarklet</li>
              <li>Copy the token in the prompt</li>
              <li>Paste the token here:</li>
            </li>
          </ol>
          <input type="text" name="token" placeholder="Tinder Token" required />
          <button type="submit">Login</button>
        </form>
      </div>
    </Layout>
  )
}

export default Login
