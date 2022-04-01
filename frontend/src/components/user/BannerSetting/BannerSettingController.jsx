import React from 'react'
import BannerSettingView from './BannerSettingView'

export default function BannerSettingController({
  opened,
  defaultBanners,
  upload,
  selectedBanner,
  setSelectedBanner,
  setOpen,
  setProfileBanner,
  updateBannerUpload,
}) {
  const handleSave = () => {
    if (selectedBanner !== null) {
      updateBannerUpload()
      setProfileBanner(selectedBanner)
    }
    setOpen(false)
  }

  return (
    <BannerSettingView
      opened={opened}
      defaultBanners={defaultBanners}
      upload={upload}
      setOpen={setOpen}
      selected={selectedBanner}
      action={{ handleSave, updateBannerUpload, setSelectedBanner }}
    />
  )
}
