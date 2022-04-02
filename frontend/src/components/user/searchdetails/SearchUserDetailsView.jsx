import React from 'react'
import SimpleUserDetails from '../simpledetails/SimpleUserDetailsController'
import classes from './searchuserdetails.module.scss'
import FollowButtonController from '../../button/followbutton/FollowButtonController'

/**
 * The SearchUserDetailsView component is used to display the any results for users while performing a search.
 *
 * Props:
 * @username : the username of the appropriate user.
 * @handle : the handle (@) of the appropriate user.
 * @bio : the biography of the appropriate user.
 * @profilePic : the link to the profile image of the appropriate user.
 *
 * The FollowButton function has two props isFollowing and OnClick which can be changed to appropriate values when needed.
 */

export default function SearchUserDetailsView({
  user,
  bio,
  isCurrentUser,
  isFollowing,
  handleFollow,
  toProfile,
}) {
  return (
    <div onClick={toProfile} className={classes.container}>
      <div className={classes.top}>
        <SimpleUserDetails user={user} condensed />
        {!isCurrentUser && (
          <FollowButtonController
            isFollowing={isFollowing}
            onClick={handleFollow}
          />
        )}
      </div>
      <p className={classes.biography}>{bio ?? 'Biography'}</p>
    </div>
  )
}
