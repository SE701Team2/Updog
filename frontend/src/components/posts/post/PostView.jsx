import SimpleUserDetails from '../../user/simpledetails/SimpleUserDetailsController'
import Interactions from '../interactions/InteractionsController';
// eslint-disable-next-line import/no-cycle
import Post from './PostController';
import classes from './post.module.scss'

const PostView = ({ postData, condensed, showReplies }) => {
    if (condensed) {
        return (
            <div className={classes.condensed}>
                <SimpleUserDetails condensed user={postData.author} time={postData.timestamp} />
                {postData.content}
                <div className={classes.condensedInteractions}>
                    <Interactions postData={postData} />
                </div>
            </div>
        )
    }

    return (
        <div className={classes.container}>
            <SimpleUserDetails user={postData.author} />
            <div className={classes.content}>
                <span>{new Date(postData.timestamp).toLocaleTimeString()}:</span>
                <span>{postData.content}</span>
            </div>
            <div className={classes.interactions}>
                <Interactions postData={postData} />
            </div>
            {showReplies && postData.children.map(reply => (
                <div key={reply.id} className={classes.reply}>
                    <Post id={reply.id} isReply />
                </div> 
            ))}
        </div>
    )
}

export default PostView
