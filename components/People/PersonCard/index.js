import { useState } from 'react'
import { UserActions } from './UserActions'
import { RATATIN_STATUS } from '../../../shared/ratatinStatus'

import s from './index.module.css'

export const PersonCard = ({ person, actions, status, retry }) => {
  const [page, setPage] = useState(0)
  const { loading, error, onLike, onPass } = actions
  const { user, type, distance_mi } = person
  const { bio, name, birth_date, photos, _id } = user
  const isMatch = status === RATATIN_STATUS.match
  const photoURLs = (() => {
    if (type === 'user')
      return [photos[0].url, ...photos.map((photo) => photo.url)]

    return [photos[0].url]
  })()

  const onGoPrev = () =>
    setPage((page) => {
      if (page === 0) return photoURLs.length - 1
      return page - 1
    })
  const onGoNext = () =>
    setPage((page) => {
      if (page === photoURLs.length - 1) return 0
      return page + 1
    })

  const topNavigation = () => {
    if (photoURLs.length > 2)
      return (
        <div className={s.topNavigation}>
          {photoURLs.map((_photo, i) => (
            <div
              key={`${i}-nav`}
              className={`${s.topNavigation_page} ${
                page === i ? s.topNavigation_page_selected : ''
              }`}
              onClick={() => setPage(i)}
            />
          ))}
        </div>
      )
    return null
  }

  const navigation = () => {
    if (photoURLs.length === 1) return null

    return (
      <div className={s.navigation}>
        <button onClick={onGoPrev} className={`${s.button} ${s.buttonLeft}`}>
          ←
        </button>
        <button onClick={onGoNext} className={`${s.button} ${s.buttonRight}`}>
          →
        </button>
      </div>
    )
  }

  const firstPage = () => (
    <div
      className={s.page}
      style={{ backgroundImage: `url('${photoURLs[page]}')` }}
    >
      {topNavigation()}
      {navigation()}

      <div className={`${s.content} ${isMatch ? s.content_hasMatch : ''}`}>
        <div className={s.userData}>
          {name && <h3>{name}</h3>}
          {birth_date && (
            <p>
              <span>{new Date(birth_date).toLocaleDateString()}</span>
              {distance_mi && (
                <span> - {(distance_mi * 1.609344).toFixed(1)} km</span>
              )}
            </p>
          )}
          {bio && <p>{bio}</p>}
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
            retry,
          }}
        />
      </div>
    </div>
  )

  const imagePage = () => (
    <div
      className={s.page}
      style={{ backgroundImage: `url('${photoURLs[page]}')` }}
    >
      {topNavigation()}
      {navigation()}
      <div className={`${s.content} ${isMatch ? s.content_hasMatch : ''}`}>
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
            retry,
          }}
        />
      </div>
    </div>
  )

  if (page === 0 && type === 'user') return firstPage()

  return imagePage()
}
