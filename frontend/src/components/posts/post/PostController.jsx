import { useContext, useState } from 'react'
// eslint-disable-next-line import/no-cycle
import PostView from './PostView'
import useApi from '../../../hooks/useApi'
import { TagContext } from '../../../contexts/TagProvider'
import { HandleContext } from '../../../contexts/HandleProvider'
import classes from './post.module.scss'

/**
 * Creates a post. One of either id or data must be provided
 * @prop {string} activity - optional, POSTED, SHARED, COMMENTED or LIKED
 * @prop {number} id - optional, data will be fetched using the id
 * @prop {object} data - optional, use this post data to render the post
 * @prop {boolean} condensed - optional, makes the post take up less space
 * @prop {boolean} showReplies - optional, also renders each 1st level reply to the post
 * @prop {boolean} newPost
 */
const PostController = ({
  activity = 'POSTED',
  id = 0,
  data = null,
  condensed = false,
  showReplies = false,
}) => {
  const { tags } = useContext(TagContext)
  const { handles } = useContext(HandleContext)
  const username = localStorage.getItem('username')
  let postData = data
  let parentPost
  let parentLoading
  if (postData) {
    const { data: resData, loading } = useApi(`posts/${postData.parent}`)
    parentPost = resData
    parentLoading = loading
  }

  let activityText

  const [url, setUrl] = useState('')

  if (id) {
    const { data: resData, loading, err } = useApi(`posts/${id}`)

    if (loading || parentLoading) {
      return <div>Loading...</div>
    }

    if (err) {
      return <div>Error: {err}</div>
    }

    switch (activity) {
      case 'POSTED':
        activityText = `${resData.author.nickname} posted`
        break
      case 'SHARED':
        activityText = `${username} reshared @${resData.author.username}'s post`
        break
      case 'COMMENTED':
        activityText = (
          <>
            {resData.author.username} commented on{' '}
            <span className={classes.link}>@{username}&apos;s post</span>
          </>
        )
        break
      case 'LIKED':
        activityText = `${username} liked @${resData.author.username}'s post`
        break
      default:
        activityText = null
    }

    postData = resData
  } else if (!data) {
    // true if neither id or data is given
    return <div>Error retrieving post data</div>
  }

  // Regex match and extract url from post content
  const maybeUrl = /(https?:\/\/[^\s]+)/g.exec(postData.content)

  // check match, and stop React from infinite rendering loop
  if (maybeUrl && url !== maybeUrl[0]) {
    setUrl(maybeUrl[0])
  }

  return (
    <PostView
      activityText={activityText}
      condensed={condensed}
      postData={postData}
      showReplies={showReplies}
      tags={tags}
      handles={handles}
      parentPost={parentPost}
      url={url}
    />
  )
}

export default PostController
