import { List, ListItem } from '@mui/material'
import Button from '@mui/material/Button'
import classes from './userpage.module.scss'
import Footer from '../../components/layout/footer/FooterController'
import HeaderCustom from '../../components/layout/headercustom/HeaderCustomController'
import ProfileUserDetails from '../../components/user/profiledetails/ProfileUserDetailsController'
import Post from '../../components/posts/post/PostController'

// eslint-disable-next-line no-unused-vars
const UserPageView = ({
    userData,
    userFeed,
    loggedIn,
    buttonText,
    handleChange,
}) => (
    <div className={classes.container}>
        <HeaderCustom title={userData.username} />
        <img
            className={classes.banner}
            alt="Profile Banner"
            src={userData.profileBanner}
        />
        <div className={classes.pageContent}>
            <Button
                variant="contained"
                disableElevation
                className={classes.followButton}
                onClick={handleChange}
            >
                {buttonText ? 'UnFollow' : 'Follow'}
            </Button>
            <ProfileUserDetails user={userData} />
            &nbsp;
            <hr />
            <h1>Posts</h1>
            <List>
                {userFeed?.map((post) => (
                    <ListItem key={post.id} divider>
                        <Post data={post} condensed />
                    </ListItem>
                ))}
            </List>
        </div>
        <Footer />
    </div>
)

export default UserPageView
