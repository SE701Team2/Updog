import classes from './followspage.module.scss'
import Footer from '../../components/layout/footer/FooterController'
import Header from '../../components/layout/header/HeaderController'
import SimpleUserDetails from '../../components/user/simpledetails/SimpleUserDetailsController'


const FollowsPageView = ({ followsData }) => (
    <div className={classes.container}>
        <Header />
        <div className={classes.pageContent} >
            {/* <Post data={postData} showReplies />   */}
            <SimpleUserDetails user={followsData[0]} />
        </div>
        <Footer />
    </div>
)

export default FollowsPageView
