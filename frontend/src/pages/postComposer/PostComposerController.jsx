import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PostComposerView from './PostComposerView'
import useApi from '../../hooks/useApi'
import { request } from '../../functions'
import LoadingView from '../loading/LoadingView'

const PostComposerController = () => {
  const [postText, setPostText] = useState('')
  const [postTags, setPostTags] = useState([])
  const [postHandles, setPostHandles] = useState([])
  const [newTags, setNewTags] = useState([])
  const [loading, setLoading] = useState(false)
  const username = localStorage.getItem('username')
  const { data, loading: userLoading, err } = useApi(`users/${username}`)

  const navigate = useNavigate()

  const submitForm = async () => {
    if (postText) {
      try {
        setLoading(true)

        // TODO: add postTags and postHandles to request (wait for backend)
        console.log('postTags', postTags)
        console.log('postHandles', postHandles)
        console.log('newTags', newTags)

        const response = await request('posts', 'POST', {
          text_content: postText.replaceAll(/<.*?>/g, ''),
        })

        // navigate to the newly made post
        setLoading(false)
        navigate(`/posts/${response.data.id}`)
      } catch (e) {
        // this should not error happen for now
        setLoading(false)
      }
    }
  }

  if (userLoading) {
    return <LoadingView />
  }

  if (err) {
    return <div>Error: {err.message}</div>
  }

  return (
    <PostComposerView
      user={data}
      postText={postText}
      setPostText={setPostText}
      loading={loading || userLoading}
      submitForm={submitForm}
      setPostTags={setPostTags}
      setPostHandles={setPostHandles}
      setNewTags={setNewTags}
    />
  )
}
export default PostComposerController
