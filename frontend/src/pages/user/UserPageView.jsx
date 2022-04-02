/* eslint-disable no-nested-ternary */
import { List, ListItem } from '@mui/material'
import Button from '@mui/material/Button'
import classes from './userpage.module.scss'
import Footer from '../../components/layout/footer/FooterController'
import HeaderCustom from '../../components/layout/headercustom/HeaderCustomController'
import ProfileUserDetails from '../../components/user/profiledetails/ProfileUserDetailsController'
import Post from '../../components/posts/post/PostController'

const UserPageView = ({
  userData,
  userFeed,
  loggedIn,
  isFollower,
  handleChange,
}) => (
  <div className={classes.container}>
    <HeaderCustom title={userData.username} />
    <img
      className={classes.banner}
      alt="Profile Banner"
      src={userData.profileBanner ?? 'https://i.imgur.com/PcEvuMw.png'}
      style={{ 'object-fit': 'cover', width: ' 100%' }}
    />
    <div className={classes.pageContent}>
      <Button
        variant="contained"
        disableElevation
        className={classes.followButton}
        onClick={handleChange}
      >
        {loggedIn ? 'Settings' : isFollower ? 'Unfollow' : 'Follow'}
      </Button>

      <ProfileUserDetails user={userData} />

      <div className={classes.activity}>
        <h2>Activity</h2>
      </div>

      <div className={classes.posts}>
        <List>
          {userFeed?.map((post) => (
            <ListItem
              key={post.timestamp}
              sx={{ paddingLeft: 0, paddingRight: 0 }}
              divider
            >
              <Post id={post.postID} activity={post.activity} condensed />
            </ListItem>
          ))}
        </List>
      </div>
    </div>
    <Footer />
  </div>
)

export default UserPageView
