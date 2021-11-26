import { useRef, useState } from 'react'
import { PersonCard } from '../PersonCard'
import { PersonSmallCard } from '../PersonSmallCard'
import { usePeopleActions } from '../../../hooks/usePeopleActions'
import { RATATIN_STATUS } from '../../../shared/ratatinStatus'
import s from './index.module.css'

export const Person = ({ person, withSmallCard }) => {
  const personRef = useRef(null)
  const [retry, setRetry] = useState(false)

  const onScrollCard = () => {
    window.scrollTo({
      top: personRef.current.offsetTop - 56,
      left: 0,
      behavior: 'smooth',
    })
  }

  const onToggleRetry = () => {
    setRetry((st) => !st)
    onScrollCard()
  }

  const onSuccess = () => {
    if (retry === true) setRetry(false)
    onScrollCard()
  }

  const { status, ...actions } = usePeopleActions({
    onSuccess: onSuccess,
  })

  const personStatus = status || person.ratatinStatus

  return (
    <li key={person.user._id} className={s.item} ref={personRef}>
      {!retry && withSmallCard && personStatus !== RATATIN_STATUS.undefined ? (
        <PersonSmallCard
          person={person}
          actions={actions}
          status={personStatus}
          onToggleRetry={onToggleRetry}
        />
      ) : (
        <PersonCard
          person={person}
          actions={actions}
          status={personStatus}
          retry={retry}
        />
      )}
    </li>
  )
}
