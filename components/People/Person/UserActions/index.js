import s from './index.module.css'
import { RATATIN_STATUS } from '../../../../shared/ratatinStatus'

export const UserActions = ({
  id,
  onPass,
  onLike,
  error,
  loading,
  isPerson,
  ratatinStatus,
  isMatch,
}) => {
  if (!isPerson) return null

  const content = () => {
    if (loading) return <span>Loading...</span>

    if (isMatch) return <span>Is a match!</span>

    if (ratatinStatus === RATATIN_STATUS.sendedLike)
      return <span>Like sended</span>

    if (ratatinStatus === RATATIN_STATUS.sendedPass)
      return <span>User not Liked</span>

    return (
      <div className={s.actions_buttons}>
        <button
          className={`${s.button} ${s.buttonPass}`}
          onClick={() => onPass(id)}
        >
          No
        </button>
        <button
          className={`${s.button} ${s.buttonLike}`}
          onClick={() => onLike(id)}
        >
          Yes
        </button>
      </div>
    )
  }

  return (
    <div className={`${s.actions} ${isMatch ? s.actions_match : ''}`}>
      {error && (
        <span className={s.errorMessage}>Error on the request, try again</span>
      )}
      {content()}
    </div>
  )
}
