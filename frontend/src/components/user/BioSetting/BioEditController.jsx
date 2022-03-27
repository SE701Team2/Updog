import React from 'react'
import BioEditView from './BioEditView'

export default function BioEditController({ opened, setOpen }) {
  return <BioEditView opened={opened} setOpen={setOpen} />
}
