import { useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import UserPageView from './UserPageView'
import useApi from '../../hooks/useApi'

/**
 * This page renders a user page
 */
const UserPageController = () => {
    const { username } = useParams()
    const userData = useApi(`/users/${username}`).data
    const { data, loading, err } = useApi(`/users/${username}/activity`)
    const [isFollower, setIsFollower] = useState(false)
    const loggedIn = username === localStorage.getItem('username')
    const navigate = useNavigate()

    if (loading) {
        return <div>Loading...</div>
    }

    if (err) {
        return <div>Error: {err}</div>
    }

    const handleChange = () => {
        if (loggedIn) {
            navigate(`/user/${username}/settings`)
        }

        setIsFollower(!isFollower)
    }

    return (
        <UserPageView
            userData={userData}
            userFeed={data}
            loggedIn={loggedIn}
            isFollower={isFollower}
            handleChange={handleChange}
        />
    )
}

export default UserPageController
