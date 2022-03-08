import classes from './postpage.module.scss'
import { FooterController } from '../../components/layout/footer/FooterController'
import { HeaderController } from '../../components/layout/header/HeaderController'
import { PostController } from '../../components/posts/post/PostController'

export const PostPageView = ({ id }) => {
    return (
        <div className={classes.container}>
            <HeaderController />
            <div className={classes.pageContent} >
                <PostController id={id} showReplies />  
            </div>
            <FooterController />
        </div>
    )
}