import { useEffect, useRef, useState } from 'react'

import { useRouter } from 'next/router'

import { Layout } from '../components/Layout'
import { saveToken } from '../shared/handleToken'
import { useGetToken } from '../hooks/useToken'

import s from '../styles/Login.module.css'

const Login = () => {
  const router = useRouter()
  const formRef = useRef()
  const bookmarklet = useRef()
  const [copyCode, setCopyCode] = useState(false)
  const token = useGetToken()

  useEffect(() => {
    if (token) router.push('/')
  }, [router, token])

  const onSubmit = async (e) => {
    e.preventDefault()
    const token = formRef.current.token.value

    await saveToken(token)
    router.push('/')
  }

  async function copyTextToClipboard(text) {
    if ('clipboard' in navigator) {
      return await navigator.clipboard.writeText(text)
    } else {
      return document.execCommand('copy', true, text)
    }
  }

  const onCopyBookmarklet = async () => {
    const text = bookmarklet.current.innerText
    await copyTextToClipboard(text)
    setCopyCode(true)
    setTimeout(() => setCopyCode(false), 800)
  }

  return (
    <Layout>
      <div className={s.main}>
        <form onSubmit={onSubmit} className={s.form} ref={formRef}>
          <p>Steps to get the Tinder Token:</p>
          <ol>
            <li>
              {`Copy this code and add as a "favorite" in your browser `}
              <div className={s.copyCode}>
                <button onClick={onCopyBookmarklet} type="button">
                  Copy code
                </button>
                {copyCode && (
                  <span className={s.copyCode_notification}>Copied!</span>
                )}
              </div>
              <pre className={s.bookmarklet} ref={bookmarklet}>
                {`javascript:window.prompt('Copy to clipboard: Ctrl+C, Enter', localStorage.getItem('TinderWeb/APIToken'))`}
              </pre>
            </li>
            <li>
              {'Login into '}
              <a
                href="http://tinder.com"
                rel="noopener noreferrer"
                target="_blank"
              >
                tinder.com
              </a>
              {` using your browser`}
            </li>
            <li>{`In tinder.com page, go to the saved "favorite"`}</li>
            <li>Copy the token that you see in the prompt</li>
            <li>Paste the token here:</li>
          </ol>
          <input type="text" name="token" placeholder="Tinder Token" required />
          <button type="submit">Login</button>
        </form>
      </div>
    </Layout>
  )
}

export default Login
