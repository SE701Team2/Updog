import classes from './header.module.scss'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';

const HeaderView = ({goToFeed, goToProfile}) => (
    <div className={classes.container}>
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        color="inherit"
                        sx={{ mr: 2 }}
                        onClick={goToFeed}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Updog
                    </Typography>
                    <Tooltip title="Open Profile">
                        <IconButton onClick={goToProfile}>
                            <Avatar alt="Barrack Obama" src="https://i.imgur.com/PiJAoqO.jpeg" />
                        </IconButton>
                    </Tooltip>
                </Toolbar>
            </ AppBar>
        </Box>
    </div>
)

export default HeaderView

