import Button from '@mui/material/Button'
import classes from './landing.module.scss'

const LandingView = ({ onLogin, onSignUp }) => (
    <>
        <div className={classes.logo}>Logo</div>
        <div className={classes.container}>
            <div className={classes.slogan}>
                Check out whats going on
                <br /> in the world right now.
            </div>
            <div className={classes.buttonsContainer}>
                <div className={classes.loginButton}>
                    <Button
                        variant="outlined"
                        onClick={onLogin}
                        fullWidth
                        style={{ borderRadius: 100 }}
                    >
                        Login
                    </Button>
                </div>
                <span className={classes.divider}>Or</span>
                <div className={classes.createAccount}>
                    <Button
                        variant="contained"
                        onClick={onSignUp}
                        fullWidth
                        style={{ borderRadius: 100 }}
                    >
                        Create an Account
                    </Button>
                </div>
            </div>
            <div className={classes.loginText}>
                Have an account already? Log in
            </div>
        </div>
    </>
)

export default LandingView
