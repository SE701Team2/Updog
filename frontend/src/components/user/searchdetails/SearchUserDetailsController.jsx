import { useContext } from 'react'
import { useNavigate } from 'react-router'
import { AuthContext } from '../../../contexts/AuthProvider'
import SearchUserDetailsView from './SearchUserDetailsView'

/**
 * Creates a search user details view i.e. component for resulting users when a search is performed.
 *
 */
const SearchUserDetailsController = ({ user, isFollowing, handleFollow }) => {
  const navigate = useNavigate()
  const {
    user: { username },
  } = useContext(AuthContext)

  const handleToProfile = () => {
    navigate(`/user/${user.username}`)
  }

  return (
    <SearchUserDetailsView
      user={user}
      bio={user.bio}
      isFollowing={isFollowing}
      handleFollow={handleFollow}
      toProfile={handleToProfile}
      isCurrentUser={username === user.username}
    />
  )
}

export default SearchUserDetailsController
