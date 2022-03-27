import { Button, Dialog, Typography } from '@mui/material'
import classes from './confirmationPopUp.module.scss'

const ConfirmationPopUpView = ({ query, method, open, onDecline }) => (
  <Dialog open={true}>
    <div>
      <Typography variant="h3">{query}</Typography>
    </div>
    <div className={classes.button}>
      <Button onClick={onDecline}>No</Button>
      <Button onClick={method}>Yes</Button>
    </div>
  </Dialog>
)

export default ConfirmationPopUpView
