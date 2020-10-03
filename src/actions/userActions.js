import axios from "axios"
import makeHeaders from "../utils/makeHeaders"

export const logIn = (data) => {
    return axios.post("/users/login", data)
}

export const authStatus = (data) => {
    return axios.post("/users/authStatus", null, {
        headers: makeHeaders(data.token)
    })
}

export const register = (data) => {
    return axios.post("/users/register", data)
}