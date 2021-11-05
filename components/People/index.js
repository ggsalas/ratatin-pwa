import s from './index.module.css'
import { usePeopleActions } from '../../hooks/usePeopleActions'

const Person = ({ person }) => {
  const { bio, name, birth_date, photos, _id } = person.user
  const { loading, error, isMatch, onLike, onPass } = usePeopleActions()

  if (loading) return <span>Loading...</span>

  if (isMatch?.id) return <span>{`${name} Is a Match!!!`}</span>

  if (isMatch === null) {
    return (
      <li key={_id} className={s.item}>
        <div className={s.userData}>
          {name && <h3>{name}</h3>}
          {birth_date && <p>{new Date(birth_date).toLocaleDateString()}</p>}
          {bio && <p>{bio}</p>}
          {person.likesYou && <h2>Seems he Likes You</h2>}
        </div>

        <img alt="img" src={photos[0].url} className={s.image} />

        {person.type === 'user' && (
          <UserActions {...{ id: _id, onPass, onLike, error }} />
        )}
      </li>
    )
  }

  return null
}

const UserActions = ({ id, onPass, onLike, error }) => (
  <div className={s.actions}>
    {error && <span>Error on the request, try again</span>}

    <button onClick={() => onPass(id)}>No</button>
    <span>{` - `}</span>
    <button onClick={() => onLike(id)}>Yes</button>
  </div>
)

export const People = ({ people }) => {
  if (!people || people.length === 0) return null

  return (
    <ul className={s.items}>
      {people.map((person) => {
        return <Person key={person.user._id} person={person} />
      })}
    </ul>
  )
}
