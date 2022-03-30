import { useParams, useNavigate } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import LoadingView from '../loading/LoadingView'
import UserPageView from './UserPageView'
import useApi from '../../hooks/useApi'
import { request } from '../../functions'
import { AuthContext } from '../../contexts/AuthProvider'

const follows = (followsData, username) => {
  const data = followsData?.followers ?? []
  return data.some((i) => i.username === username)
}

/**
 * This page renders a user page
 */
const UserPageController = () => {
  const { username } = useParams()
  const {
    user: { username: loggedInUsername },
  } = useContext(AuthContext)
  const loggedIn = username === loggedInUsername
  const navigate = useNavigate()
  const { data: userData, loading: userLoading } = useApi(`users/${username}`)
  const { data: followData, loading: followLoading } = useApi(
    `users/${username}/follow`
  )
  const {
    data: activityData,
    loading: activityLoading,
    err,
  } = useApi(`users/${username}/activity`)
  const [isFollower, setIsFollower] = useState(false)

  useEffect(() => {
    if (followData) {
      setIsFollower(follows(followData, loggedInUsername))
    }
  }, [followData])

  if (activityLoading || userLoading || followLoading) {
    return <LoadingView />
  }

  if (err) {
    return <div>Error: {err}</div>
  }

  const handleChange = () => {
    if (loggedIn) {
      navigate(`/settings`)
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
      userFeed={activityData}
      loggedIn={loggedIn}
      isFollower={isFollower}
      handleChange={handleChange}
    />
  )
}

export default UserPageController
