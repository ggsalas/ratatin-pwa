import Head from 'next/head'
import s from './index.module.css'
import Link from 'next/link'

export const Layout = ({ children }) => (
  <>
    <Head>
      <title>RataTin</title>
    </Head>

    <section className={s.Layout}>
      <div className={s.header}>
        <img src="/ratatin.svg" height="24" alt="ratatin" />
      </div>
      <div className={s.content}>{children}</div>
      <div className={s.navigation}>
        <Link href="/people">
          <a className={s.navigationItem}>people</a>
        </Link>
        <Link href="/likes">
          <a className={s.navigationItem}>likes</a>
        </Link>
        <a
          href="https://tinder.com/app/matches"
          rel="noopener noreferrer"
          target="_blank"
          className={s.navigationItem}
        >
          matches↗
        </a>
      </div>
    </section>
  </>
)
