import { useState } from 'react'
import { usePeopleActions } from '../../../hooks/usePeopleActions'
import { UserActions } from './UserActions'

import s from './index.module.css'

export const Person = ({ person }) => {
  const [page, setPage] = useState(0)
  const { loading, error, isMatch, onLike, onPass } = usePeopleActions()
  const { bio, name, birth_date, photos, _id } = person.user
  const photoURLs = (() => {
    if (person.type === 'user')
      return [photos[0].url, ...photos.map((photo) => photo.url)]

    return [photos[0].url]
  })()

  const onGoPrev = () => setPage((page) => page - 1)
  const onGoNext = () => setPage((page) => page + 1)

  if (isMatch?.id) return <span>{`${name} Is a Match!!!`}</span>

  if (isMatch === null) {
    const navigation = () => {
      if (photoURLs.length === 1) return null

      return (
        <div className={s.navigation}>
          <button
            onClick={onGoPrev}
            disabled={page === 0}
            className={`${s.button} ${s.buttonLeft}`}
          >
            ←
          </button>
          <button
            onClick={onGoNext}
            disabled={page === photoURLs.length - 1}
            className={`${s.button} ${s.buttonRight}`}
          >
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
        {navigation()}

        <div className={s.content}>
          <div className={s.userData}>
            {name && <h3>{name}</h3>}
            {birth_date && <p>{new Date(birth_date).toLocaleDateString()}</p>}
            {bio && <p>{bio}</p>}
            {person.likesYou && <h2>Seems he Likes You</h2>}
          </div>

          {person.type === 'user' && (
            <UserActions {...{ id: _id, onPass, onLike, error, loading }} />
          )}
        </div>
      </div>
    )

    const imagePage = () => (
      <div
        className={s.page}
        style={{ backgroundImage: `url('${photoURLs[page]}')` }}
      >
        {navigation()}
      </div>
    )

    if (page === 0 && person.type === 'user') return firstPage()

    return imagePage()
  }

  return null
}
