import { Link } from 'react-router-dom'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { Typography } from '@mui/material'
import classes from './likedNotification.module.scss'

const LikedNotificationView = ({ liker, post }) => (
  <Link to={`/post/${post}`} className={classes.container}>
    <FavoriteIcon className={classes.icon} />
    <Typography className={classes.notificationDialogue}>
      {liker} liked your post
    </Typography>
  </Link>
)

export default LikedNotificationView
