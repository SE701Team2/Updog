import { PostView } from "./PostView"
import { sampleReply, samplePost } from './mock-data'

/**
 * Creates a post
 * @prop {number} id 
 * @prop {boolean} condensed - optional, makes the post take up less space
 * @prop {boolean} showReplies - optional, also renders each 1st level reply to the post
 * @prop {boolean} isReply - optional, used internally to mock data, can be removed later
 */
export const PostController = ({ id, condensed = false, showReplies = false, isReply = false }) => {
    // add logic to fetch post from the id.
    let data = samplePost

    // for mock purposes only
    if (isReply) {
        data = sampleReply
    }

    return (
        <PostView 
            condensed={condensed || isReply} 
            postData={data} 
            showReplies={showReplies}
        />
    )
}