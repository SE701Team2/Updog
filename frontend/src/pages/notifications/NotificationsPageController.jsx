import { List, ListItem } from '@mui/material'
import { useEffect, useState } from 'react'
import classes from './notificationspage.module.scss'
import NotificationsPageView from './NotificationsPageView'
import LoadingView from '../loading/LoadingView'
import useApi from '../../hooks/useApi'
import NotificationCardView from '../../components/notifications/notificationcard/NotificationCardView'

/**
 * This page renders a list of notifications for the user.
 * TODO: CHANGE PLACEHOLDER IMAGE TO IMAGE FROM NOTIFICATION
 */
const NotificationsPageController = () => {
  const { data, loading, err } = useApi(`notifications`)
  const [notifications, setNotifications] = useState([])

  useEffect(() => {
    if (!data) return

    const notifItems = []
    for (let i = 0; i < data.length; i += 1) {
      const notification = data[i]
      const { nickname, type, time } = notification

      const notif = (
        <NotificationCardView
          type={type}
          time={time}
          handle={nickname}
          username={nickname}
          image="http://tny.im/rM7"
        />
      )
      notifItems.push(
        <ListItem className={classes.container} key={i}>
          {notif}
        </ListItem>
      )
    }

    setNotifications(notifItems)
  }, [data])

  if (loading) {
    return <LoadingView />
  }

  if (err) {
    return <div>Error: {err}</div>
  }

  const list = <List>{notifications}</List>
  return <NotificationsPageView body={list} />
}

export default NotificationsPageController
