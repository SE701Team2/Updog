import NotificationCardView from './NotificationCardView'

/**
 * Creates a NotificationCard Component.
 */

const NotificationCardController = ({
  type,
  time,
  handle,
  username,
  image,
}) => (
  <NotificationCardView
    type={type}
    time={time}
    handle={handle}
    username={username}
    image={image}
  />
)

export default NotificationCardController
