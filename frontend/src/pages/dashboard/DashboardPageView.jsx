import { Card, styled } from '@mui/material'

import classes from './dashboardpage.module.scss'
import HeaderCustom from '../../components/layout/headercustom/HeaderCustomController'
import Footer from '../../components/layout/footer/FooterController'
import Post from '../../components/posts/post/PostController'

/**
 * Card container for each feed post
 */
const FeedCard = styled(Card)({
    width: '90%',
    margin: 'auto',
    marginTop: '5px',
    marginBottom: '10px',
    padding: '0 10px 0 10px',
})

const DashboardPageView = ({ feedData }) => (
    <div>
        <HeaderCustom title="Feed" />
        <div className={classes.feedCard}>
            {feedData.map((post) => (
                <FeedCard classes={classes}>
                    <Post data={post} condensed />
                </FeedCard>
            ))}
        </div>
        <Footer />
    </div>
)

export default DashboardPageView
