import { useContext } from 'react'
import { useNavigate } from 'react-router'
import HeaderView from './HeaderView'
import useApi from '../../../hooks/useApi'
import { AuthContext } from '../../../contexts/AuthProvider'

/**
 * Creates a main header component showing the logo and the user profile pic
 * @prop user - user object
 */

const HeaderController = () => {
  const {
    user: { username },
  } = useContext(AuthContext)
  const { data, loading } = useApi(`users/${username}`)
  let user

  if (loading || !data) {
    user = { username: '', profilePic: '' }
  } else {
    user = data
  }

  const navigate = useNavigate()

  const goToFeed = () => {
    navigate('/')
  }

  const goToProfile = () => {
    navigate(`/user/${username}`)
  }

  return (
    <HeaderView user={user} goToFeed={goToFeed} goToProfile={goToProfile} />
  )
}

export default HeaderController
