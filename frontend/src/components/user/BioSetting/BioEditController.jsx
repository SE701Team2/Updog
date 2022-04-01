import React from 'react'
import BioEditView from './BioEditView'

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
