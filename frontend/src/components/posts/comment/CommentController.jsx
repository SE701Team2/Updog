import React, { useState, useContext } from 'react'
import CommentView from './CommentView'
import useApi from '../../../hooks/useApi'
import { TagContext } from '../../../contexts/TagProvider'
import { HandleContext } from '../../../contexts/HandleProvider'

const CommentController = ({ postData }) => {
  const [postText, setPostText] = useState('')
  const [postTags, setPostTags] = useState([])
  const [postHandles, setPostHandles] = useState([])
  const [newTags, setNewTags] = useState([])
  const [loading, setLoading] = useState(false)
  const { loading: userLoading, err } = useApi(
    `users/${postData.author.username}`
  )
  const { tags } = useContext(TagContext)
  const { handles } = useContext(HandleContext)

  const submitForm = async () => {
    if (postText) {
      try {
        setLoading(true)

        // TODO: add postTags and postHandles to request (wait for backend)
        console.log('postTags', postTags)
        console.log('postHandles', postHandles)
        console.log('newTags', newTags)

        // TODO: depends on backend for posting comments
        // const response = await request('comments', 'POST', {
        //   text_content: postText.replaceAll(/<.*?>/g, ''),
        // })

        // // navigate to the newly made post
        // setLoading(false)
        // navigate(`/comments/${response.data.id}`)
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
      setPostHandles={setPostHandles}
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
