import { Card, Fab, styled } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

import HeaderCustom from '../../components/layout/headercustom/HeaderCustomController'
import Footer from '../../components/layout/footer/FooterController'
import Post from '../../components/posts/post/PostController'

/**
 * Card container for each feed post
 */
const FeedCard = styled(Card)({
    width: '90%',
    margin: 'auto',
    marginTop: '10px',
    marginBottom: '10px',
    padding: '0 10px 0 10px',
})

const FloatingAddButton = styled(Fab)({
    position: 'absolute',
    bottom: '8%',
    right: 10,
})

const DashboardPageView = ({ feedData }) => (
    <div>
        <HeaderCustom title="Feed" />
        {feedData.map((post) => (
            <FeedCard>
                <Post data={post} condensed />
            </FeedCard>
        ))}

        {/* Will need to link AddButton to post composer when completed */}
        <FloatingAddButton color="primary">
            <AddIcon />
        </FloatingAddButton>
        <Footer />
    </div>
)

export default DashboardPageView
