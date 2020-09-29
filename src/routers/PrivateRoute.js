import React, { useContext } from "react"
import { Redirect, Route } from "react-router-dom"
import AppContext from "../contexts/AppContext"


const PrivateRoute = ({ children, ...rest }) => {
    const { user } = useContext(AppContext)
    return (
        <Route
            {...rest}
            render={() =>
                user ?
                    (children) :
                    (<Redirect to="/login" />)
            }
        />
    )
}

export default PrivateRoute