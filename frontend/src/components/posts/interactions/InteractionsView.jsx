import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import MessageOutlineIcon from '@mui/icons-material/MessageOutlined'
import ShareIcon from '@mui/icons-material/Share'
import classes from './interactions.module.scss'

const InteractionsView = ({ postData, onLike, onComment, onShare }) => (
  <div className={classes.container}>
    <div className={classes.like} onClick={onLike}>
      <FavoriteBorderIcon />
      {postData.usersLiked}
    </div>
    <div onClick={onComment}>
      <MessageOutlineIcon />
      {postData.children.length}
    </div>
    <div className={classes.spacer} />
    <div onClick={onShare}>
      {postData.usersShared}
      <ShareIcon />
    </div>
  </div>
)

export default InteractionsView
