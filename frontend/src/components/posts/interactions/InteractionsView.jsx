import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CommentIcon from '@mui/icons-material/Comment';
import ShareIcon from '@mui/icons-material/Share';
import classes from './interactions.module.scss'

export const InteractionsView = ({ post, onLike, onComment, onShare }) => {
    return (
        <div className={classes.container}>
            <div onClick={onLike}>
                {post.usersLiked}
                <FavoriteBorderIcon />
            </div>
            <div onClick={onComment}>
                {post.children.length}
                <CommentIcon />
            </div>
            <div onClick={onShare}>
                {post.usersShared}
                <ShareIcon />
            </div>
        </div>
    )
}