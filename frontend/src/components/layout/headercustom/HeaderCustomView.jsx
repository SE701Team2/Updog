import { AppBar, Toolbar, IconButton, Typography } from '@mui/material'

import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import classes from './headercustom.module.scss'

const HeaderView = ({ pageName, goToPrevPage, childComponents }) => (
    <div className={classes.container}>
        <AppBar position="static">
            <Toolbar variant="dense" className={classes.headerCustom}>
                <div className={classes.headerLeft}>
                    <IconButton
                        className={classes.headerIcon}
                        onClick={goToPrevPage}
                        edge="start"
                    >
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        className={classes.headerText}
                    >
                        {pageName}
                    </Typography>
                </div>
                {childComponents}
            </Toolbar>
        </AppBar>
    </div>
)

export default HeaderView
