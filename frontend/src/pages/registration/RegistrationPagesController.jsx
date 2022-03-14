import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import RegistrationFormView from './RegistrationPageView'

import { postData } from '../../functions'

const RegistrationFormController = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const validation = () => {
        if (!username) {
            setError('Username is required.')
            return false
        }
        if (!email) {
            setError('Email is required.')
            return false
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            setError('Email is invalid.')
            return false
        }
        if (!password) {
            setError('Password is required.')
        } else if (password.length < 5) {
            setError('Password must be at least 5 characters long.')
            return false
        }
        return true
    }

    const submitForm = async () => {
        setLoading(true)
        if (validation()) {
            try {
                const response = await postData('users', {
                    email,
                    password,
                    username,
                    nickname: username,
                })
                const token = response.data.authToken

                if (token) {
                    localStorage.setItem('token', token)
                    setLoading(false)
                    navigate('/')
                }
            } catch (e) {
                setLoading(false)
                setError(e.message)
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
