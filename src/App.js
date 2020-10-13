import React, { useState, useReducer, useEffect} from 'react';
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
import { Button, CircularProgress } from '@material-ui/core';
import LanguageSwitcher from './components/LanguageSwitcher';
import { useTranslation } from 'react-i18next';
import moment from "moment"
import czflag from "./img/cz-flag.png"
import ukflag from "./img/uk-flag.png"
import "moment/locale/cs"
import "moment/locale/en-gb"

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
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [cookies, , removeCookie] = useCookies()
    const [userMenuAnchorEl, setUserMenuAnchorEl] = useState(null)
    const [langMenuAnchorEl, setLangmenuAnchorEl] = useState(null)
    const [hasBeenLoggedOut, setHasBeenLoggedOut] = useState(false)
    const {i18n} = useTranslation()

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

    useEffect(() =>{
        i18n.languages[0] === "cs"?
        moment.locale("cs") :
        moment.locale("en-gb")
    }, [i18n.languages])


    return (
        <div className={classes.root}>
                <CookiesProvider>
                    <AppContext.Provider value={{
                        exercises,
                        exercisesDispatch,
                        records,
                        recordsDispatch,
                        user,
                        setUser,
                        hasBeenLoggedOut,
                        setHasBeenLoggedOut
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
                                        (isDrawerOpen || !user) && classes.menuButtonHidden,
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

                                    <Button
                                        onClick={(e) => setLangmenuAnchorEl(e.currentTarget)}
                                    >
                                        {
                                            i18n.languages[0] === "cs" ?
                                            <img 
                                                src={czflag}
                                                alt=""
                                            /> :
                                            <img 
                                                src={ukflag}
                                                alt=""
                                            />
                                        }
                                    </Button>
                                <UserMenu
                                    anchorEl={userMenuAnchorEl}
                                    handleClose={() => setUserMenuAnchorEl(null)}
                                    setUser={setUser}
                                />
                                <LanguageSwitcher
                                    anchorEl={langMenuAnchorEl}
                                    handleClose={() => setLangmenuAnchorEl(null)}
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
    )
}

export default App