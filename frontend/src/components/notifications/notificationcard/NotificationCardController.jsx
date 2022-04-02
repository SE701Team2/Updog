// eslint-disable-next-line import/no-unresolved
import moment from 'moment'
import useApi from '../../../hooks/useApi'
import NotificationCardView from './NotificationCardView'

/**
 * Creates a NotificationCard Component.
 * Due to the time variable not existing currently in the backend we are passing in a default time
 * When the endpoint is implemented the code can be change as below and the eslint warning can be renabled
 * time={moment(notification.time).fromNow()}
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
