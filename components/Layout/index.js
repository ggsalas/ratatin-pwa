import { cloneElement } from 'react'
import Head from 'next/head'
import s from './index.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Image from 'next/image'

const NavLink = ({ href, children }) => {
  const router = useRouter()

  let className = s.navigationItem
  if (router.pathname === href) {
    className = `${s.navigationItem} ${s.navigationItem_active}`
  }

  return <Link href={href}>{cloneElement(children, { className })}</Link>
}

export const Layout = ({ children, withNavigation }) => (
  <>
    <Head>
      <title>RataTin</title>
    </Head>

    <section className={s.Layout}>
      <div className={s.header}>
        <Link href="/">
          <a>
            <Image src="/ratatin.svg" height="24" width="104" alt="ratatin" />
          </a>
        </Link>
      </div>

      <div className={s.content}>{children}</div>

      {withNavigation && (
        <div className={s.navigation}>
          <NavLink
            href="/all-people"
            className={s.navigationItem}
            activeClassName={s.navigationItem_active}
          >
            <a>People</a>
          </NavLink>
          <NavLink
            href="/likes"
            className={s.navigationItem}
            activeClassName={s.navigationItem_active}
          >
            <a>Likes</a>
          </NavLink>
          <a
            href="https://tinder.com/app/matches"
            rel="noopener noreferrer"
            target="_blank"
            className={s.navigationItem}
          >
            Chat↗
          </a>
        </div>
      )}
    </section>
  </>
)
