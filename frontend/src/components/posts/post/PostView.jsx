import { Link } from 'react-router-dom'
import SimpleUserDetails from '../../user/simpledetails/SimpleUserDetailsController'
import Interactions from '../interactions/InteractionsController'
// eslint-disable-next-line import/no-cycle
import Post from './PostController'
import classes from './post.module.scss'

const PostView = ({ activity, postData, condensed, showReplies }) => {
    if (condensed) {
        return (
            <div className={classes.condensed}>
                {activity !== 'POSTED' && (
                    <div className={classes.activity}>
                        <span>{activity}</span>
                    </div>
                )}
                <SimpleUserDetails
                    condensed
                    user={postData.author}
                    time={postData.timestamp}
                />
                <Link className={classes.link} to={`/post/${postData.id}`}>
                    {postData.content}
                </Link>
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
                <span>
                    {new Date(postData.timestamp).toLocaleTimeString()}:
                </span>
                <span>{postData.content}</span>
            </div>
            <div className={classes.interactions}>
                <Interactions postData={postData} />
            </div>
            {showReplies &&
                postData.children.map((id) => (
                    <div key={id} className={classes.reply}>
                        <Post id={id} condensed />
                    </div>
                ))}
        </div>
    )
}

export default PostView
