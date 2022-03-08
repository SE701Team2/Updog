import { PostView } from "./PostView"

export const PostController = ({ post, condensed = false, showReplies = false }) => {
    return (
        <PostView 
            condensed={condensed} 
            post={post} 
            showReplies={showReplies}
        />
    )
}