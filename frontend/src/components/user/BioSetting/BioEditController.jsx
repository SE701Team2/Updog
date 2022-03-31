import React from 'react'
import BioEditView from './BioEditView'

export default function BioEditController({
  opened,
  setOpen,
  handleBioUpdate,
}) {
  return (
    <BioEditView
      opened={opened}
      setOpen={setOpen}
      handleBioUpdate={handleBioUpdate}
    />
  )
}
