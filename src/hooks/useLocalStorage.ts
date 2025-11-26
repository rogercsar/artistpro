import { useEffect, useState } from 'react'

const isBrowser = () => typeof window !== 'undefined'

export function useLocalStorage<T>(key: string, initialValue: T) {
  const readValue = () => {
    if (!isBrowser()) return initialValue
    try {
      const item = window.localStorage.getItem(key)
      return item ? (JSON.parse(item) as T) : initialValue
    } catch {
      return initialValue
    }
  }

  const [storedValue, setStoredValue] = useState<T>(readValue)

  const setValue = (value: T | ((val: T) => T)) => {
    const valueToStore = value instanceof Function ? value(storedValue) : value
    setStoredValue(valueToStore)
    if (isBrowser()) {
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    }
  }

  useEffect(() => {
    setStoredValue(readValue())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])

  return [storedValue, setValue] as const
}

