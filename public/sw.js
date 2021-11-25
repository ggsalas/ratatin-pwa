self.importScripts('./localbaase.min.js')

const USER = 'ratatin-user'
const RATATIN_STATUS = {
  match: 'match',
  sendedLike: 'sendedLike',
  sendedPass: 'sendedPass',
  undefined: 'undefined',
}

async function getToken() {
  let db = new Localbase('ratatin')
  const user = await db.collection('user').doc(USER).get()

  return user?.token ?? null
}

async function getNewData(interval) {
  setTimeout(() => getNewData(interval), interval)

  try {
    const token = await getToken()

    // Get new people and likes
    const peopleResponse = await fetch(`/api/people?token=${token}`)
    const likesResponse = await fetch(`/api/likes?token=${token}`)
    const newPeople = await peopleResponse.json()
    const newLikes = await likesResponse.json()

    // Save them
    const db = new Localbase('ratatin')

    newPeople.data.results.forEach((person) => {
      db.collection('people').add(
        {
          ...person,
          ratatinUpdatedAt: Date.now(),
          ratatinStatus: RATATIN_STATUS.undefined,
        },
        person.user._id
      )
    })

    newLikes.data.results.forEach((like) => {
      db.collection('likes').add(
        { ...like, ratatinUpdatedAt: Date.now() },
        like.user._id
      )
    })
  } catch (err) {
    console.error('error on SW', err)
  }
}

self.addEventListener('install', function () {
  getNewData(1000 * 60 * 60)
})
