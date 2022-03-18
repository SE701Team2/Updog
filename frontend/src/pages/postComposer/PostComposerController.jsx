import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { postData } from '../../functions'
import PostComposerView from './PostComposerView'

const PostComposerController = () => {
  const [postText, setPostText] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const submitForm = async () => {
    if (postText) {
      try {
        setLoading(true)
        const response = await postData('posts', {
          text_content: postText,
        })

        if (response.status === 201) {
          // navigate to the newly made post
          setLoading(false)
          navigate(`/posts/${response.data.id}`)
        }
      } catch (e) {
        // this should not error happen for now
        setLoading(false)
      }
    }
  }

  return (
    <PostComposerView
      postText={postText}
      setPostText={setPostText}
      loading={loading}
      submitForm={submitForm}
    />
  )
}
export default PostComposerController
