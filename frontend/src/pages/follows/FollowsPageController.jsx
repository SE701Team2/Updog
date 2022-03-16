import { useState } from 'react'
import { useParams } from 'react-router-dom'
import FollowsPageView from './FollowsPageView'
import useApi from '../../hooks/useApi'

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

    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error: {error}</div>
    }

    setFollowsData(data.followers)

    const handleChange = (event, newTab) => {
        setTab(newTab)
        setFollowsData(newTab === 0 ? data.followers : data.follows)
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
