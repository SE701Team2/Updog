import React, { useMemo, useState } from 'react'

export const NavigationContext = React.createContext({})

/**
 * This context provider will be used for the 'Navigation Bar' component - keeps track
 * of the current selected label which will be used to generate the required content
 */
const NavigationProvider = ({ children }) => {
  const [selection, setSelection] = useState()

  const changeSelection = (event, newValue) => {
    setSelection(newValue)
    // Update the feed...
  }

  const context = useMemo(() => ({ selection, changeSelection }), [selection])

  return (
    <NavigationContext.Provider value={context}>
      {children}
    </NavigationContext.Provider>
  )
}

export default NavigationProvider
