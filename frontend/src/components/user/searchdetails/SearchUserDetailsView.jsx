import React from 'react'
import { Link } from 'react-router-dom'
import Avatar from '@mui/material/Avatar'
import classes from './searchuserdetails.module.scss'
import FollowButton from './FollowButton'


export default function SearchUserDetails({username, handle, profilePic, bio}) {
  return (
  <Link to={`/user/${username}`} className ={classes.container } >
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
      <FollowButton className= {classes.topRight}/>      
    </div>
    <p className={classes.biography}>{bio ?? 'Biography'}</p>
  </Link>
  
  )
}
