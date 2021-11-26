import s from './index.module.css'
import { RATATIN_STATUS } from '../../../../shared/ratatinStatus'

export const UserActions = ({
  isPerson,
  ratatinStatus,
  isMatch,
  onToggleRetry,
}) => {
  if (!isPerson) return null

  const message = () => {
    if (isMatch) return <span className={s.isMatch}>Is a match!</span>

    if (ratatinStatus === RATATIN_STATUS.sendedLike)
      return <span>Like sended 👍</span>

    if (ratatinStatus === RATATIN_STATUS.sendedPass)
      return <span>User not Liked</span>
  }

  return (
    <div className={s.actions}>
      {message()}

      {!isMatch && (
        <button className={s.button} onClick={onToggleRetry}>
          Retry
        </button>
      )}
    </div>
  )
}
