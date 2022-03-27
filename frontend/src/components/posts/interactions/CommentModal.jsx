import * as React from 'react'
import { Link } from 'react-router-dom'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'
import styles from './CommentModal.module.scss'
import SimpleUserDetails from '../../user/simpledetails/SimpleUserDetailsController'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',

  boxShadow: 24,
  p: 4,
}

// searchbox styling
const CommentField = styled(TextField)(() => ({
  width: '100%',
  marginTop: '20px',
  //   '& fieldset': {
  //     borderRadius: '25px',
  //     backgroundColor: '#FAFAFC',
  //     zIndex: -1,
  //   },
  //   '& .MuiInputBase-input': {
  //     width: '100%',
  //     color: 'black',
  //   },
  //   '& .MuiOutlinedInput-root': {
  //     '&:hover fieldset': {
  //       borderColor: '#BFBFBF',
  //     },
  //     '&.Mui-focused fieldset': {
  //       borderColor: '#BFBFBF',
  //     },
  //   },
}))

export default function BasicModal({ postData }) {
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

          <Typography id="modal-modal-description" sx={{ mt: 0, ml: 9 }}>
            {postData.content}
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{ mt: 2 }}
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
          <CommentField
            id="outlined-textarea"
            placeholder="Reply..."
            minRows={4}
            multiline
          />
          <Button variant="contained" className={styles.btn}>
            Reply
          </Button>
        </Box>
      </Modal>
    </div>
  )
}
