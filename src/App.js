import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Excercises from './pages/Exercises';
import Excercise from './pages/Exercise';
import Navigation from './components/Navigation';



const App = () => {
    const drawerWidth = 240;

    const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
        },
        toolbar: {
            paddingRight: 24,
        },
        toolbarIcon: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: '0 8px',
            ...theme.mixins.toolbar,
        },
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
        },
        appBarShift: {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        menuButton: {
            marginRight: 36,
        },
        menuButtonHidden: {
            display: 'none',
        },
        title: {
            flexGrow: 1,
            textAlign: "center",
            fontWeight: "bold",
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
        },
        appBarSpacer: theme.mixins.toolbar,
        content: {
            backgroundColor:
                theme.palette.type === 'light'
                    ? theme.palette.grey[100]
                    : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
        },
        container: {
            paddingTop: theme.spacing(4),
            paddingBottom: theme.spacing(4),
        },
        paper: {
            padding: theme.spacing(2),
            display: 'flex',
            overflow: 'auto',
            flexDirection: 'column',
        },
        fixedHeight: {
            height: 240,
        },
    }));
    const classes = useStyles();
    const [isDrawerOpen, setIsDrawerOpen] = useState(true);
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    return (
        <div className={classes.root}>
            <BrowserRouter>
                <AppBar
                    position="absolute"
                    className={clsx(classes.appBar, isDrawerOpen && classes.appBarShift)}
                >
                    <Toolbar className={classes.toolbar}>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={() => setIsDrawerOpen(true)}
                            className={clsx(
                                classes.menuButton,
                                isDrawerOpen && classes.menuButtonHidden,
                            )}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            component="h1"
                            variant="h5"
                            color="inherit"
                            noWrap
                            className={classes.title}
                        >
                            Weights Tracker
          </Typography>
                    </Toolbar>
                </AppBar>
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
                    <Navigation />
                </Drawer>
                <main className={classes.content}>
                    <div className={classes.appBarSpacer} />
                    <Container maxWidth="lg" className={classes.container}>

                        <Switch>
                            <Route exact path="/">
                                <Dashboard />
                            </Route>
                            <Route exact path="/exercises">
                                <Excercises />
                            </Route>
                            <Route exact path="/exercise/:id">
                                <Excercise />
                            </Route>
                        </Switch>
                    </Container>
                </main>
            </BrowserRouter>
        </div>
    );
}

export default App