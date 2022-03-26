import * as React from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'
import styles from './CommentModal.module.css'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
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

export default function BasicModal() {
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
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
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
