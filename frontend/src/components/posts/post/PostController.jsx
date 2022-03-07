import { PostView } from "./PostView"

export const PostController = ({ post, condensed = false }) => {
    return (
        <PostView 
            condensed={condensed} 
            post={post} 
        />
    )
}