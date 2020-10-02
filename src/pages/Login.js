import useRequest from "@ahooksjs/use-request"
import { TextField } from "@material-ui/core"
import React, { useContext } from "react"
import { useCookies } from "react-cookie"
import { Controller, useForm } from "react-hook-form"
import { Redirect, useHistory } from "react-router"
import { logIn } from "../actions/userActions"
import AppContext from "../contexts/AppContext"


const Login = () => {

    const { control, handleSubmit } = useForm()
    const { setUser, user } = useContext(AppContext)
    const [, setCookie] = useCookies()
    const history = useHistory()
    const { run: requestLogin } = useRequest(logIn, {
        manual: true,
        onSuccess: (result) => {
            setUser({
                uuid: result.uuid,
                email: result.email,
            })
            setCookie("token", result.data.token)
            history.push("/")
        }
    })

    const handleLogin = (data) => {
        requestLogin(data)
    }

    return (
        <div>{
            user ?
                <Redirect to="/" />
                :
                <form onSubmit={handleSubmit(handleLogin)}>
                    <Controller
                        as={<TextField />}
                        type="email"
                        name="email"
                        control={control}
                        label="e-mail"
                    />
                    <Controller
                        as={<TextField />}
                        type="password"
                        name="password"
                        control={control}
                        label="password"
                    />
                    <button type="submit">Log in</button>
                </form>
        }
        </div>
    )
}

export default Login