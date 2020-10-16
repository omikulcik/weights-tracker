import axios from "axios"
import makeHeaders from "../utils/makeHeaders"

export const getDashboardData = (data) => {
    return axios.get("/getDashboardData", {
        headers: makeHeaders(data.token)
    })
}