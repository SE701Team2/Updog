import { useParams } from 'react-router-dom'
import UserPageView from './UserPageView'
import { sampleUser, sampleFeed } from './mock-data'

/**
 * This page renders a user page
 */
const UserPageController = () => {
    // eslint-disable-next-line no-unused-vars
    const { username } = useParams()

    return <UserPageView userData={sampleUser} userFeed={sampleFeed} />
}

export default UserPageController
