import React from 'react'
import BannerSettingView from './BannerSettingView'

/**
 * BannerSetting that manages default banner selections and uploading a new banner
 * @prop {boolean} opened
 * @prop {string[]} defaultBanners
 * @prop {function} upload
 * @prop {string} selectedBanner
 * @prop {function} setSelectedBanner
 * @prop {function} setOpen
 * @prop {function} setProfileBanner
 * @prop {function} updateBannerUpload
 */
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
