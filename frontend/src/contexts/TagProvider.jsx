import React, { createContext, useState, useMemo, useEffect } from 'react'

export const TagContext = createContext()

const TagProvider = ({ children }) => {
  const [tags, setTags] = useState([])

  const getTags = () => {
    const mockTags = [
      {
        id: 1,
        name: 'tag1',
      },
      {
        id: 2,
        name: 'tag2',
      },
    ]
    setTags(mockTags)
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
