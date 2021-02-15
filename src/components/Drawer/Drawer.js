import React from 'react';

import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import useStyles from '../../containers/MainStyles';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import SearchIcon from '@material-ui/icons/Search';
import { withRouter } from "react-router-dom";

const MenuDrawer = (props) => {
    const placeHolderAvatar = "https://starrgate.s3.amazonaws.com/users/133ae153256e1907b04cf99410882cb91f52a9bd/profile_d0JcEzw.jpg";
    const { history } = props;
    const classes = useStyles();
    const imageStyles = {
        marginRight: 15,
        marginLeft: 15
    }
    const toolbarStyles = {
        display: 'flex', 
        justifyContent: 'left', 
        alignItems: 'center'
    }

    const itemsList = [
        {
            text: "Opportunities",
            icon: <SearchIcon />,
            route: "/opportunities",
        },
        {
            text: "People",
            icon: <SupervisedUserCircleIcon />,
            route: "/people",
        },
        {
            text: "Profile",
            icon: <AccountCircleIcon />,
            route: "/profiles/jctorresmorales90",
        }
    ];

    return (
        <div>
            <div style={toolbarStyles} className={classes.toolbar}>
                <Avatar alt="U" src={placeHolderAvatar} style={imageStyles} />
                <Typography variant="h6" noWrap>
                    Julio Torres
                </Typography>
            </ div>
            <Divider />
            <List>
                {itemsList.map((item, index) => {
                    const { text, icon, route } = item;
                    return (
                        <ListItem button key={text} onClick={() => {
                            history.push(route);
                            props.titleState(text);
                            if (props.isMobile) {
                                props.drawerToggle();
                            }
                        }}>
                            {icon && <ListItemIcon>{icon}</ListItemIcon>}
                            <ListItemText primary={text} />
                        </ListItem>
                    );
                })}
            </List>
            <Divider />
        </div>
    )
};

export default withRouter(MenuDrawer);