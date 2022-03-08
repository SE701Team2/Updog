import { SimpleUserDetailsController } from '../../user/simpledetails/SimpleUserDetailsController'
import { InteractionsController } from '../interactions/InteractionsController';
import { PostController } from './PostController';
import classes from './post.module.scss'

export const PostView = ({ postData, condensed, showReplies }) => {
    if (condensed) {
        return (
            <div className={classes.condensed}>
                <SimpleUserDetailsController condensed user={postData.author} time={postData.timestamp} />
                {postData.content}
                <div className={classes.condensedInteractions}>
                    <InteractionsController postData={postData} />
                </div>
            </div>
        )
    }

    return (
        <div className={classes.container}>
            <SimpleUserDetailsController user={postData.author} />
            <div className={classes.content}>
                <span>{new Date(postData.timestamp).toLocaleTimeString()}:</span>
                <span>{postData.content}</span>
            </div>
            <div className={classes.interactions}>
                <InteractionsController postData={postData} />
            </div>
            {showReplies && postData.children.map(reply => (
                <div key={reply.id} className={classes.reply}>
                    <PostController id={reply.id} isReply />
                </div> 
            ))}
        </div>
    )
}