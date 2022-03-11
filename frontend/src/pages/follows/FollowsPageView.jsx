import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import classes from './followspage.module.scss'
import Footer from '../../components/layout/footer/FooterController'
import Header from '../../components/layout/header/HeaderController'
import SimpleUserDetails from '../../components/user/simpledetails/SimpleUserDetailsController'



const FollowsPageView = ({ followsData }) => (
    <div className={classes.container}>
        <Header />
        <div className={classes.pageContent} >
            <List>
                {followsData.map((follower) => 
                <ListItem key={follower.id}>
                    <SimpleUserDetails user={follower} />
                </ListItem>
                )}
            </List>

            
        </div>
        <Footer />
    </div>
)

export default FollowsPageView
