import { PostView } from "./PostView"
import { sampleReply, samplePost } from './mock-data'

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