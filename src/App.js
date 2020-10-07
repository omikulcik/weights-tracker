import React, { useState, useReducer } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AppContext from './contexts/AppContext';
import exercisesReducer from "./reducers/exercisesReducer"
import recordsReducer from './reducers/recordsReducer';
import AppRouter from './routers/AppRouter';
import { CookiesProvider, useCookies } from 'react-cookie';
import { authStatus } from './actions/userActions';
import useRequest from '@ahooksjs/use-request';
import PersonIcon from '@material-ui/icons/Person';
import UserMenu from './components/UserMenu';
import { CircularProgress } from '@material-ui/core';


const App = () => {
    const drawerWidth = 240;

    const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
        },
        toolbar: {
            paddingRight: 24,
        },
        appBar: {
            zIndex: theme.zIndex.drawer,
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
        spinner: {
            marginTop: "10%",
            marginLeft: "calc(50% - 40px)"
        }
    }));


    const classes = useStyles()
    const [exercises, exercisesDispatch] = useReducer(exercisesReducer, [])
    const [records, recordsDispatch] = useReducer(recordsReducer, [])
    const [user, setUser] = useState(null)
    const [isDrawerOpen, setIsDrawerOpen] = useState(true);
    const [cookies, , removeCookie] = useCookies()
    const [userMenuAnchorEl, setUserMenuAnchorEl] = useState(null)

    const handleCloseUserMenu = () => {
        setUserMenuAnchorEl(null)
    }

    const { loading: isGettingStatus } = useRequest(authStatus, {
        defaultParams: {
            token: cookies.token
        },
        onSuccess: (res) => {
            setUser(res.data)
        },
        onError: () => {
            removeCookie("token")
            setUser(null)
        }
    })

    return (
        <div className={classes.root}>
            <CookiesProvider>
                <AppContext.Provider value={{
                    exercises,
                    exercisesDispatch,
                    records,
                    recordsDispatch,
                    user,
                    setUser
                }} >
                    <AppBar
                        position="absolute"
                        className={clsx(classes.appBar, user && !isGettingStatus && isDrawerOpen && classes.appBarShift)}
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
                            {
                                user &&
                                <IconButton
                                    edge="end"
                                    color="inherit"
                                    onClick={(e) => setUserMenuAnchorEl(e.currentTarget)}
                                >
                                    <PersonIcon />
                                </IconButton>}
                            <UserMenu
                                anchorEl={userMenuAnchorEl}
                                handleClose={handleCloseUserMenu}
                                setUser={setUser}
                            />
                        </Toolbar>
                    </AppBar>
                    {
                        isGettingStatus ?
                            <CircularProgress
                                className={classes.spinner}
                            />
                            :
                            <AppRouter
                                isDrawerOpen={isDrawerOpen}
                                setIsDrawerOpen={setIsDrawerOpen}
                                user={user}
                            />}
                </AppContext.Provider >
            </CookiesProvider>
        </div>
    );
}

export default App