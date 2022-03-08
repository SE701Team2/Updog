import { SimpleUserDetailsController } from '../../user/simpledetails/SimpleUserDetailsController'
import { InteractionsController } from '../interactions/InteractionsController';
import { PostController } from './PostController';
import classes from './post.module.scss'

export const PostView = ({ post, condensed, showReplies }) => {
    if (condensed) {
        return (
            <div className={classes.condensed}>
                <SimpleUserDetailsController condensed user={post.author} time={post.timestamp} />
                {post.content}
                <div className={classes.condensedInteractions}>
                    <InteractionsController post={post} />
                </div>
            </div>
        )
    }

    return (
        <div className={classes.container}>
            <SimpleUserDetailsController user={post.author} />
            <div className={classes.content}>
                <span>{new Date(post.timestamp).toLocaleTimeString()}:</span>
                <span>{post.content}</span>
            </div>
            <div className={classes.interactions}>
                <InteractionsController post={post} />
            </div>
            {showReplies && post.children.map(reply => (
                <div key={reply.id} className={classes.reply}>
                    <PostController post={reply} condensed />
                </div> 
            ))}
        </div>
    )
}