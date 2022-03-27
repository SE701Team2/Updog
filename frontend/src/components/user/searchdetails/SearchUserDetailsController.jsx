import SearchUserDetailsView from './SearchUserDetailsView'

/**
 * Creates a search user details view i.e. component for resulting users when a search is performed.
 *
 */
const SearchUserDetailsController = ({ username, handle, profilePic, bio }) => (
  <SearchUserDetailsView
    username={username}
    handle={handle}
    profilePic={profilePic}
    bio={bio}
  />
)

export default SearchUserDetailsController
