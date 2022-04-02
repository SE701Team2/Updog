/* eslint-disable react/no-danger */
import { Link } from 'react-router-dom'
import SimpleUserDetails from '../../user/simpledetails/SimpleUserDetailsController'
import Interactions from '../interactions/InteractionsController'
// eslint-disable-next-line import/no-cycle
import Post from './PostController'
import processMentions from '../../../functions/mentions'
import classes from './post.module.scss'

const PostView = ({
  activityText,
  postData,
  condensed,
  showReplies,
  tags,
  handles,
  parentPost,
}) => {
  if (condensed) {
    return (
      <div className={classes.condensed}>
        {activityText && (
          <div className={classes.activity}>
            {postData.parent ? (
              <a href={`/post/${postData.parent}`}>{activityText}</a>
            ) : (
              <span>{activityText}</span>
            )}
          </div>
        )}
        <SimpleUserDetails
          condensed
          user={postData.author}
          time={postData.timestamp}
        />
        <Link className={classes.postLink} to={`/post/${postData.id}`}>
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
      {parentPost && (
        <a href={`/post/${postData.parent}`} className={classes.head}>
          commented on{' '}
          <span className={classes.link}>
            @{parentPost.author.username}&apos;s post
          </span>
        </a>
      )}
      <SimpleUserDetails user={postData.author} />
      <div className={classes.content}>
        <span className={classes.date}>
          {new Date(postData.timestamp).toLocaleTimeString()}:
        </span>
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
