import React, { useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { useTheme } from '@material-ui/core/styles';
import useStyles from './MainStyles';
import MenuDrawer from '../components/Drawer/Drawer';
import { Route, Switch, Redirect } from 'react-router-dom';
import Opportunity from '../components/Opportunity/Opportunity';
import Opportunities from '../components/Opportunity/Opportunities'
import People from '../components/People/People';
import Profile from '../components/Profile/Profile';

const Main = (props) => {
    const { window } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [pageTitle, setPageTile] = useState("People");
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleTitleChange = (title) => {
        setPageTile(title);
    }

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        {pageTitle}
                    </Typography>
                </Toolbar>
            </AppBar>
            <nav className={classes.drawer} aria-label="mailbox folders">
                <Hidden smUp implementation="css">
                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true,
                        }}
                    >
                        <MenuDrawer titleState={handleTitleChange} drawerToggle={handleDrawerToggle} isMobile={true} />
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open
                    >
                        <MenuDrawer titleState={handleTitleChange} />
                    </Drawer>
                </Hidden>
            </nav>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Redirect from="/" to="/people" />
                <Switch>
                    <Route exact path="/opportunities" render={props => <Opportunities {...props} />} />
                    <Route exact path="/opportunities/:id" render={props => <Opportunity {...props} />} />
                    <Route exact path="/people" render={props => <People {...props} />} />
                    <Route exact path="/profiles/:id" render={props => <Profile {...props} />} />
                </Switch>
            </main>
        </div>
    );
}


export default Main;
