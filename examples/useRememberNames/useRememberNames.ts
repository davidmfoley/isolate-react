import { useEffect, useState } from 'react'

export const useRememberNames = (name: string) => {
  const [names, setNames] = useState([name])

  // when name changes, add it to our list of names
  useEffect(() => {
    if (!names.includes(name)) {
      setNames([...names, name])
    }
  }, [name])

  return names
}
