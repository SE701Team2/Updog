import React from 'react'
import { Link } from 'react-router-dom'
import Avatar from '@mui/material/Avatar'
import classes from './searchuserdetails.module.scss'

export default function SearchUserDetails({user}) {
  return (
  <Link to={`/user/${user.username}`} className ={classes.container } >
    <div className={classes.topLeft}>
      <Avatar
          className={classes.Avatar}
          alt="Profile Pic"
          src={user.profilePic}
          sx={{ width: 80, height: 80 }}
        />
        <div className = {classes.names}>
          <h2>{user.username}</h2>
          <p>@{user.nickname}</p>
        </div>
    </div>
    <p className={classes.biography}>{user.bio ?? 'Biography'}</p>
  </Link>
  
  )
}
