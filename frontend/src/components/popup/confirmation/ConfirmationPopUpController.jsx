import { useState } from 'react'
import ConfirmationPopUpView from './ConfirmationPopUpView'

/**
 * Creates a popup for confirmation of a given action.
 * @prop question - the question being asked by the confirmation popup.
 * @prop onAccept - method passed through from parent component for the 'Yes' button to action.
 */

const ConfirmationPopUpController = ({ question, onAccept }) => {
  const [open, setOpen] = useState(true)

  const onDecline = () => {
    setOpen(false)
  }

  return (
    <ConfirmationPopUpView
      question={question}
      open={open}
      onAccept={onAccept}
      onDecline={onDecline}
    />
  )
}

export default ConfirmationPopUpController
