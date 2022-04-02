import React, { createContext, useState, useMemo, useEffect } from 'react'
import { request } from '../functions'

export const TagContext = createContext()

const TagProvider = ({ children }) => {
  const [tags, setTags] = useState([])

  const getTags = () => {
    request(`/tags`, 'GET', null, localStorage.getItem('token')).then(
      ({ data }) => {
        setTags(data.map((tag) => ({ id: tag.id, name: tag.tagName })))
      }
    )
  }

  const appendTag = (newTag) => {
    setTags([...tags, newTag])
  }

  useEffect(() => {
    getTags()
  }, [])

  const value = useMemo(() => ({ tags, getTags, appendTag }), [tags])

  return <TagContext.Provider value={value}>{children}</TagContext.Provider>
}
export default TagProvider
