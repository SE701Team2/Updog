import { List, ListItem, Tabs, Tab } from '@mui/material'

import classes from './followspage.module.scss'
import Footer from '../../components/layout/footer/FooterController'
import SimpleUserDetails from '../../components/user/simpledetails/SimpleUserDetailsController'
import HeaderCustom from '../../components/layout/headercustom/HeaderCustomController'

const FollowsPageView = ({ followsData, tab, handleChange }) => (
    <div className={classes.container}>
        <HeaderCustom title="Follows" />

        <Tabs value={tab} onChange={handleChange} variant="fullWidth">
            <Tab label="Followers" />
            <Tab label="Follows" />
        </Tabs>
        <div className={classes.pageContent}>
            <List>
                {followsData.map((follower) => (
                    <ListItem key={follower.id} divider>
                        <SimpleUserDetails user={follower} />
                    </ListItem>
                ))}
            </List>
        </div>
        <Footer />
    </div>
)

export default FollowsPageView
