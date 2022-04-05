import IconButton from '@mui/material/IconButton'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import Grid from '@mui/material/Grid'
import SearchBar from '../../components/search/searchbar/SearchBarController'
import Footer from '../../components/layout/footer/FooterController'
import NavigationBar from '../../components/layout/navigation/NavigationBar'
import LoadingView from '../loading/LoadingView'
import Post from '../../components/posts/post/PostController'
import SearchUserDetails from '../../components/user/searchdetails/SearchUserDetailsController'
import classes from './searchpage.module.scss'
import { FeedCard } from '../dashboard/DashboardPageView'

const SearchPageView = ({
  handleSearch,
  loading,
  goToPrevPage,
  data,
  typePeople,
  err,
  follow,
  checkFollow,
}) => (
  <div className={classes.container}>
    <Grid
      container
      spacing={1}
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{
        p: 2,
      }}
    >
      <Grid item xs={1}>
        <IconButton onClick={goToPrevPage}>
          <ArrowBackIcon />
        </IconButton>
      </Grid>
      <Grid item xs={11}>
        <SearchBar initialText="" handleSubmit={handleSearch} />
      </Grid>
    </Grid>
    <NavigationBar selections={['Top', 'Latest', 'People']} />
    {loading && (
      <div className={classes.loading}>
        <LoadingView />
      </div>
    )}
    <div className={classes.pageContent}>
      {!typePeople &&
        !loading &&
        data?.map((post) =>
          post.content ? (
            <FeedCard key={post.id}>
              <Post data={post} condensed />
            </FeedCard>
          ) : null
        )}
      {typePeople &&
        !loading &&
        data?.map((people) => (
          <FeedCard key={people.id}>
            <SearchUserDetails
              key={people.id}
              user={people}
              isFollowing={checkFollow(people.username)}
              handleFollow={() => follow(people.username)}
            />
          </FeedCard>
        ))}
      <p className={classes.centerText}>
        {data && data.length === 0 && <p>No Results</p>}
        {err}
      </p>
    </div>

    <Footer />
  </div>
)

export default SearchPageView
