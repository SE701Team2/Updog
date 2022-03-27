import React, { useState } from 'react'
import BannerSettingView from './BannerSettingView'

export default function BannerSettingController({
  opened,
  defaultBanners,
  upload,
  currentBanner,
  setOpen,
}) {
  const [selected, setSelected] = useState(currentBanner)

  const handleSave = () => {
    setOpen(false)
  }

  return (
    <BannerSettingView
      opened={opened}
      defaultBanners={defaultBanners}
      upload={upload}
      currentBanner={currentBanner}
      setOpen={setOpen}
      selected={selected}
      action={{ setSelected, handleSave }}
    />
  )
}
