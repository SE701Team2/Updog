import NotificationCardView from './NotificationCardView'

/**
 * Creates a NotificationCard Component.
 * TO DO:
 * Implement any NotificationCardController logic if needed
 */

const NotificationCardController = ({
  description,
  time,
  handle,
  username,
  image,
}) => (
  <NotificationCardView
    description={description}
    time={time}
    handle={handle}
    username={username}
    image={image}
  />
)

export default NotificationCardController
