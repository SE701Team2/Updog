// eslint-disable-next-line import/no-unresolved
import moment from 'moment'
import useApi from '../../../hooks/useApi'
import NotificationCardView from './NotificationCardView'

/**
 * Creates a NotificationCard Component.
 * @prop type - the type of notification
 * @prop time - the time the notification was created
 * @prop handle - the handle of the user who created the notification
 * @prop username - the username of the user who created the notification
 * @prop post - the post id of the post that was liked/shared/replied to
 */
const NotificationCardController = ({ type, time, handle, username, post }) => {
  let content = ''
  let link = ''
  switch (type) {
    case 'like':
      content = `${username}liked your post!`
      link = `/posts/${post}`
      break
    case 'share':
      content = `${username}}shared your post!`
      link = `/posts/${post}`
      break
    case 'reply':
      content = `${username}replied to your post!`
      link = `/posts/${post}`
      break
    case 'follow':
      content = `${username} started following you!`
      link = `/user/${username}`
      break
    default:
      content = 'Unexpected type'
      break
  }

  const { data, loading } = useApi(`users/${username}`)

  if (loading) {
    return <p>Loading...</p>
  }

  return (
    <NotificationCardView
      link={link}
      content={content}
      time={moment(time).fromNow()}
      handle={handle}
      post={post}
      user={data}
    />
  )
}

export default NotificationCardController
