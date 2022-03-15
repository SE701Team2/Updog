import { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import {
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    TextField,
} from '@mui/material'
import classes from './signIn.module.scss'
import LoadingButton from '@mui/lab/LoadingButton'

const SignInView = ({ state, action }) => {
    const { email, password, loading, error } = state
    const { setEmail, setPassword, handleSubmit } = action

    const [showPassword, setShowPassword] = useState(false)
    return (
        <>
            <div className={classes.logo}>Logo</div>
            <div className={classes.container}>
                <div className={classes.inputsContainer}>
                    <h2>Sign in to Updog</h2>
                    <span
                        className={classes.error}
                        style={{
                            // this is done so that if the error shows up, the elements are not displaced (preallocated space)
                            color: error ? 'red' : 'rgba(0,0,0,0)',
                        }}
                    >
                        {error ? error : 'Blank'}
                    </span>
                    <div className={classes.input}>
                        <TextField
                            label="Your Email"
                            type="email"
                            variant="outlined"
                            value={email}
                            fullWidth
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className={classes.input}>
                        <FormControl variant="outlined" fullWidth>
                            <InputLabel htmlFor="outlined-adornment-password">
                                Password
                            </InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() =>
                                                setShowPassword(!showPassword)
                                            }
                                            onMouseDown={() =>
                                                setShowPassword(!showPassword)
                                            }
                                            edge="end"
                                        >
                                            {showPassword ? (
                                                <VisibilityOff />
                                            ) : (
                                                <Visibility />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                            />
                        </FormControl>
                    </div>
                </div>
                <div className={classes.bottomContainer}>
                    <div className={classes.buttonContainer}>
                        <LoadingButton
                            variant="contained"
                            fullWidth
                            loading={loading}
                            onClick={(e) => handleSubmit(e)}
                            style={{ borderRadius: 100, padding: 10 }}
                        >
                            Sign in
                        </LoadingButton>
                    </div>

                    <span className={classes.signUpText}>
                        Don't have an account?{' '}
                        <span className={classes.signUpText}>
                            <Link to="/signUp">Sign up</Link>
                        </span>
                    </span>
                </div>
            </div>
        </>
    )
}

export default SignInView
