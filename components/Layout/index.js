import { cloneElement } from 'react'
import Head from 'next/head'
import s from './index.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router'

const NavLink = ({ href, children }) => {
  const router = useRouter()

  let className = s.navigationItem
  if (router.pathname === href) {
    className = `${s.navigationItem} ${s.navigationItem_active}`
  }

  return <Link href={href}>{cloneElement(children, { className })}</Link>
}

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
        <NavLink href="/new">
          <a>new</a>
        </NavLink>
        <NavLink
          href="/likes"
          className={s.navigationItem}
          activeClassName={s.navigationItem_active}
        >
          <a>likes</a>
        </NavLink>
        <NavLink
          href="/all-people"
          className={s.navigationItem}
          activeClassName={s.navigationItem_active}
        >
          <a>all</a>
        </NavLink>
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
