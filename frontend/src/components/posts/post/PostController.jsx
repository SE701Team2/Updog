// eslint-disable-next-line import/no-cycle
import PostView from "./PostView"
import replyData from './mock-data'

/**
 * Creates a post. One of either id or data must be provided
 * @prop {number} id - optional, data will be fetched using the id
 * @prop {object} data - optional, use this post data to render the post
 * @prop {boolean} condensed - optional, makes the post take up less space
 * @prop {boolean} showReplies - optional, also renders each 1st level reply to the post
 */
const PostController = ({ id = 0, data = null, condensed = false, showReplies = false }) => {
    let postData = data
    if (id) {
        // add logic to fetch post from the id.
        // for mock, we assume that if an id is given its a reply 
        postData = replyData
    } else if (!data) {
        // true if neither id or data is given
        return <div>Error retrieving post data</div>
    }

    return (
        <PostView 
            condensed={condensed} 
            postData={postData} 
            showReplies={showReplies}
        />
    )
}

export default PostController
