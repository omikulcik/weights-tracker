import useRequest from "@ahooksjs/use-request"
import { Grid, makeStyles, Paper, Typography, CircularProgress } from "@material-ui/core"
import { Alert } from "@material-ui/lab"
import React, { useContext, useEffect, useState } from "react"
import { useCookies } from "react-cookie"
import CountUp from "react-countup"
import { getDashboardData } from "../actions/dashBoardActions"
import AppContext from "../contexts/AppContext"
import useAutomaticLogoutCheck from "../utils/useAutomaticLogoutCheck"



const Dashboard = () => {
    const useStyles = makeStyles((theme) => ({
        dashDataCol: {
            textAlign: "center"
        },
        spinner: {
            margin: "2rem auto",
            display: "block"
        },
        paper: {
            paddingTop: "3rem",
            paddingBottom: "3rem"
        },
        heading: {
            marginBottom: "2rem"
        }
    }))
    const classes = useStyles()
    const { setHasBeenLoggedOut } = useContext(AppContext)
    const [cookies] = useCookies()
    const checkAutoLogout = useAutomaticLogoutCheck()
    const [hasApiError, sethasApiError] = useState(false)
    const { loading: isDashboardDataLoading, data } = useRequest(getDashboardData, {
        defaultParams: { token: cookies.token },
        onError: (err) => {
            sethasApiError(true)
            checkAutoLogout(err)
        }
    })
    useEffect(() => {
        setHasBeenLoggedOut(false)
    }, [setHasBeenLoggedOut])
    return (
        <>
            <Typography
                component="h2"
                variant="h3"
                className={classes.heading}
            >
                Dashboard
        </Typography>
            <Paper
                className={classes.paper}
            >
                {isDashboardDataLoading ?
                    <CircularProgress
                        className={classes.spinner}
                    />
                    :
                    hasApiError ?
                        <Alert
                            severity="error">
                            Něco se nepovedlo, zkuste to prosím později
                        </Alert>
                        :
                        <Grid container >
                            <Grid item lg={4} className={classes.dashDataCol}>
                                <Typography
                                    variant="h2"
                                    component="div"
                                >
                                    <CountUp
                                        end={data.data.max ? data.data.max : 0}
                                    />
                                </Typography>
                                <Typography
                                    variant="h6"
                                    component="div"
                                >
                                    Maximální váha
                    </Typography>
                            </Grid>
                            <Grid item lg={4} className={classes.dashDataCol}>
                                <Typography
                                    variant="h2"
                                    component="div"
                                >
                                    <CountUp
                                        end={data.data.sum ? data.data.sum : 0}
                                    />
                                </Typography>
                                <Typography
                                    variant="h6"
                                    component="div"
                                >
                                    Celkem zdviženo
                    </Typography>
                            </Grid>
                            <Grid item lg={4} className={classes.dashDataCol}>
                                <Typography
                                    variant="h2"
                                    component="div"
                                >
                                    <CountUp
                                        end={data.data.count ? parseInt(data.data.count) : 0}
                                    />
                                </Typography>
                                <Typography
                                    variant="h6"
                                    component="div"
                                >
                                    Celkem záznamů
                    </Typography>
                            </Grid>
                        </Grid>
                }
            </Paper>
        </>
    )
}

export default Dashboard