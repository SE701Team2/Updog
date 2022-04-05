import FollowButtonView from './FollowButtonView'

/**
 * FollowButton a button that switch from follow to unfollow
 *
 * @prop {boolean} isFollowing
 * @prop {function} onClick
 */
const FollowButtonController = ({ isFollowing, onClick }) => (
  <FollowButtonView isFollowing={isFollowing} onClick={onClick} />
)

export default FollowButtonController
