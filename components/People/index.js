import s from './index.module.css'
import { Person } from './Person'

export const People = ({ people }) => {
  if (!people || !people.length) return null

  if (people.length === 0) return <span>No people</span>

  return (
    <ul className={s.items}>
      {people.map((person) => {
        return (
          <li key={person.user._id} className={s.item}>
            <Person person={person} />
          </li>
        )
      })}
    </ul>
  )
}
