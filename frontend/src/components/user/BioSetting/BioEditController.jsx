import React from 'react'
import BioEditView from './BioEditView'

/**
 * Bio edit popup allow users to edit their own bio page
 * @prop {boolean} opened
 * @prop {function} setOpen
 * @prop {function} handleBioUpdate
 * @prop {function} setBioText
 */
export default function BioEditController({
  opened,
  setOpen,
  handleBioUpdate,
  setBioText,
}) {
  return (
    <BioEditView
      opened={opened}
      setOpen={setOpen}
      setBioText={setBioText}
      handleBioUpdate={handleBioUpdate}
    />
  )
}
