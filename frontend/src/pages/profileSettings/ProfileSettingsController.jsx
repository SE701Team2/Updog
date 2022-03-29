import { useState } from 'react'
import ProfileSettingsView from './ProfileSettingsView'
import useApi from '../../hooks/useApi'
import LoadingView from '../loading/LoadingView'

/**
 * This page is where users can edit their profile
 */
const ProfileSettingsController = () => {
  const username = localStorage.getItem('username')
  const { data, loading, err } = useApi(`users/${username}`)
  const [avatarModalOpen, setAvatarModalOpen] = useState(false)
  // const [bannerModalOpen, setBannerModalOpen] = useState(false)

  if (loading) {
    return <LoadingView />
  }

  if (err) {
    return <div>Error: {err.message}</div>
  }

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
      user={data}
      updateProfile={updateProfile}
      avatarOpen={avatarModalOpen}
      handleAvatarOpen={handleAvatarOpen}
      handleAvatarClose={handleAvatarClose}
    />
  )
}

export default ProfileSettingsController
