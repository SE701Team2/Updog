import React from 'react'
import { Link } from 'react-router-dom'
import Avatar from '@mui/material/Avatar'
import classes from './searchuserdetails.module.scss'
import FollowButton from './FollowButton'

/**
 * The Search User Details component is used to display the any results for users while performing a search.
 * 
 * Props:
 * The username prop is the username of the appropriate user.
 * The handle prop is the handle (@) of the appropriate user.
 * The bio prop is the biography of the appropriate user.
 * The profilePic prop is the link to the profile image of the appropriate user.
 * 
 */

export default function SearchUserDetails({username, handle, profilePic, bio}) {
  
  return (
  <Link to={`/user/${username}`} className ={classes.container} >
    <div className={classes.top}>
      <div className={classes.topLeft}>
        <Avatar
            className={classes.Avatar}
            alt="Profile Pic"
            src={profilePic}
            sx={{ width: 80, height: 80 }}
          />
        <div className = {classes.names}>
          <h2 className= {classes.username}>{username}</h2>
          <p className={classes.handle}>@{handle}</p>
        </div>
      </div>
      <FollowButton isFollowingProp= {false} onClick={() => {}}/>
    </div>
    <p className={classes.biography}>{bio ?? 'Biography'}</p>
  </Link>
  
  )
}
