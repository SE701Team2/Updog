import ProfileUserDetailsView from './ProfileUserDetailsView'

/**
 * Creates a profile details view
 * @prop {object} user a user object
 */
const ProfileUserDetailsController = ({ user }) => (
  <ProfileUserDetailsView user={user} />
)

export default ProfileUserDetailsController
