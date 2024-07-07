export const setToLocalStorage = (key: string, token: string) => {
  if (typeof window !== 'undefined') return localStorage.setItem(key, token)
}

export const getFromLocalStorage = (key: string) => {
  if (typeof window !== 'undefined') return localStorage.getItem(key)
}

export const removeUserInfo = (key: string) => {
  if (typeof window !== 'undefined') return localStorage.removeItem(key)
}

export const clearLocalStorage = () => {
  if (typeof window !== 'undefined') return localStorage.clear()
}
