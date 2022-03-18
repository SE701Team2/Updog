import NotifView from './LikedNotificationView'

const LikedNotificationController = ({ liker, post, noLikes }) => (
  <NotifView liker={liker} post={post} noLikes={noLikes} />
)

export default LikedNotificationController
