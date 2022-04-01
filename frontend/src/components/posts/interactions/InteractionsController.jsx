/* eslint-disable no-param-reassign */
import React, { useState } from 'react'
import InteractionsView from './InteractionsView'
import Comment from '../comment/CommentController'
import { request } from '../../../functions'

/**
 * Creates a posts interactions (likes, comments, shares)
 * @prop postData - any post object
 */
const InteractionsController = ({ postData }) => {
  const [showComponent, setShowComponent] = useState(false)
  const [usersLiked, setUsersLiked] = useState(0)
  const [usersShared, setUsersShared] = useState(0)

  const onLike = async () => {
    if (!postData.usersLiked) {
      const response = await request(`posts/${postData.id}/like`, 'POST', {})
      postData.usersLiked += 1
      console.log(`response is ${JSON.stringify(response)}`)
      setUsersLiked(usersLiked + 1)
    } else {
      const response = await request(`posts/${postData.id}/like`, 'DELETE', {})
      postData.usersLiked -= 1
      console.log(`response is ${JSON.stringify(response)}`)
      setUsersLiked(usersLiked - 1)
    }
  }

  const onComment = () => {
    setShowComponent(!showComponent)
  }

  const onShare = async () => {
    if (!postData.usersShared) {
      const response = await request(`posts/${postData.id}/share`, 'POST', {})
      postData.usersShared += 1
      console.log(`response is ${JSON.stringify(response)}`)
      setUsersShared(usersShared + 1)
    } else {
      const response = await request(`posts/${postData.id}/share`, 'DELETE', {})
      postData.usersShared -= 1
      console.log(`response is ${JSON.stringify(response)}`)
      setUsersShared(usersShared - 1)
    }
  }

  return (
    <div>
      <InteractionsView
        postData={postData}
        onLike={onLike}
        onShare={onShare}
        onComment={onComment}
      />
      {showComponent ? <Comment postData={postData} /> : null}
    </div>
  )
}

export default InteractionsController
