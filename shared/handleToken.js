const TOKEN_KEY = '__RATATIN_TOKEN__'

const isBrowser = typeof window !== 'undefined'

export const getToken = () => {
  const token = isBrowser ? window?.localStorage.getItem(TOKEN_KEY) : null

  return token
}

export const saveToken = (token) => {
  const savedToken = isBrowser
    ? window.localStorage.setItem(TOKEN_KEY, token)
    : null

  return savedToken
}

export const removeToken = () => {
  const token = isBrowser ? window.localStorage.removeItem(TOKEN_KEY) : null

  return token
}
