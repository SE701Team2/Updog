import InteractionsView from "./InteractionsView"

/**
 * Creates a posts interactions (likes, comments, shares)
 * @prop postData - any post object 
 */
const InteractionsController = ({ postData }) => {
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
            postData={postData}
            onLike={onLike} 
            onShare={onShare} 
            onComment={onComment} 
        />
    )
}

export default InteractionsController 
