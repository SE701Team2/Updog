import React, { createContext, useState, useMemo, useEffect } from 'react'
import { request } from '../functions'

export const HandleContext = createContext()

const HandleProvider = ({ children }) => {
  const [handles, setHandles] = useState([])

  const getHandles = () => {
    request(`users`, 'GET').then(({ data }) => {
      setHandles(
        data.usernames.map((handle) => ({
          id: handle.id,
          name: handle.username,
        }))
      )
    })
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
