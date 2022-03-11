import { useParams } from "react-router-dom"
import FollowsPageView from "./FollowsPageView"
import followsData from './mock-followers'

/**
 * This page renders a user's followers. It also contains
 * a header and the navigation footer.
 */
const FollowsPageController = () => {
    // gets the id from the current url 
    const { id } = useParams()

    // we are going to fetch followers from the user
    parseInt(id, 10)

    return <FollowsPageView followsData={followsData} />
}

export default FollowsPageController
