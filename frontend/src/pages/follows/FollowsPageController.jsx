import { useState } from 'react';
import { useParams } from "react-router-dom"
import FollowsPageView from "./FollowsPageView"
import followers from './mock-followers'
import follows from './mock-follows'

/**
 * This page renders a user's followers. It also contains
 * a header and the navigation footer.
 */
const FollowsPageController = () => {
    // gets the id from the current url 
    const { id } = useParams()
    
    const [tab, setTab] = useState(0)
    const [followsData, setFollowsData] = useState(followers)

    const handleChange = (event, newTab) => {
        setTab(newTab)
        setFollowsData(
            newTab === 0 ? followers : follows
        )
    }
    // we are going to fetch followers from the user
    parseInt(id, 10)
    

    return <FollowsPageView followsData={followsData}  tab={tab} handleChange={handleChange} />
}

export default FollowsPageController
