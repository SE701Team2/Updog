import { SimpleUserDetailsView } from "./SimpleUserDetailsView"

/**
 * Creates a user header showing their name and profile picture
 * @prop user - a user object
 * @prop condensed - optional, makes the user header take up less space
 * @prop time - optional, used to show the time a post was created
 */
export const SimpleUserDetailsController = ({ user, condensed = false, time = 0 }) => {
    return <SimpleUserDetailsView user={user} condensed={condensed} time={time} />
}