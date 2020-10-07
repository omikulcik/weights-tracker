import useRequest from "@ahooksjs/use-request"
import { Button, Container, Paper, TextField, makeStyles, Typography, CircularProgress } from "@material-ui/core"
import { Alert } from "@material-ui/lab"
import React, { useContext, useState } from "react"
import { useCookies } from "react-cookie"
import { Controller, useForm } from "react-hook-form"
import { Redirect, useHistory } from "react-router"
import { Link } from "react-router-dom"
import { logIn } from "../actions/userActions"
import AppContext from "../contexts/AppContext"

const Login = () => {

    const useStyles = makeStyles(theme => ({
        soloLine: {
            "& .MuiInputBase-root": {
                width: "100%"
            },
            display: "block",
            marginTop: "1rem",
            width: "80%"
        },
        container: {
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center"
        },
        loginBtn: {
            width: "auto"
        },
        btnHolder: {
            width: "100%",
            display: "flex",
            justifyContent: "center",
            padding: "2rem 0",
            "& button": {
                fontWeight: "bold"
            }
        },
        pageTitle: {
            width: "100%",
            fontWeight: "bold",
            textAlign: "center",
            marginTop: "1rem"
        },
        error: {
            marginTop: "1rem"
        },
        registrationTeaser: {
            fontWeight: "bold",
            paddingBottom: "1rem",
            "& a": {
                textDecoration: "none",
                color: theme.palette.primary
            }
        }
    }))


    const classes = useStyles()
    const { control, handleSubmit, errors } = useForm({ nativeValidation: true })
    const { setUser, user } = useContext(AppContext)
    const [, setCookie] = useCookies()
    const history = useHistory()
    const [apiError, setApiError] = useState()
    const { run: requestLogin, loading: isLoggingIn } = useRequest(logIn, {
        manual: true,
        onSuccess: (result) => {
            setUser({
                uuid: result.uuid,
                email: result.email,
            })
            setCookie("token", result.data.token)
            history.push("/")
        },
        onError: (err) => setApiError(err.response.data),
    })

    const handleLogin = (data) => {
        requestLogin(data)
    }

    return (
        <>{
            user ?
                <Redirect to="/" />
                :

                <form onSubmit={handleSubmit(handleLogin)}>

                    <Container
                        maxWidth="sm"
                        component={Paper}
                        className={classes.container}
                    >
                        <Typography
                            component="h2"
                            variant="h6"
                            className={classes.pageTitle}
                        >
                            Hello! Sign into your account please.
                        </Typography>
                        <Controller
                            as={<TextField />}
                            type="email"
                            name="email"
                            control={control}
                            label="e-mail"
                            className={classes.soloLine}
                            defaultValue=""
                            rules={{
                                required: "Required field"
                            }}
                            error={errors.email}
                            helperText={errors.email?.message}
                        />
                        <Controller
                            as={<TextField />}
                            type="password"
                            name="password"
                            control={control}
                            label="password"
                            className={classes.soloLine}
                            defaultValue=""
                            rules={{
                                required: "Required field"
                            }}
                            error={errors.password}
                            helperText={errors.password?.message}
                        />
                        {apiError &&
                            <Alert
                                className={classes.error}
                                severity="error">
                                {apiError.message}
                            </Alert>}
                        <div className={classes.btnHolder}>
                            {isLoggingIn ?
                                <CircularProgress />
                                :
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"

                                >
                                    Log In
                            </Button>
                            }
                        </div>
                        <Typography
                            variant="body1"
                            component="p"
                            className={classes.registrationTeaser}
                        >
                            Do not have an account? <Link to="/register">Click here to register!</Link>
                        </Typography>
                    </Container>

                </form>
        }
        </>
    )
}

export default Login