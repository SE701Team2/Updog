import classes from './postpage.module.scss'
import Footer from '../../components/layout/footer/FooterController'
import Header from '../../components/layout/header/HeaderController'
import Post  from '../../components/posts/post/PostController'

const PostPageView = ({ id }) => (
    <div className={classes.container}>
        <Header />
        <div className={classes.pageContent} >
            <Post id={id} showReplies />  
        </div>
        <Footer />
    </div>
)

export default PostPageView
