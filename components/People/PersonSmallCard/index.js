import { useState } from 'react'
import { UserActions } from './UserActions'
import { RATATIN_STATUS } from '../../../shared/ratatinStatus'

import s from './index.module.css'

export const PersonSmallCard = ({ person, actions, status, onToggleRetry }) => {
  const { loading, error, onLike, onPass } = actions
  const { user, type } = person
  const { name, birth_date, photos, _id } = user
  const isMatch = status === RATATIN_STATUS.match

  return (
    <div className={s.reactedContainer}>
      <div
        className={`${s.page} ${isMatch ? s.page_hasMatch : ''}`}
        style={{ backgroundImage: `url('${photos[0].url}')` }}
      />

      <div className={s.content}>
        <div className={s.userData}>
          {name && <h3>{name}</h3>}
          {birth_date && <p>{new Date(birth_date).toLocaleDateString()}</p>}
          {person.likesYou && !isMatch && (
            <span className={s.likesYou}>Seems he Likes You</span>
          )}
        </div>

        <UserActions
          {...{
            id: _id,
            onPass,
            onLike,
            error,
            loading,
            isPerson: type === 'user',
            isMatch,
            ratatinStatus: status,
            onToggleRetry,
          }}
        />
      </div>
    </div>
  )
}
