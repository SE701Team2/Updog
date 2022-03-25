import React from 'react'

const NotificationCard = ({ description, time, handle, username, image }) => (
  <>
    <div>{description}</div>
    <div>{time}</div>
    <div>{handle}</div>
    <div>{username}</div>
    <div>{image}</div>
  </>
)

export default NotificationCard
