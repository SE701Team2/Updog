import classes from './userpage.module.scss'
import Footer from '../../components/layout/footer/FooterController'
import Header from '../../components/layout/header/HeaderController'
import ProfileUserDetails from '../../components/user/profiledetails/ProfileUserDetailsController'

// eslint-disable-next-line no-unused-vars
const UserPageView = ({ userData }, { userFeed }) => (
    <div className={classes.container}>
        <Header />
        <div className={classes.pageContent}>
            <ProfileUserDetails user={userData} />
        </div>
        <Footer />
    </div>
)

export default UserPageView
