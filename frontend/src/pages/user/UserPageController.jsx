import { useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import UserPageView from './UserPageView'
import useApi from '../../hooks/useApi'
import { request } from '../../functions'

/**
 * This page renders a user page
 */
const UserPageController = () => {
    const { username } = useParams()
    const userData = useApi(`/users/${username}`).data
    const { data, loading, err } = useApi(`users/${username}/activity`)
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
        } else {
            const method = isFollower ? 'DELETE' : 'POST'
            request(`users/${username}/follow`, method)
            setIsFollower(!isFollower)
        }
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
