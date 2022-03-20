import { Link } from 'react-router-dom'
import ReplyIcon from '@mui/icons-material/Reply'
import { Typography } from '@mui/material'
import classes from './repliedNotification.module.scss'

const RepliedNotificationView = ({ replier, post }) => (
  <Link to={`/post/${post}`} className={classes.container}>
    <ReplyIcon className={classes.icon} />
    <Typography className={classes.notificationDialogue}>
      {replier} replied to your post
    </Typography>
  </Link>
)

export default RepliedNotificationView
