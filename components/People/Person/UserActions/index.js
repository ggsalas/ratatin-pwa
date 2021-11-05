import s from './index.module.css'

export const UserActions = ({ id, onPass, onLike, error }) => (
  <div className={s.actions}>
    {error && <span>Error on the request, try again</span>}

    <button className={s.button} onClick={() => onPass(id)}>
      No
    </button>
    <button className={s.button} onClick={() => onLike(id)}>
      Yes
    </button>
  </div>
)
