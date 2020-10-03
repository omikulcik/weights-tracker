import useRequest from "@ahooksjs/use-request"
import { Button, TextField } from "@material-ui/core"
import React, { useContext } from "react"
import { useCookies } from "react-cookie"
import { Controller, useForm } from "react-hook-form"
import { useHistory } from "react-router"
import { register } from "../actions/userActions"
import AppContext from "../contexts/AppContext"

const Register = () => {

    const [, setCookie] = useCookies()
    const { control, handleSubmit } = useForm()
    const { setUser } = useContext(AppContext)
    const history = useHistory()
    const { run: requestRegistration } = useRequest(register, {
        manual: true,
        onSuccess: (res) => {
            setCookie("token", res.data.token)
            setUser({
                email: res.data.email,
                uuid: res.data.uuid
            })
            history.push("/")
        }
    })

    const handleRegistrationSubmit = (data) => {
        requestRegistration(data)
    }

    return (
        <div>
            <form onSubmit={handleSubmit(handleRegistrationSubmit)}>
                <Controller
                    as={<TextField />}
                    type="email"
                    control={control}
                    defaultValue=""
                    name="email"
                    label="E-mail"
                />
                <Controller
                    as={<TextField />}
                    type="password"
                    control={control}
                    defaultValue=""
                    name="password"
                    label="Password"
                />
                <Controller
                    as={<TextField />}
                    type="password"
                    control={control}
                    defaultValue=""
                    name="repeatPassword"
                    label="Password again"
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                >
                    Registrovat
                </Button>
            </form>
        </div>
    )
}

export default Register