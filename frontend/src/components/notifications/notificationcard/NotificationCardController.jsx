import moment from 'moment'
import NotificationCardView from './NotificationCardView'

/**
 * Creates a NotificationCard Component.
 * Due to the time variable not existing currently in the backend we are passing in a default time
 * When the endpoint is implemented the code can be change as below and the eslint warning can be renabled
 * time={moment(notification.time).fromNow()}
 */

const NotificationCardController = ({
  type,
  // eslint-disable-next-line no-unused-vars
  time,
  handle,
  username,
  image,
  post,
}) => (
  <NotificationCardView
    type={type}
    time={moment([2022, 2, 29]).fromNow()}
    handle={handle}
    username={username}
    image={image}
    post={post}
  />
)

export default NotificationCardController
