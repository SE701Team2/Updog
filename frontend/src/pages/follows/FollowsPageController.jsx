import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import FollowsPageView from './FollowsPageView'
import useApi from '../../hooks/useApi'
import LoadingView from '../loading/LoadingView'

/**
 * This page renders a user's followers. It also contains
 * a header and the navigation footer.
 */
const FollowsPageController = () => {
  // gets the username from the current url
  const { username } = useParams()
  const { data, loading, error } = useApi(`users/${username}/follow`)
  const [followsData, setFollowsData] = useState()
  const [tab, setTab] = useState(0)

  useEffect(() => {
    if (data) {
      setFollowsData(data.followers)
    }
  }, [data])

  if (loading) {
    return <LoadingView />
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  const handleChange = (event, newTab) => {
    setTab(newTab)
    setFollowsData(newTab === 0 ? data.followers : data.following)
  }

  return (
    <FollowsPageView
      followsData={followsData}
      tab={tab}
      handleChange={handleChange}
    />
  )
}

export default FollowsPageController
