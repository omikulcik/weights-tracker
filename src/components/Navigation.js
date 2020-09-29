import React from "react"
import { List, ListItem, ListItemIcon, ListItemText, Drawer, Divider, IconButton } from "@material-ui/core"
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import DashboardIcon from '@material-ui/icons/Dashboard';
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import clsx from 'clsx';


const Navigation = ({ isDrawerOpen, setIsDrawerOpen }) => {

    const drawerWidth = 240;

    const useStyles = makeStyles((theme) => ({
        menuButton: {
            marginRight: 36,
        },
        menuButtonHidden: {
            display: 'none',
        },
        drawerPaper: {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        drawerPaperClose: {
            overflowX: 'hidden',
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            width: theme.spacing(7),
            [theme.breakpoints.up('sm')]: {
                width: theme.spacing(9),
            },
            zIndex: theme.zIndex.drawer - 1,
        },
        paper: {
            padding: theme.spacing(2),
            display: 'flex',
            overflow: 'auto',
            flexDirection: 'column',
        },
        toolbarIcon: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: '0 8px',
            ...theme.mixins.toolbar,
        },
    }));

    const classes = useStyles()


    return (
        <Drawer
            variant="permanent"
            classes={{
                paper: clsx(classes.drawerPaper, !isDrawerOpen && classes.drawerPaperClose),
            }}
            open={isDrawerOpen}
        >
            <div className={classes.toolbarIcon}>
                <IconButton onClick={() => setIsDrawerOpen(false)}>
                    <ChevronLeftIcon />
                </IconButton>
            </div>
            <Divider />
            <List>
                <Link to="/">
                    <ListItem button>
                        <ListItemIcon>
                            <DashboardIcon />
                        </ListItemIcon>
                        <ListItemText>
                            Dashboard
                </ListItemText>
                    </ListItem>
                </Link>
                <Link to="/exercises">
                    <ListItem button>
                        <ListItemIcon>
                            <FitnessCenterIcon />
                        </ListItemIcon>
                        <ListItemText>
                            Exercises
                </ListItemText>
                    </ListItem>
                </Link>
            </List>
        </Drawer>

    )
}

export default Navigation