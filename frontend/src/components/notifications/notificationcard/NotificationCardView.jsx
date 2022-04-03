import { React } from 'react'
import { Grid } from '@mui/material'
import { Link } from 'react-router-dom'
import SimpleUserDetails from '../../user/simpledetails/SimpleUserDetailsController'
import classes from './notificationcard.module.scss'

/**
 * This component will be used in notification screen to display any new alerts received by the user. It should be
 *
 * Props:
 * @type: the type of notification to be displayed. Should be either like, share, reply or follow.
 * @time : a formatted time to be displayed. Assumed to be already formatted ie in the form "3 weeks ago".
 * @handle : the handle (@) of the appropriate user
 * @username : the username of the appropriate user
 * @image : the link to the users profile image
 * @post : the link to the relevant post
 *
 * The const variable avatar size has been extracted out in case any avatar size changes need to be made
 */

function NotificationCardView({ content, time, user, link }) {
  return (
    <Link to={link} className={classes.link}>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        wrap="no-wrap"
      >
        <Grid item xs="auto" container>
          <SimpleUserDetails condensed user={user} />
        </Grid>

        <Grid item xs="auto" container>
          <p variant="caption" className={classes.timestamp}>
            • {time}
          </p>
        </Grid>
      </Grid>
      <Grid item xs={12} container alignItems="center" justifyContent="center">
        <span className={classes.content}>{content}</span>
      </Grid>
    </Link>
  )
}

export default NotificationCardView
