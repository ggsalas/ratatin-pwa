import s from './index.module.css'

export const Likes = ({ likes }) => (
  <ul className={s.items}>
    {likes.map((like) => {
      console.log(like)
      const { bio, name, birth_date, photos, type } = like.user

      return (
        <li key={like.user._id} className={s.item}>
          <div className={s.userData}>
            {name && <h3>{name}</h3>}
            {birth_date && <p>{new Date(birth_date).toLocaleDateString()}</p>}
            {bio && <p>{bio}</p>}
          </div>
          <img alt="img" src={photos[0].url} className={s.image} />
          {type === 'user' && (
            <div className={s.actions}>
              <button>No</button> <span>{` - `}</span>
              <button>Yes</button>
            </div>
          )}
        </li>
      )
    })}
  </ul>
)
