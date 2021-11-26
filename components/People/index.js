import s from './index.module.css'
import { Person } from './Person'

export const People = ({ people, withSmallCard }) => {
  if (!people) return null

  if (people.length === 0)
    return <span className={s.noPeople}>No people here</span>

  return (
    <ul className={s.items}>
      {people.map((person) => (
        <Person
          key={person.user._id}
          person={person}
          withSmallCard={withSmallCard}
        />
      ))}
    </ul>
  )
}
