import Head from 'next/head'
import s from './index.module.css'

export const Layout = ({ children }) => (
  <>
    <Head>
      <title>RataTin</title>
    </Head>

    <section className={s.Layout}>
      <div className={s.header}>
        <img src="/ratatin.svg" width="60" height="24" alt="ratatin" />
      </div>
      <div className={s.content}>{children}</div>
      <div className={s.navigation}>Navigation</div>
    </section>
  </>
)
