import { List, ListItem } from '@mui/material'
import { useEffect, useState } from 'react'
import moment from 'moment'
import NotificationsPageView from './NotificationsPageView'
import LoadingView from '../loading/LoadingView'
import useApi from '../../hooks/useApi'
import NotificationCardController from '../../components/notifications/notificationcard/NotificationCardController'

import classes from './notificationspage.module.scss'
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
      const { from, type } = notification
      const timenew = moment([2021, 0, 29]).fromNow()
      console.log(timenew)
      const notif = (
        <NotificationCardController
          type={type}
          time={timenew}
          handle={from}
          username={from}
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
