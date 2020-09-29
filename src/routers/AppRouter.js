import React from "react"
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Excercises from '../pages/Exercises';
import Excercise from '../pages/Exercise';
import PrivateRoute from "./PrivateRoute";
import Login from "../pages/Login";
import Navigation from "../components/Navigation";
import { makeStyles } from "@material-ui/core/styles";
import Container from '@material-ui/core/Container';

const AppRouter = (props) => {

    const useStyles = makeStyles((theme) => ({
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
        appBarSpacer: theme.mixins.toolbar,
    }))

    const classes = useStyles()

    return (
        <BrowserRouter>
            {props.user &&
                <Navigation
                    isDrawerOpen={props.isDrawerOpen}
                    setIsDrawerOpen={props.setIsDrawerOpen}
                />}
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <Switch>
                        <PrivateRoute exact path="/">
                            <Dashboard />
                        </PrivateRoute>
                        <PrivateRoute exact path="/exercises">
                            <Excercises />
                        </PrivateRoute>
                        <PrivateRoute exact path="/exercise/:id">
                            <Excercise />
                        </PrivateRoute>
                        <Route exact path="/login">
                            <Login />
                        </Route>
                    </Switch>
                </Container>
            </main>
        </BrowserRouter>
    )
}

export default AppRouter