import NotificationsPageView from './NotificationsPageView'
import LoadingView from '../loading/LoadingView'
import useApi from '../../hooks/useApi'

/**
 * This page renders a list of notifications for the user.
 */
const NotificationsPageController = () => {
  const { data, loading, err } = useApi(`notifications`)

  if (loading) {
    return <LoadingView />
  }

  if (err) {
    return <div>Error: {err}</div>
  }

  return <NotificationsPageView notifications={data} />
}

export default NotificationsPageController
