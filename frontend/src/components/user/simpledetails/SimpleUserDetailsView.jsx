import { Link } from 'react-router-dom'
import Avatar from '@mui/material/Avatar'
import ReactTimeAgo from 'react-time-ago'
import classes from './simpleuserdetails.module.scss'

const SimpleUserDetailsView = ({ user, condensed, time }) => {
  const size = condensed ? 56 : 82

  return (
    <Link
      to={`/user/${user.username}`}
      className={condensed ? classes.condensedContainer : classes.container}
    >
      <div className={classes.timestampContainer}>
        <div className={classes.timestamp}>
          <span className={classes.nickname}>{user.nickname}</span>
          <div className={classes.spacer} />
          {time !== 0 && (
            <div className={classes.timestampText}>
              • <ReactTimeAgo date={time} timeStyle="twitter" />
            </div>
          )}
        </div>
        <span className={classes.username}>@{user.username}</span>
      </div>
      <Avatar
        sx={{ width: size, height: size }}
        alt={user.username}
        src={user.profilePic}
      />
    </Link>
  )
}

export default SimpleUserDetailsView
