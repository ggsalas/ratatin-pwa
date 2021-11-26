import { RATATIN_STATUS } from './ratatinStatus'

export const getPeopleWithLikes = ({ people, likes }) => {
  return people?.map((item) => {
    // check if photo.id match, because user and likes has different ids :(
    const likesYou = likes?.some((like) => {
      const photosIds = item.user.photos.map((photo) => photo.id)

      return photosIds.includes(like.user.photos[0].id)
    })

    return {
      ...item,
      likesYou,
    }
  })
}

export const getLikesWithPeopleInfo = ({ people, likes }) => {
  return likes
    .map((like) => {
      // check if photo.id match, because user and likes has different ids :(
      const person = people?.find((item) => {
        const photosIds = item.user.photos.map((photo) => photo.id)

        return photosIds.includes(like.user.photos[0].id)
      })

      return {
        ...like,
        ...person,
      }
    })
    .filter((like) => like.ratatinStatus !== RATATIN_STATUS.match)
}
