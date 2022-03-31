import { useContext, useState } from 'react'
import { useNavigate } from 'react-router'
import ProfileSettingsView from './ProfileSettingsView'
import useApi from '../../hooks/useApi'
import { request, uploadImage } from '../../functions'
import SERVER_URL from '../../config'
import LoadingView from '../loading/LoadingView'
import { AuthContext } from '../../contexts/AuthProvider'

/**
 * This page is where users can edit their profile
 */
const ProfileSettingsController = () => {
  const {
    user: { username },
    logout,
  } = useContext(AuthContext)
  const { data, loading, err } = useApi(`users/${username}`)
  const [avatarModalOpen, setAvatarModalOpen] = useState(false)
  const [selectedPicture, setSelectedPicture] = useState(null)
  const navigate = useNavigate()

  // const [bannerModalOpen, setBannerModalOpen] = useState(false)

  if (loading) {
    return <LoadingView />
  }

  if (err) {
    return <div>Error: {err.message}</div>
  }

  const updateProfile = async () => {
    const imageUpload = new FormData()
    imageUpload.append('attachments', selectedPicture)

    await uploadImage(imageUpload)

    const fileName = selectedPicture.name
    const { nickname, bio, profileBanner } = data

    if (selectedPicture != null) {
      await request('users', 'PUT', {
        username,
        nickname,
        bio,
        profilePic: `${SERVER_URL}/images/${fileName}`,
        profileBanner,
      })
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const handleAvatarOpen = () => {
    setAvatarModalOpen(true)
  }

  const handleAvatarClose = () => {
    setAvatarModalOpen(false)
  }

  const handleProfilePic = (e) => {
    const image = e.target.files[0]
    setSelectedPicture(image)
  }

  return (
    <ProfileSettingsView
      user={data}
      updateProfile={updateProfile}
      avatarOpen={avatarModalOpen}
      handleAvatarOpen={handleAvatarOpen}
      handleAvatarClose={handleAvatarClose}
      profilePicture={selectedPicture}
      handleProfilePic={handleProfilePic}
      logout={handleLogout}
    />
  )
}

export default ProfileSettingsController
