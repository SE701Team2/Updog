import { Button, styled, TextField } from '@mui/material'
import React, { useState } from 'react'
import classes from './registrationpage.module.scss'

const ConfirmButton = styled(Button)({
    display: 'flex',
    fontSize: '16px',
    padding: '10px 60px',
    boxShadow:
        'rgba(0, 0, 0, 0) 0px 10px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px',
    cursor: 'pointer',
    transition: 'all 0.1s',
    margin: 'auto',
    marginTop:'20px'
})
const InputField = styled(TextField)({
    minWidth: '300px',
    margin: '20px',
})

const RegistrationFormView = ({ submitForm, onInputChange, value, errors }) => {
    const [error, setErrors] = useState({})


    const formConfirm = async (event) => {
        event.preventDefault()
        setErrors(errors)
        // if user data is collected and no errors
        // set the subnitForm to true
        // passing this value to RegistrationFormController later
        // to show the Account Creat form
        if (Object.keys(errors).length === 0 ) {
            submitForm(true)
            console.log(value)
        }
    }

    return (
        <div className={classes.appwrapper}>
            <div>
                <h2 className={classes.title}>Create an account</h2>
            </div>
            <form className="form-wrapper">
                <div className={classes.name}>
                    <InputField
                        label="Username"
                        type="text"
                        name="userName"
                        value={value.userName}
                        onChange={onInputChange}
                    />

                    {error.userName && (
                        <p className={classes.error}>{error.userName}</p>
                    )}
                </div>

                <div className={classes.email}>
                    <InputField
                        label="Email"
                        type="email"
                        name="email"
                        value={value.email}
                        onChange={onInputChange}
                    />

                    {error.email && (
                        <p className={classes.error}>{error.email}</p>
                    )}
                </div>
                <div className={classes.password}>
                    <InputField
                        label="Password"
                        type="password"
                        name="password"
                        value={value.password}
                        onChange={onInputChange}
                    />
                    {error.password && (
                        <p className={classes.error}>{error.password}</p>
                    )}
                </div>

                <div>
                    <ConfirmButton variant="contained" onClick={formConfirm}>
                        Confirm
                    </ConfirmButton>
                </div>
            </form>
        </div>
    )
}

export default RegistrationFormView
