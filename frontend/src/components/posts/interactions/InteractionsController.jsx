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

  const [usersLiked, setUsersLiked] = useState(postData.usersLiked)
  const [usersShared, setUsersShared] = useState(postData.usersShared)
  const [hasLiked, setHasLiked] = useState(postData.hasLiked)
  const [hasShared, setHasShared] = useState(postData.hasShared)

  /**
   * onLike when the user likes a post
   */
  const onLike = async () => {
    const response = await request(
      `posts/${postData.id}/like`,
      hasLiked ? 'DELETE' : 'POST',
      {}
    )
    if (response.data) {
      setHasLiked(!hasLiked)
      setUsersLiked((hasLiked ? -1 : 1) + usersLiked)
    }
  }

  /**
   * onShare when the user shares a post
   */
  const onShare = async () => {
    const response = await request(
      `posts/${postData.id}/share`,
      hasShared ? 'DELETE' : 'POST',
      {}
    )
    if (response.data) {
      setHasShared(!hasShared)
      setUsersShared((hasShared ? -1 : 1) + usersShared)
    }
  }

  /**
   * onComment show comment popup
   */
  const onComment = () => {
    setShowComponent(!showComponent)
  }

  return (
    <div>
      <InteractionsView
        postData={postData}
        onLike={onLike}
        onShare={onShare}
        onComment={onComment}
        usersShared={usersShared}
        usersLiked={usersLiked}
        hasShared={hasShared}
        hasLiked={hasLiked}
      />
      {showComponent ? <Comment postData={postData} /> : null}
    </div>
  )
}

export default InteractionsController
