import * as React from 'react'
import { Link } from 'react-router-dom'
import Box from '@mui/material/Box'

import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import LoadingButton from '@mui/lab/LoadingButton'

import styles from './comment.module.scss'
import SimpleUserDetails from '../../user/simpledetails/SimpleUserDetailsController'
import PostInput from '../postinput/PostInputController'

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
          <Typography id="modal-modal-description" sx={{ mt: 1, ml: 9 }}>
            {postData.content}
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{ mt: 2, ml: 0.5 }}
            className={styles.reply}
          >
            Replying to{' '}
            <Link
              to={`/user/${postData.author.username}`}
              style={{ textDecoration: 'none', color: '#0053ee' }}
            >
              @{postData.author.nickname}
            </Link>
          </Typography>
          <div style={{ marginTop: 20, width: '330px', marginLeft: -15 }}>
            <PostInput
              setPostTags={setPostTags}
              setPostHandles={setPostHandles}
              setPostText={setPostText}
            />
          </div>
          <div className={styles.button}>
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
