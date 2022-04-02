import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import CommentView from './CommentView'
import useApi from '../../../hooks/useApi'
import { request } from '../../../functions'
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

  const navigate = useNavigate()

  const submitForm = async () => {
    if (postText) {
      try {
        setLoading(true)
        console.log(postData)

        // TODO: add postTags and postHandles to request (wait for backend)
        console.log('postTags', postTags)
        console.log('postHandles', postHandles)
        console.log('newTags', newTags)

        await request('posts', 'POST', {
          text_content: postText.replaceAll(/<.*?>/g, ''),
          parent: postData.id,
        })

        // navigate to the newly made post comment
        setLoading(false)
        navigate(`/post/${postData.id}`)
        window.location.reload()
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
