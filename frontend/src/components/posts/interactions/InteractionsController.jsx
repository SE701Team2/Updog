import { InteractionsView } from "./InteractionsView"

export const InteractionsController = ({ post }) => {
    const onLike = () => {
        // todo, implement like business logic 
    }

    const onComment = () => {
        // todo, open a reply page
    }

    const onShare = () => {
        // todo, open share dialog
    }

    return (
        <InteractionsView 
            post={post}
            onLike={onLike} 
            onShare={onShare} 
            onComment={onComment} 
        />
    )
}