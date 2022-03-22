import classes from './postpage.module.scss'
import Footer from '../../components/layout/footer/FooterController'
import HeaderCustom from '../../components/layout/headercustom/HeaderCustomController'
import Post from '../../components/posts/post/PostController'

const PostPageView = ({ postData }) => (
  <div className={classes.container}>
    <HeaderCustom title="Post" />
    <div className={classes.pageContent}>
      <Post data={postData} showReplies />
    </div>
    <Footer />
  </div>
)

export default PostPageView
