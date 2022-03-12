import { List, ListItem, Tabs, Tab } from '@mui/material'

import classes from './followspage.module.scss'
import Footer from '../../components/layout/footer/FooterController'
import Header from '../../components/layout/header/HeaderController'
import SimpleUserDetails from '../../components/user/simpledetails/SimpleUserDetailsController'

const FollowsPageView = ({ followsData, tab, handleChange }) => (
    <div className={classes.container}>
        <Header />

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
