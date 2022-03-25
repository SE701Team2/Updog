/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useState } from 'react'

export const InterestsContext = React.createContext({})

/**
 * This context provider will be used for the 'Select your interests' screen to track what tags the
 * user has selected. This approach is chosen as opposed to passing state down the heirarchy
 * because it is more maintainable.
 */
export function InterestsContextProvider({ children }) {
  const [selectedTags, setSelectedTags] = useState([])

  function addToSelectedTags(tag) {
    setSelectedTags((array) => [...array, tag])
  }

  function removeFromSelectedTags(tag) {
    setSelectedTags((array) => {
      const clonedArray = [...array]
      const index = clonedArray.findIndex((item) => item === tag)
      clonedArray.splice(index, 1)
      return clonedArray
    })
  }

  // Passing the two mutation functions, and state itself to the children components.
  const context = { selectedTags, addToSelectedTags, removeFromSelectedTags }

  return (
    <InterestsContext.Provider value={context}>
      {children}
    </InterestsContext.Provider>
  )
}
