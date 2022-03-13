import { useState } from 'react'
import SignInView from './SignInView'

const SignInController = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        if (email === '' || password === '') {
            setError('Please fill out all fields')
        } else {
            setError('')
        }
    }

    return (
        <SignInView
            state={(email, password, error)}
            action={(setEmail, setPassword, handleSubmit)}
        />
    )
}

export default SignInController
