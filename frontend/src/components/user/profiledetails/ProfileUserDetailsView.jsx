import Avatar from '@mui/material/Avatar'
import CalendarMonth from '@mui/icons-material/CalendarMonth'
import { Link } from 'react-router-dom'
import classes from './profileuserdetails.module.scss'

const ProfileUserDetailsView = ({ user }) => (
  <div className={classes.container}>
    <Avatar
      className={classes.Avatar}
      alt="Profile Pic"
      src={user.profilePic}
      sx={{ width: 80, height: 80 }}
    />
    <h2>{user.username}</h2>
    <p>@{user.nickname}</p>
    <p className={classes.biography}>{user.bio ?? 'Biography'}</p>
    <p>
      <CalendarMonth /> Joined {new Date(user.joinedDate * 1000).toDateString()}
    </p>
    <Link
      to={`/user/${user.username}/follows`}
      className={classes.followersLink}
    >
      <span className={classes.followCount}>
        <strong>{user.following}</strong>
      </span>{' '}
      Following{' '}
      <span className={classes.followCount}>
        <strong>{user.followers}</strong>
      </span>{' '}
      Followers
    </Link>
  </div>
)

export default ProfileUserDetailsView
