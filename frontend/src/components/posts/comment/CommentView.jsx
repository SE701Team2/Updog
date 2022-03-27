/* eslint-disable react/no-danger */
import * as React from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import LoadingButton from '@mui/lab/LoadingButton'
import styles from './comment.module.scss'
import SimpleUserDetails from '../../user/simpledetails/SimpleUserDetailsController'
import PostInput from '../postinput/PostInputController'
import processMentions from '../../../functions/mentions'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
}

export default function BasicModal({
  postData,
  setPostTags,
  setPostHandles,
  setPostText,
  loading,
  submitForm,
  setNewTags,
  tags,
  handles,
}) {
  const [open, setOpen] = React.useState(true)

  const handleClose = () => setOpen(false)

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <SimpleUserDetails
            condensed
            user={postData.author}
            time={postData.timestamp}
          />
          <div
            dangerouslySetInnerHTML={{
              __html: processMentions({
                content: postData.content ?? '',
                tags,
                handles,
                tagStyle: styles.tagStyle,
                handleStyle: styles.handleStyle,
              }),
            }}
            style={{ marginTop: 10, marginLeft: 70 }}
          />
          <div
            dangerouslySetInnerHTML={{
              __html: processMentions({
                content: `Replying to @${postData.author.username} ` ?? '',
                tags,
                handles,
                tagStyle: styles.tagStyle,
                handleStyle: styles.handleStyle,
              }),
            }}
            style={{ marginTop: 25 }}
          />
          <div style={{ marginTop: 25, width: '330px', marginLeft: -15 }}>
            <PostInput
              setPostTags={setPostTags}
              setPostHandles={setPostHandles}
              setPostText={setPostText}
              setNewTags={setNewTags}
            />
          </div>
          <div className={styles.buttonDiv}>
            <LoadingButton
              loading={loading}
              variant="contained"
              fullWidth
              onClick={submitForm}
              style={{ borderRadius: 10, padding: 10, textTransform: 'none' }}
            >
              Reply
            </LoadingButton>
          </div>
        </Box>
      </Modal>
    </div>
  )
}
