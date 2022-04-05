import React, { createContext, useState, useMemo, useEffect } from 'react'
import { request } from '../functions'

export const HandleContext = createContext()

/**
 * HandleProvider to setup HandleContext that stores all handles
 * @prop {object} children - child of jsx component
 */
const HandleProvider = ({ children }) => {
  const [handles, setHandles] = useState([])

  /**
   * Called to get new list of handles from server
   */
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

  /**
   * Add a handle to the handle list
   */
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
