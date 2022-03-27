import { useState } from 'react'
import ConfirmationPopUpView from './ConfirmationPopUpView'

/**
 * Creates a popup for confirmation of a given action - usually yes or no
 */

const ConfirmationPopUpController = ({ query, method }) => {
  const [open, setOpen] = useState(false)

  const onDecline = () => {
    setOpen(false)
  }

  return (
    <ConfirmationPopUpView
      query={query}
      method={method}
      open={open}
      onDecline={onDecline}
    />
  )
}

export default ConfirmationPopUpController
