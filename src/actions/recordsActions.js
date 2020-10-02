import axios from "axios"
import makeHeaders from "../utils/makeHeaders"

export const addRecord = (data, token) => {
    return axios.post("/addRecord", data, {
        headers: makeHeaders(token)
    })
}

export const finishAddRecord = (data) => ({
    type: "ADD_RECORD",
    data
})

export const getRecords = (data) => {
    return axios.get("/getRecords", {
        params: {
            exerciseId: data.exerciseId
        },
        headers: makeHeaders(data.token)
    })
}

export const finishGetRecords = (data) => ({
    type: "GET_RECORDS",
    data
})

export const deleteRecord = (data, token) => {
    return axios.post("/deleteRecord", data, {
        headers: makeHeaders(token)
    })
}

export const finishDeleteRecord = (data) => ({
    type: "DELETE_RECORD",
    data
})