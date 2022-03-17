// import classes from './notificationspage.module.scss'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Footer from '../../components/layout/footer/FooterController'
import Header from '../../components/layout/header/HeaderController'
import classes from './notificationspage.module.scss'
// import Notification from '../../components/posts/post/NotificationsPageController'

const NotificationsPageView = ({ body }) => (
    <div>
        <Header />
        <Box>
            <Typography
                className={classes.subHeader}
                variant="h4"
                component="div"
            >
                Notifications
            </Typography>
        </Box>
        {body}
        <Footer />
    </div>
)

export default NotificationsPageView
