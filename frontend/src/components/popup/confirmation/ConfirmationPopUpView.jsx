import { Button, Dialog, Typography } from '@mui/material'
import classes from './confirmationPopUp.module.scss'

const ConfirmationPopUpView = ({ question, open, onAccept, onDecline }) => (
  <Dialog open={open}>
    <div className={classes.title}>
      <Typography variant="h6">{question}</Typography>
    </div>
    <div className={classes.button}>
      <Button
        onClick={onDecline}
        variant="outlined"
        sx={{
          maxWidth: '120px',
          maxHeight: '50px',
          minWidth: '120px',
          minHeight: '50px',
        }}
      >
        No
      </Button>
      <Button
        onClick={onAccept}
        variant="contained"
        sx={{
          maxWidth: '120px',
          maxHeight: '50px',
          minWidth: '120px',
          minHeight: '50px',
        }}
      >
        Yes
      </Button>
    </div>
  </Dialog>
)

export default ConfirmationPopUpView
