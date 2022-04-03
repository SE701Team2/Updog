import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LoadingView from '../loading/LoadingView'
import PostComposerView from './PostComposerView'
import useApi from '../../hooks/useApi'
import { request } from '../../functions'
import { AuthContext } from '../../contexts/AuthProvider'

const PostComposerController = ({ embedded }) => {
  const [postText, setPostText] = useState('')
  const [postTags, setPostTags] = useState([])
  const [newTags, setNewTags] = useState([])
  const [loading, setLoading] = useState(false)
  const {
    user: { username },
  } = useContext(AuthContext)
  const { data, loading: userLoading, err } = useApi(`users/${username}`)

  const navigate = useNavigate()

  const submitForm = async () => {
    if (postText) {
      try {
        setLoading(true)

        const response = await request('posts', 'POST', {
          text_content: postText.replaceAll(/<.*?>/g, ''),
          tagIds: postTags,
          newTags,
        })

        // navigate to the newly made post
        setLoading(false)
        navigate(`/post/${response.data.id}`)
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
      setPostHandles={() => {}}
      setNewTags={setNewTags}
      embedded={embedded}
    />
  )
}
export default PostComposerController
