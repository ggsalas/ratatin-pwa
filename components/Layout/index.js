import s from './index.module.css'

export const Layout = ({ children }) => (
  <section className={s.Layout}>
    <div className={s.header}>🐭 Tin</div>
    <div className={s.content}>{children}</div>
    <div className={s.navigation}>Navigation</div>
  </section>
)
