import React, { createContext, useState, useMemo, useEffect } from 'react'
import { request } from '../functions'

export const AuthContext = createContext()

/**
 * AuthProvider to setup AuthContext that stores auth information
 * including token and username. Provides login state for the app.
 * @prop {object} children - child of jsx component
 */
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    token: localStorage.getItem('token'),
    username: localStorage.getItem('username'),
  })

  /**
   * Update login state
   */
  const login = ({ token, username }) => {
    setUser({ token, username })
    localStorage.setItem('token', token)
    localStorage.setItem('username', username)
  }

  /**
   * Change login state to logout
   */
  const logout = () => {
    setUser({})
    localStorage.removeItem('token')
    localStorage.removeItem('username')
  }

  // Check if the token and username is still valid
  useEffect(() => {
    request(
      `/users/${localStorage.getItem('username')}`,
      'GET',
      null,
      localStorage.getItem('token')
    ).then(({ data }) => {
      if (data == null) {
        logout()
      }
    })
  }, [])

  const value = useMemo(
    () => ({ isAuthenticated: user.token === undefined, user, login, logout }),
    [user]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
export default AuthProvider
