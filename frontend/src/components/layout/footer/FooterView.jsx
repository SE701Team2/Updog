import classes from './footer.module.scss'
import { BottomNavigation } from '@mui/material';
import { BottomNavigationAction } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
const FooterView = () => (
    <div className={classes.container}>
        <BottomNavigation
            showLabels
            // value={value}
            // onChange={(event, newValue) => {
            //     setValue(newValue);
            // }}
            className='BottomNavigation'
        >
            <BottomNavigationAction label="Home" icon={<HomeIcon />} />
            <BottomNavigationAction label="Search" icon={<SearchIcon />} />
            <BottomNavigationAction label="Notifications" icon={<NotificationsIcon />} />
        </BottomNavigation>
    </div>
)

export default FooterView
