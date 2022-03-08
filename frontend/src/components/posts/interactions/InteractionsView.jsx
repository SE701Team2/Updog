import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CommentIcon from '@mui/icons-material/Comment';
import ShareIcon from '@mui/icons-material/Share';
import classes from './interactions.module.scss'

export const InteractionsView = ({ postData, onLike, onComment, onShare }) => {
    return (
        <div className={classes.container}>
            <div onClick={onLike}>
                {postData.usersLiked}
                <FavoriteBorderIcon />
            </div>
            <div onClick={onComment}>
                {postData.children.length}
                <CommentIcon />
            </div>
            <div onClick={onShare}>
                {postData.usersShared}
                <ShareIcon />
            </div>
        </div>
    )
}