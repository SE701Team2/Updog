import { useNavigate } from 'react-router'
import SearchUserDetailsView from './SearchUserDetailsView'

/**
 * Creates a search user details view i.e. component for resulting users when a search is performed.
 *
 */
const SearchUserDetailsController = ({ user, isFollowing, handleFollow }) => {
  const navigate = useNavigate()

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
    />
  )
}

export default SearchUserDetailsController
