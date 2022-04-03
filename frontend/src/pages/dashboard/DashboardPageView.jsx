import { Card, Fab, styled } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { Link } from 'react-router-dom'

// import HeaderCustom from '../../components/layout/headercustom/HeaderCustomController'
import Header from '../../components/layout/header/HeaderController'
import Footer from '../../components/layout/footer/FooterController'
import Post from '../../components/posts/post/PostController'
import classes from './dashboardpage.module.scss'
import PostComposerController from '../postComposer/PostComposerController'
import SearchBarController from '../../components/search/searchbar/SearchBarController'
/**
 * Card container for each feed post
 */
export const FeedCard = styled(Card)({
  width: '85%',
  margin: 'auto',
  marginTop: '20px',
  marginBottom: '10px',
  padding: '20px',
})

const FloatingAddButton = styled(Fab)({
  position: 'absolute',
  bottom: '8%',
  right: 10,
})

const DashboardPageView = ({ feedData, mobile }) => (
  <>
    <div className={classes.leftPanel}>
      <h1>
        <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>
          Home
        </Link>
      </h1>
      <h1>
        <Link
          to="/notifications"
          style={{ textDecoration: 'none', color: 'black' }}
        >
          Notifications
        </Link>
      </h1>
    </div>
    <div className={classes.container}>
      {mobile ? (
        <Header />
      ) : (
        <>
          <h1>Home</h1>
          <PostComposerController embedded />
        </>
      )}
      <div className={classes.pageContent}>
        {feedData.map((data) => (
          <FeedCard key={data.timestamp}>
            <Post data={data.post} condensed />
          </FeedCard>
        ))}
      </div>
      {/* Will need to link AddButton to post composer when completed */}
      {mobile ? (
        <>
          <Link to="/new-post">
            <FloatingAddButton color="primary">
              <AddIcon id="icon" />
            </FloatingAddButton>
          </Link>
          <Footer />
        </>
      ) : null}
    </div>
    <div className={classes.rightPanel}>
      <SearchBarController />
    </div>
  </>
)

export default DashboardPageView
