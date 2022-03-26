import React, { createContext, useState, useMemo, useEffect } from 'react'

export const HandleContext = createContext()

const HandleProvider = ({ children }) => {
  const [handles, setHandles] = useState([])

  const getHandles = () => {
    const mockHandles = [
      {
        id: 1,
        name: 'handle1',
      },
      {
        id: 2,
        name: 'handle2',
      },
    ]
    setHandles(mockHandles)
  }

  const appendHandle = (newHandle) => {
    setHandles([...handles, newHandle])
  }

  useEffect(() => {
    getHandles()
  }, [])

  const value = useMemo(
    () => ({ handles, getHandles, appendHandle }),
    [handles]
  )

  return (
    <HandleContext.Provider value={value}>{children}</HandleContext.Provider>
  )
}
export default HandleProvider
