import Link from 'next/link'
import s from './index.module.css'

export const DataError = () => (
  <div className={s.main}>
    <p>Error getting data</p>

    <p>Please login again to refresh the Tinder Token</p>
    <Link href="/logout">
      <button>Login</button>
    </Link>
  </div>
)
