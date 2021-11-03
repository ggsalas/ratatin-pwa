import s from './index.module.css'

export const Likes = ({ likes }) => (
  <ul className={s.items}>
    {likes.map((like) => (
      <li key={like.user._id} className={s.item}>
        <img alt="img" src={like.user.photos[0].url} className={s.image} />
      </li>
    ))}
  </ul>
)
