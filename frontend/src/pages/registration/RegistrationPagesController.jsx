import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import RegistrationFormView from './RegistrationPageView'
import validationEmail from '../../functions/validateEmail'

import { request } from '../../functions'
import { AuthContext } from '../../contexts/AuthProvider'

const RegistrationFormController = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const authContext = useContext(AuthContext)

    const validation = () => {
        if (!username) {
            setError('Username is required.')
            return false
        }
        if (!email) {
            setError('Email is required.')
            return false
        }
        if (!validationEmail(email)) {
            setError('Email is not valid.')
            return false
        }
        if (!password) {
            setError('Password is required.')
            return false
        }
        if (password.length < 5) {
            setError('Password must be at least 5 characters long.')
            return false
        }
        return true
    }

    const submitForm = async () => {
        if (validation()) {
            setLoading(true)
            const { data, err } = await request('users', 'POST', {
                email,
                password,
                username,
                nickname: username,
            })
            setLoading(false)

            if (err) {
                setError(err)
                return
            }

            const token = data.authToken
            if (token) {
                localStorage.setItem('token', token)
                authContext.login()
                navigate('/')
            }
        }
    }

    return (
        <RegistrationFormView
            state={{
                email,
                password,
                username,
                error,
                loading,
            }}
            action={{
                setEmail,
                setPassword,
                setUsername,
                submitForm,
            }}
        />
    )
}
export default RegistrationFormController
