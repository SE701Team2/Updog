import { Link } from 'react-router-dom'
import ShareIcon from '@mui/icons-material/Share'
import Typography from '@mui/material/Typography'
import classes from './sharedNotification.module.scss'

const LikedNotifView = ({ sharer, post }) => (
  <Link to={`/post/${post}`} className={classes.container}>
    <ShareIcon className={classes.icon} />
    <Typography className={classes.notificationDialogue}>
      {sharer} shared your post
    </Typography>
  </Link>
)

export default LikedNotifView
