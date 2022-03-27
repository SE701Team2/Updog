import { LinearProgress } from '@mui/material'
import classes from './loading.module.scss'
import Logo from '../../images/logo.png'

const LoadingView = () => (
  <div className={classes.container}>
    <div className={classes.logo}>
      <img src={Logo} alt="logo" />
    </div>
    <div className={classes.progressLine}>
      <LinearProgress />
    </div>
  </div>
)

export default LoadingView
