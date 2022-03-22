import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import logo from '../../../images/logo.png'
import classes from './header.module.scss'

const HeaderView = ({ user, goToFeed, goToProfile }) => (
  <div className={classes.container}>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton onClick={goToFeed} sx={{ mr: 2 }}>
            <img alt="logo" className={classes.photo} src={logo} />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Updog
          </Typography>
          <IconButton onClick={goToProfile}>
            <Avatar alt={user.username} src={user.profilePic} />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  </div>
)

export default HeaderView
