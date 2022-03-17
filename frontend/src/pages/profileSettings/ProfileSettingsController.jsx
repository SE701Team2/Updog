import { useState, useEffect } from 'react'
import ProfileSettingsView from './ProfileSettingsView'
import MockUser from './mock-user'

/**
 * This page is where users can edit their profile
 */
const ProfileSettingsController = () => {
  const [user, setUser] = useState([])
  const [avatarModalOpen, setAvatarModalOpen] = useState(false)

  // const [bannerModalOpen, setBannerModalOpen] = useState(false);

  useEffect(() => {
    // call get user api
    setUser(MockUser)
  })

  const updateProfile = async () => {
    // call update user api
  }

  const handleAvatarOpen = () => {
    setAvatarModalOpen(true)
  }

  const handleAvatarClose = () => {
    setAvatarModalOpen(false)
  }

  return (
    <ProfileSettingsView
      user={user}
      updateProfile={updateProfile}
      avatarOpen={avatarModalOpen}
      handleAvatarOpen={handleAvatarOpen}
      handleAvatarClose={handleAvatarClose}
    />
  )
}

export default ProfileSettingsController
