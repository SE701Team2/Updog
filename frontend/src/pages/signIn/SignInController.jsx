import { useContext, useState } from 'react'
import { useNavigate } from 'react-router'
import { AuthContext } from '../../contexts/AuthProvider'
import { TagContext } from '../../contexts/TagProvider'
import { request } from '../../functions'
import validationEmail from '../../functions/validateEmail'
import SignInView from './SignInView'

/**
 * SignIn page where the user signs in to the app
 */
const SignInController = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const authContext = useContext(AuthContext)
  const { getTags } = useContext(TagContext)

  /**
   * Handles login through login button
   */
  const handleSubmit = async (e) => {
    e.preventDefault() // prevent the default submit form action

    if (email === '' || password === '') {
      setError('Please fill out all fields')
    } else if (!validationEmail(email)) {
      setError('Invalid email address')
    } else {
      setLoading(true)
      const { data, err } = await request('users/authenticate', 'POST', {
        email,
        password,
      })
      setLoading(false)

      if (err) {
        setError(err)
        return
      }

      const { authToken, username } = data

      // user successfully login and change status of authContext
      if (authToken && username) {
        localStorage.setItem('token', authToken)
        localStorage.setItem('username', username)
        authContext.login({ token: authToken, username })
        getTags()
        navigate('/')
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
