import { useState, useEffect } from 'react'

const useDebounce = ({ value, delay }: { value: string; delay: number }) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  console.log("debounced value", debouncedValue)

  return debouncedValue
}

export default useDebounce
