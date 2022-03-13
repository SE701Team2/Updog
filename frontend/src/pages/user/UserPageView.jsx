import classes from './userpage.module.scss'
import Footer from '../../components/layout/footer/FooterController'
import HeaderCustom from '../../components/layout/headercustom/HeaderCustomController'
import ProfileUserDetails from '../../components/user/profiledetails/ProfileUserDetailsController'

// eslint-disable-next-line no-unused-vars
const UserPageView = ({ userData }, { userFeed }) => (
    <div className={classes.container}>
        <HeaderCustom />
        <img
            className={classes.banner}
            alt="Profile Banner"
            src={userData.profileBanner}
        />
        <div className={classes.pageContent}>
            <ProfileUserDetails user={userData} />
        </div>
        <Footer />
    </div>
)

export default UserPageView
