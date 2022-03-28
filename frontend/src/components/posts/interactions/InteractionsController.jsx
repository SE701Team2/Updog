import React, { useState } from 'react'
import InteractionsView from './InteractionsView'
import Comment from '../comment/CommentController'

/**
 * Creates a posts interactions (likes, comments, shares)
 * @prop postData - any post object
 */
const InteractionsController = ({ postData }) => {
  const [showComponent, setShowComponent] = useState(false)

  const onLike = () => {
    // todo, implement like business logic
  }

  const onComment = () => {
    setShowComponent(!showComponent)
  }

  const onShare = () => {
    // todo, open share dialog
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
