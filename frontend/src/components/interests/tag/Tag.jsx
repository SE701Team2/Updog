import React, { useContext, useEffect, useState } from 'react'
import { InterestsContext } from '../../../contexts/InterestsProvider'
import classes from './tag.module.scss'

/**
 * Tag component that represents a single tag.
 */
export default function Tag({ label }) {
  // The initial select state of the tag is 'false'
  const [selectState, setSelectState] = useState(false)
  const { addToSelectedTags, removeFromSelectedTags } =
    useContext(InterestsContext)

  useEffect(() => {
    // When the internal state of the tag is changed, update the context state.
    if (selectState) {
      addToSelectedTags(`#${label}`)
      return
    }
    removeFromSelectedTags(`#${label}`)
  }, [selectState])

  // On click handler for the tag, which toggles the select state boolean value.
  function toggleState() {
    setSelectState((currentState) => !currentState)
  }

  return (
    <button
      type="button"
      onClick={toggleState}
      className={`${classes.button} ${selectState && classes.selected}`}
    >
      #{label}
    </button>
  )
}
