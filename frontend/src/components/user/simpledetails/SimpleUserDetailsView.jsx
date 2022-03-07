import { Link } from 'react-router-dom'
import Avatar from '@mui/material/Avatar'
import classes from './simpleuserdetails.module.scss'
import ReactTimeAgo from 'react-time-ago'

export const SimpleUserDetailsView = ({ user, condensed, time }) => {
    const size = condensed ? 56 : 82

    return (
        <Link 
            to={`/user/${user.username}`} 
            className={condensed ? classes.condensedContainer : classes.container}
        >
            <div>
                <div className={classes.timestamp}>
                    <span>{user.nickname}</span>
                    {time !== 0 && (
                        <div>
                            • <ReactTimeAgo date={time} timeStyle="twitter" />
                        </div>
                    )}
                </div>
                <span>@{user.username}</span>
            </div>
            <Avatar sx={{ width: size, height: size }} alt={user.username} src={user.profilePic} />
        </Link>
    )
}