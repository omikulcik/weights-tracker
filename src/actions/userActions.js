import axios from "axios"


export const logIn = (data) => {
    return axios.post("/users/login", {
        ...data
    })
}

export const authStatus = (data) => {
    return axios.post("/users/authStatus", {
        ...data
    })
}