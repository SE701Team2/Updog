import { useNavigate } from 'react-router'
import HeaderView from './HeaderView'
import useApi from '../../../hooks/useApi'

/**
 * Creates a main header component showing the logo and the user profile pic
 * @prop user - user object
 */

const HeaderController = () => {
  const username = localStorage.getItem('username')
  const { data, loading } = useApi(`users/${username}`)
  let user

  if (loading) {
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
