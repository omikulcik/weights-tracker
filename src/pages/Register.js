import useRequest from "@ahooksjs/use-request"
import { Button, TextField, Container, Paper, makeStyles, CircularProgress } from "@material-ui/core"
import { Alert } from "@material-ui/lab"
import React, { useContext, useState } from "react"
import { useCookies } from "react-cookie"
import { Controller, useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { Redirect, useHistory } from "react-router"
import { register } from "../actions/userActions"
import AppContext from "../contexts/AppContext"

const Register = () => {
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

    const { t } = useTranslation()
    const classes = useStyles()
    const [, setCookie] = useCookies()
    const { control, handleSubmit, errors, getValues } = useForm({ nativeValidation: true })
    const { setUser, user } = useContext(AppContext)
    const history = useHistory()
    const [apiError, setApiError] = useState(false)
    const { run: requestRegistration, loading: isRegistering } = useRequest(register, {
        manual: true,
        onSuccess: (res) => {
            setCookie("token", res.data.token)
            setUser({
                email: res.data.email,
                uuid: res.data.uuid
            })
            history.push("/")
        },
        onError: (err) => setApiError(err.response.data)
    })

    const handleRegistrationSubmit = (data) => {
        requestRegistration(data)
    }

    return (
        <>
            {
                user ?
                    <Redirect to="/" />
                    :
                    <form onSubmit={handleSubmit(handleRegistrationSubmit)}>
                        <Container
                            maxWidth="sm"
                            component={Paper}
                            className={classes.container}
                        >
                            <Controller
                                as={<TextField />}
                                type="email"
                                control={control}
                                defaultValue=""
                                name="email"
                                label="E-mail"
                                className={classes.soloLine}
                                rules={{ required: t("povinne pole") }}
                                error={errors.email}
                                helperText={errors.email?.message}
                            />
                            <Controller
                                as={<TextField />}
                                type="password"
                                control={control}
                                defaultValue=""
                                name="password"
                                label={t("heslo")}
                                className={classes.soloLine}
                                rules={{
                                    required: t("povinne pole"),
                                    pattern: {
                                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                                        message: t("musi mit pozadavky hesla"),
                                    }
                                }}
                                error={errors.password}
                                helperText={errors.password?.message}
                            />
                            <Controller
                                as={<TextField />}
                                type="password"
                                control={control}
                                defaultValue=""
                                name="repeatPassword"
                                label={t("heslo znovu")}
                                className={classes.soloLine}
                                rules={{
                                    required: t("povinne pole"),
                                    pattern: {
                                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                                        message: t("musi mit pozadavky hesla"),
                                    },
                                    validate: {
                                        notSame: (val) => {
                                            return val === getValues("password")
                                        }

                                    }
                                }}
                                error={errors.repeatPassword}
                                helperText={errors.repeatPassword?.type === "notSame" ? t("hesla se neshoduji") : errors.repeatPassword?.message}
                            />
                            {apiError &&
                                <Alert
                                    className={classes.error}
                                    severity="error">
                                    {t(`errors.${apiError.message}`)}
                                </Alert>}
                            <div className={classes.btnHolder}>
                                {
                                    isRegistering ?
                                        <CircularProgress />
                                        :
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            color="primary"
                                        >
                                            {t("registrovat")}
                                        </Button>}
                            </div>
                        </Container>
                    </form>
            }
        </>
    )
}

export default Register