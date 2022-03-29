import { List, ListItem } from '@mui/material'
import { useEffect, useState } from 'react'
import NotificationsPageView from './NotificationsPageView'
import classes from './notificationspage.module.scss'
import LikedNotification from '../../components/notifications/liked/LikedNotificationController'
import SharedNotification from '../../components/notifications/shared/SharedNotificationController'
import RepliedNotification from '../../components/notifications/replied/RepliedNotificationController'
import useApi from '../../hooks/useApi'
import LoadingView from '../loading/LoadingView'

/**
 * This page renders a list of notifications for the user.
 */
const NotificationsPageController = () => {
  const { data, loading, err } = useApi(`notifications`)
  const [notifications, setNotifications] = useState([])

  useEffect(() => {
    if (!data) return

    const notifItems = []
    for (let i = 0; i < data.length; i += 1) {
      const notification = data[i]
      const nickname = notification.from

      let notif = null
      switch (notification.type) {
        case 'like':
          notif = (
            <LikedNotification
              liker={nickname}
              post={notification.post}
              noLikes={1}
              time={notification.time}
            />
          )
          break
        case 'share':
          notif = (
            <SharedNotification sharer={nickname} post={notification.post} />
          )
          break
        case 'reply':
          notif = (
            <RepliedNotification replier={nickname} post={notification.post} />
          )
          break
        default:
          break // error handling potentially could be added here
      }
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
