import { List, ListItem } from '@mui/material'
import NotificationsPageView from './NotificationsPageView'
import { sampleUser, sampleNotifications as notifsData } from './mock-data'
import classes from './notificationspage.module.scss'
import LikedNotification from '../../components/notifications/liked/LikedNotificationController'
import SharedNotification from '../../components/notifications/shared/SharedNotificationController'
import RepliedNotification from '../../components/notifications/replied/RepliedNotificationController'

/**
 * This page renders a list of notifications for the user.
 */

const NotificationsPageController = () => {
    const notifItems = []
    for (let i = 0; i < notifsData.length; i += 1) {
        // TODO retrieve nickname with id via API
        const { nickname } = sampleUser
        const notifData = notifsData[i]
        let notif = null
        switch (notifData.type) {
            case 'like':
                notif = (
                    <LikedNotification
                        liker={nickname}
                        post={notifData.post}
                        noLikes={1}
                        time={notifData.time}
                    />
                )
                break
            case 'share':
                notif = (
                    <SharedNotification
                        sharer={nickname}
                        post={notifData.post}
                    />
                )
                break
            case 'reply':
                notif = (
                    <RepliedNotification
                        replier={nickname}
                        post={notifData.post}
                    />
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

    const list = <List>{notifItems}</List>
    return <NotificationsPageView body={list} />
}

export default NotificationsPageController
