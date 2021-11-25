self.importScripts('./localbaase.min.js')

// const TOKEN_KEY = '__RATATIN_TOKEN__'

async function pullConsole(interval) {
  // setTimeout(() => pullConsole(interval), interval)
  const db = new Localbase('ratatin')
  const people = await db
    .collection('people')
    .orderBy('ratatinUpdatedAt', 'desc')
    .get()
  // const token = localStorage.getItem(TOKEN_KEY)
  // const response = await fetch(`/api/people?token=${token}`)

  // const data = await response.json()
  console.log('.......................timeout', people)
}

self.addEventListener('install', function (event) {
  console.log('Hello world from the Service Worker 🤙')

  pullConsole(1000 * 10)
})
