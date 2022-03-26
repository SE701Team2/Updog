import FollowButtonView from './FollowButtonView'

const FollowButtonController = ({ isFollowing, onClick }) => (
  <FollowButtonView isFollowing={isFollowing} onClick={onClick} />
)

export default FollowButtonController
