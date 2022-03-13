import Avatar from '@mui/material/Avatar'
import CalendarMonth from '@mui/icons-material/CalendarMonth'
import { Link } from 'react-router-dom'
import classes from './profileuserdetails.module.scss'

const ProfileUserDetailsView = ({ user }) => (
    <div className={classes.container}>
        <div className={classes.banner}>
            <img alt="Profile Banner" src={user.profileBanner} />
        </div>
        <Avatar
            alt="Profile Pic"
            src={user.profilePic}
            sx={{ width: 56, height: 56 }}
        />
        <h1>{user.username}</h1>
        <p>@{user.nickname}</p>
        &nbsp;
        <p>{user.bio}</p>
        &nbsp;
        <p>
            {' '}
            <CalendarMonth /> Joined {new Date(user.joinedDate).toDateString()}
        </p>
        &nbsp;
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
