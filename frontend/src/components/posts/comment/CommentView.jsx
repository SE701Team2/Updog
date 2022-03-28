/* eslint-disable react/no-danger */
import * as React from 'react'
import { Dialog, Card, DialogTitle, Grid } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import LoadingButton from '@mui/lab/LoadingButton'
import styles from './comment.module.scss'
import SimpleUserDetails from '../../user/simpledetails/SimpleUserDetailsController'
import PostInput from '../postinput/PostInputController'
import processMentions from '../../../functions/mentions'

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
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xl">
      <Card sx={{ p: 2 }}>
        <DialogTitle sx={{ p: 0 }}>
          <Grid container sx={{ justifyContent: 'flex-end' }}>
            <Grid item>
              <CloseIcon onClick={handleClose} id="closeButton" />
            </Grid>
          </Grid>
        </DialogTitle>

        <SimpleUserDetails
          condensed
          user={postData.author}
          time={postData.timestamp}
        />
        <div
          className={styles.content}
          dangerouslySetInnerHTML={{
            __html: processMentions({
              content: postData.content ?? '',
              tags,
              handles,
              tagStyle: styles.tagStyle,
              handleStyle: styles.handleStyle,
            }),
          }}
        />
        <div className={styles.reply}>
          <p>
            Replying to{' '}
            <a
              href={`/user/${postData.author.username}`}
              className={styles.link}
            >
              @{postData.author.username}
            </a>
          </p>
        </div>

        <div className={styles.postInput}>
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
            className={styles.loadingButton}
          >
            Reply
          </LoadingButton>
        </div>
      </Card>
    </Dialog>
  )
}
