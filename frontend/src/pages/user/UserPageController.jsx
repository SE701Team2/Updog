import { useParams } from 'react-router-dom'
import { useState } from 'react'
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

    // once api calls are implemented will be changed
    let isFollower = true

    const [buttonText, setButtonText] = useState(isFollower)

    const changeText = () => {
        setButtonText(!buttonText)
        isFollower = !isFollower
    }

    return (
        <UserPageView
            userData={sampleUser}
            userFeed={sampleFeed}
            loggedIn={logginState}
            buttonText={buttonText}
            handleChange={changeText}
        />
    )
}

export default UserPageController
