import classes from './footer.module.scss'
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { StyledEngineProvider } from '@mui/material';
import { Link } from 'react-router-dom';
import { Badge } from '@mui/material';
const FooterView = () => (
    <div className={classes.container}>
        <StyledEngineProvider injectFirst>
            <BottomNavigation
                showLabels
                value={"home"}
                className={classes.nav} >
                <BottomNavigationAction className={classes.navIcon} value="home" label="Home" icon={<HomeIcon />} component={Link} to="/" />
                <BottomNavigationAction className={classes.navIcon} value="search" label="Search" icon={<SearchIcon />} component={Link} to="/search" />
                <BottomNavigationAction className={classes.navIcon} value="notifications" label="Notifications" icon={<Badge badgeContent={1} color="error" max={10} overlap="circular"><NotificationsIcon /></Badge>} component={Link} to="/notifications" />
            </BottomNavigation>
        </StyledEngineProvider>

    </div>
)

export default FooterView
