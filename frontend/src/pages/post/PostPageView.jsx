import classes from './postpage.module.scss'
import { FooterController } from '../../components/layout/footer/FooterController'
import { HeaderController } from '../../components/layout/header/HeaderController'
import { PostController } from '../../components/posts/post/PostController'

export const PostPageView = ({ post }) => {
    return (
        <div className={classes.container}>
            <HeaderController />
            <div className={classes.pageContent} >
                <PostController post={post} showReplies />  
            </div>
            <FooterController />
        </div>
    )
}