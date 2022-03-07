import { SimpleUserDetailsView } from "./SimpleUserDetailsView"

export const SimpleUserDetailsController = ({ user, condensed = false, time = 0 }) => {
    return <SimpleUserDetailsView user={user} condensed={condensed} time={time} />
}