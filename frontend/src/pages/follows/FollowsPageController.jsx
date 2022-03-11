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

    // for mock purposes only, will need to fetch post from id 
    // need to add logic for checking if id is a valid number
    // postData.id = parseInt(id, 10)

    return <FollowsPageView followsData={followsData} />
}

export default FollowsPageController
