import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import MessageOutlineIcon from '@mui/icons-material/MessageOutlined'
import ShareIcon from '@mui/icons-material/Share'
import classes from './interactions.module.scss'

const InteractionsView = ({
  postData,
  onLike,
  onComment,
  onShare,
  usersLiked,
  usersShared,
  hasShared,
  hasLiked,
}) => (
  <div className={classes.container}>
    <div
      className={classes.like}
      onClick={onLike}
      data-testid="like-btn"
      style={{ color: hasLiked ? 'black' : 'grey' }}
    >
      <FavoriteBorderIcon />
      {usersLiked}
    </div>
    <div onClick={onComment}>
      <MessageOutlineIcon />
      {postData.children.length}
    </div>
    <div className={classes.spacer} />
    <div
      onClick={onShare}
      data-testid="share-btn"
      style={{ color: hasShared ? 'black' : 'grey' }}
    >
      {usersShared}
      <ShareIcon />
    </div>
  </div>
)

export default InteractionsView
