import React from 'react'
import Button from '@mui/material/Button'
import classes from './followbutton.module.scss'

/**
 * The follow button component changes the Button text from following to follow or vice versa.
 *
 * Props:
 * @isFollowing: a boolean that states if the user is currently following the user in the serach results.
 * @onClick: function that would be called when the user Click to "Follow" or "UnFollow" someone
 */
export default function FollowButtonView({ isFollowing, onClick }) {
  const [isFollowingState, setIsFollowingState] = React.useState(isFollowing)

  const change = (e) => {
    // Top propagation of buttion click outside of follow button
    e.stopPropagation()
    setIsFollowingState((boolean) => {
      onClick(!boolean)
      return !boolean
    })
  }

  return (
    <Button className={classes.followButton} onClick={change}>
      {isFollowingState ? 'Unfollow' : 'Follow'}
    </Button>
  )
}
