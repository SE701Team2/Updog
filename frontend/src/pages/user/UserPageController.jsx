import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import UserPageView from './UserPageView'
import useApi from '../../hooks/useApi'
import { request } from '../../functions'

const follows = (followsData, username) => {
  const data = followsData?.followers ?? []
  return data.some((i) => i.username === username)
}

/**
 * This page renders a user page
 */
const UserPageController = () => {
  const { username } = useParams()
  const loggedInUsername = localStorage.getItem('username')
  const loggedIn = username === loggedInUsername
  const navigate = useNavigate()
  const { data: userData } = useApi(`users/${username}`)
  const { data: followData } = useApi(`users/${username}/follow`)
  const { data, loading, err } = useApi(`users/${username}/activity`)
  const [isFollower, setIsFollower] = useState(false)

  useEffect(() => {
    if (followData) {
      setIsFollower(follows(followData, loggedInUsername))
    }
  }, [followData])

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

      // update follower count
      userData.followers += isFollower ? -1 : 1
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
