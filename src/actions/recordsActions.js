import axios from "axios"

export const addRecord = (data) => {
    return axios.post("/addRecord", {
        ...data
    })
}

export const finishAddRecord = (data) => ({
    type: "ADD_RECORD",
    data
})

export const getRecords = (data) => {
    return axios.get("/getRecords", {
        params: {
            ...data
        }
    })
}

export const finishGetRecords = (data) => ({
    type: "GET_RECORDS",
    data
})