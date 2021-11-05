export const getPeopleWithLikes = ({ people, likes }) => {
  // TODO: do this in the database should be better
  return people.map((item) => {
    // check if photo.id match (user and likes has different ids :(
    const likesYou = likes.some((like) => {
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
  // TODO: do this in the database should be better
  return likes.map((like) => {
    // check if photo.id match (user and likes has different ids :(
    const person = people.find((item) => {
      const photosIds = item.user.photos.map((photo) => photo.id)

      return photosIds.includes(like.user.photos[0].id)
    })

    return {
      ...like,
      ...person,
    }
  })
}
