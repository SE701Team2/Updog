import { useContext, useState } from 'react'
import { useNavigate } from 'react-router'
import { AuthContext } from '../../contexts/AuthProvider'
import { postData } from '../../functions'
import validationEmail from '../../functions/validateEmail'
import SignInView from './SignInView'

const SignInController = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const authContext = useContext(AuthContext)

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (email === '' || password === '') {
            setError('Please fill out all fields')
        } else if (!validationEmail(email)) {
            setError('Invalid email address')
        } else {
            try {
                setLoading(true)
                const { data } = await postData('users/authenticate', {
                    email,
                    password,
                })
                const token = data.authToken

                if (token) {
                    setLoading(false)
                    localStorage.setItem('token', token)
                    authContext.login()
                    navigate('/')
                }
            } catch (err) {
                setLoading(false)
                setError(err.message)
            }
        }
    }

    return (
        <SignInView
            state={{ email, password, loading, error }}
            action={{ setEmail, setPassword, handleSubmit }}
        />
    )
}

export default SignInController
