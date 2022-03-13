import { useParams } from 'react-router-dom'
import UserPageView from './UserPageView'
import { sampleUser, sampleFeed } from './mock-data'

/**
 * This page renders a user page
 */
const UserPageController = () => {
    // will be used when api call is implemented
    // eslint-disable-next-line no-unused-vars
    const { username } = useParams()

    // once auth is implemented this will be removed
    const logginState = true

    return (
        <UserPageView
            userData={sampleUser}
            userFeed={sampleFeed}
            loggedIn={logginState}
        />
    )
}

export default UserPageController
