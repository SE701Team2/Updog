import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import CommentView from './CommentView'
import useApi from '../../../hooks/useApi'
import { request } from '../../../functions'
import { TagContext } from '../../../contexts/TagProvider'
import { HandleContext } from '../../../contexts/HandleProvider'

/**
 * Comment Popup that shows up to allow commenting on a post
 *
 * @prop {object} postData - object of data from postDTO in backend
 */
const CommentController = ({ postData }) => {
  const [postText, setPostText] = useState('')
  // post tags of IDs from the postText
  const [postTags, setPostTags] = useState([])
  // new tags of IDS from the postText that doesn't exist
  const [newTags, setNewTags] = useState([])

  const [loading, setLoading] = useState(false)
  const { loading: userLoading, err } = useApi(
    `users/${postData.author.username}`
  )

  const { tags, getTags } = useContext(TagContext)
  const { handles } = useContext(HandleContext)

  const navigate = useNavigate()

  /**
   * Used to submit a comment to a post
   */
  const submitForm = async () => {
    if (postText) {
      try {
        setLoading(true)

        await request('posts', 'POST', {
          activity: 'COMMENTED',
          parent: postData.id,
          text_content: postText.replaceAll(/<.*?>/g, ''),
          tagIds: postTags,
          newTags,
        })

        // refetch tags for tagContext after newTags is generated
        getTags()

        // navigate to the newly made post comment
        setLoading(false)
        navigate(`/post/${postData.id}`)
      } catch (e) {
        // this should not error happen for now
        setLoading(false)
      }
    }
  }

  if (userLoading) {
    return <div>Loading...</div>
  }

  if (err) {
    return <div>Error: {err.message}</div>
  }

  return (
    <CommentView
      postData={postData}
      setPostTags={setPostTags}
      setPostHandles={() => {}} // @Deprecated setPostHandles
      setPostText={setPostText}
      postText={postText}
      loading={loading || userLoading}
      submitForm={submitForm}
      setNewTags={setNewTags}
      tags={tags}
      handles={handles}
    />
  )
}

export default CommentController
