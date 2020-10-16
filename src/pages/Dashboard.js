import useRequest from "@ahooksjs/use-request"
import { Grid, makeStyles, Paper, Typography, CircularProgress } from "@material-ui/core"
import { Alert } from "@material-ui/lab"
import React, { useContext, useEffect} from "react"
import { useCookies } from "react-cookie"
import CountUp from "react-countup"
import { useTranslation } from "react-i18next"
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

    const { t } = useTranslation()
    const classes = useStyles()
    const { setHasBeenLoggedOut } = useContext(AppContext)
    const [cookies] = useCookies()
    const checkAutoLogout = useAutomaticLogoutCheck()
    const { loading: isDashboardDataLoading, data, error: getDashboardError } = useRequest(getDashboardData, {
        defaultParams: { token: cookies.token },
        onError: (err) => {
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
                {t("dashboard")}
            </Typography>
            <Paper
                className={classes.paper}
            >
                {isDashboardDataLoading ?
                    <CircularProgress
                        className={classes.spinner}
                    />
                    :
                    getDashboardError ?
                        <Alert
                            severity="error">
                            {t("errors.neco se nepovedlo")}
                        </Alert>
                        :
                        <Grid container >
                            <Grid 
                                item
                                md={4}
                                xs={12}
                                className={classes.dashDataCol}
                            >
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
                                    {t("maximalni vaha")}
                                </Typography>
                            </Grid>
                            <Grid item 
                            md={4}
                            xs={12}
                            className={classes.dashDataCol}>
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
                                    {t("celkem zdvizeno")}
                                </Typography>
                            </Grid>
                            <Grid item 
                            md={4}
                            xs={12}
                            className={classes.dashDataCol}>
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
                                    {t("celkem zaznamu")}
                                </Typography>
                            </Grid>
                        </Grid>
                }
            </Paper>
        </>
    )
}

export default Dashboard