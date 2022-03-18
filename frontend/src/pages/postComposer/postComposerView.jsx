import React from 'react'
import { TextareaAutosize } from '@mui/material'
import classes from './postComposer.module.scss'
import LoadingButton from '@mui/lab/LoadingButton'
import Footer from '../../components/layout/footer/FooterController'
import HeaderCustom from '../../components/layout/headercustom/HeaderCustomController'

const PostComposerView = ({ loading, submitForm, setPostText, postText }) => (
  <div className={classes.container}>
    <HeaderCustom title="New Post" />

    <div className={classes.input}>
      <TextareaAutosize
        minRows={10}
        placeholder="What's Updog?"
        value={postText}
        onChange={(e) => setPostText(e.target.value)}
        style={{
          width: '100%',
          fontFamily: 'Roboto',
          border: '1px solid rgba(0,0,0,0.3)',
          borderRadius: 5,
          outline: 'none',
          resize: 'none',
          padding: 7,
          margin: 'auto',
        }}
      />
    </div>

    <div className={classes.buttonContainer}>
      <LoadingButton
        loading={loading}
        variant="contained"
        fullWidth
        onClick={submitForm}
        style={{ borderRadius: 100, padding: 10 }}
      >
        Post
      </LoadingButton>
    </div>

    <Footer />
  </div>
)

export default PostComposerView
