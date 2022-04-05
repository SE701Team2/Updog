import React, { createContext, useState, useMemo, useEffect } from 'react'
import { request } from '../functions'

export const TagContext = createContext()

/**
 * TagProvider to setup TagContext that stores all tags
 * @prop {object} children - child of jsx component
 */
const TagProvider = ({ children }) => {
  const [tags, setTags] = useState([])

  /**
   * Used to fetch all tags from the backend
   */
  const getTags = () => {
    request(`tags`, 'GET', null).then(({ data }) => {
      setTags(data.map((tag) => ({ id: tag.id, name: tag.tagName })))
    })
  }

  /**
   * Used to add a new tag to the list of tags
   */
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
