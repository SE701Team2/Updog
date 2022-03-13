import { Link } from 'react-router-dom'

import Button from '@mui/material/Button'
import classes from './landing.module.scss'

const LandingView = () => (
    <>
        <div className={classes.logo}>Logo</div>
        <div className={classes.container}>
            <div className={classes.slogan}>
                Check out whats going on
                <br /> in the world right now.
            </div>
            <div className={classes.content}>
                <div className={classes.buttonsContainer}>
                    <div className={classes.loginButton}>
                        <Link to="/signIn">
                            <Button
                                variant="outlined"
                                fullWidth
                                style={{ borderRadius: 100, padding: 10 }}
                            >
                                Sign in
                            </Button>
                        </Link>
                    </div>
                    <div className={classes.divider}>
                        <hr />
                        <span>Or</span>
                        <hr />
                    </div>
                    <div className={classes.createAccount}>
                        <Link to="/signUp">
                            <Button
                                variant="contained"
                                fullWidth
                                style={{ borderRadius: 100, padding: 10 }}
                            >
                                Create an Account
                            </Button>
                        </Link>
                    </div>
                </div>
                <div className={classes.loginText}>
                    Have an account already?{' '}
                    <span className={classes.loginLink}>
                        <Link to="/signIn">Sign in</Link>
                    </span>
                </div>
            </div>
        </div>
    </>
)

export default LandingView
