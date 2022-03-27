/* eslint-disable react/no-danger */
import { Link } from 'react-router-dom'
import SimpleUserDetails from '../../user/simpledetails/SimpleUserDetailsController'
import Interactions from '../interactions/InteractionsController'
// eslint-disable-next-line import/no-cycle
import Post from './PostController'
import processMentions from '../../../functions/mentions'
import classes from './post.module.scss'

const PostView = ({
  activity,
  postData,
  condensed,
  showReplies,
  tags,
  handles,
}) => {
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
          <div
            dangerouslySetInnerHTML={{
              __html: processMentions({
                content: postData.content ?? '',
                tags,
                handles,
                tagStyle: classes.tagStyle,
                handleStyle: classes.handleStyle,
              }),
            }}
          />
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
        <span>{new Date(postData.timestamp).toLocaleTimeString()}:</span>
        <div
          dangerouslySetInnerHTML={{
            __html: processMentions({
              content: postData.content ?? '',
              tags,
              handles,
              tagStyle: classes.tagStyle,
              handleStyle: classes.handleStyle,
            }),
          }}
        />
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
