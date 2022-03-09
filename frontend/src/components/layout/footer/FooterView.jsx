import classes from './footer.module.scss'
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
const FooterView = () => (
    <div className={classes.container}>
        <div className={classes.section}>
            <div className={classes.icon}><HomeIcon sx={{ fontSize: 40 }}/></div>
            <span>Home</span>
        </div>
        <div div className={classes.section}>
            <div className={classes.icon}><SearchIcon sx={{ fontSize: 40 }}/></div>
            
            <span>Search</span>
        </div>
        <div div className={classes.section}>
            <div className={classes.icon}><NotificationsIcon sx={{ fontSize: 40 }}/></div>
            <span>Notifications</span>
        </div>
    </div>
)

export default FooterView
