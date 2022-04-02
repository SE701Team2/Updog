import React from 'react'
import LoadingButton from '@mui/lab/LoadingButton'
import classes from './postComposer.module.scss'
import Footer from '../../components/layout/footer/FooterController'
import HeaderCustom from '../../components/layout/headercustom/HeaderCustomController'
import PostInput from '../../components/posts/postinput/PostInputController'
import SimpleUserDetailsView from '../../components/user/simpledetails/SimpleUserDetailsView'

const PostComposerView = ({
  user,
  loading,
  submitForm,
  setPostTags,
  setPostHandles,
  setPostText,
  setNewTags,
}) => (
  <div className={classes.container}>
    <HeaderCustom title="New Post" />

    <div className={classes.profileContainer}>
      <SimpleUserDetailsView user={user} condensed time={0} />
    </div>

    <PostInput
      setPostTags={setPostTags}
      setPostHandles={setPostHandles}
      setPostText={setPostText}
      setNewTags={setNewTags}
    />

    <div className={classes.buttonContainer}>
      <LoadingButton
        data-testid="submit-post-button"
        loading={loading}
        variant="contained"
        fullWidth
        onClick={submitForm}
        style={{ borderRadius: 10, padding: 10, textTransform: 'none' }}
      >
        Post
      </LoadingButton>
    </div>

    <Footer />
  </div>
)

export default PostComposerView
