import SearchUserDetailsView from './SearchUserDetailsView'

/**
 * Creates a people card showing their name, handle, profile picture, bio and if they following the person.
 * @prop user - a user object
 */
const SearchUserDetailsController = ({ user }) => (
  <SearchUserDetailsView user={user}  />
)

export default SearchUserDetailsController
