import Footer from '../../components/layout/footer/FooterController'
import Header from '../../components/layout/header/HeaderController'
import NotificationCard from '../../components/notifications/notificationcard/NotificationCardController'
import { FeedCard } from '../dashboard/DashboardPageView'

import classes from './notificationspage.module.scss'

const NotificationsPageView = ({ notifications }) => (
  <div>
    <Header />
    <div className={classes.container}>
      {notifications?.map((notification) => (
        <FeedCard key={`${notification.from}-${notification.time}`}>
          <NotificationCard
            type={notification.type}
            time={notification.time}
            username={notification.from}
          />
        </FeedCard>
      ))}
      <p className={classes.centerText}>
        {notifications && notifications.length === 0 && <p>No Notifcations</p>}
      </p>
    </div>
    <Footer />
  </div>
)

export default NotificationsPageView
