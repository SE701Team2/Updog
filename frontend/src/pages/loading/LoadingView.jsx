import { LinearProgress } from '@mui/material'
import classes from './loading.module.scss'
import Logo from '../../images/logo.png'

const LoadingView = () => (
  <>
    <div className={classes.logo}>
      <img src={Logo} alt="logo" />
    </div>
    <div className='line'>
      <LinearProgress/>
    </div>
    <div className={classes.container}>
      <div className={classes.slogan}>
        Check out what&apos;s going on
        <br /> in the world right now.
      </div>
    </div>
  </>
)


export default LoadingView