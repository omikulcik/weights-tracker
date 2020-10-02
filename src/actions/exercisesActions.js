import axios from "axios"
import makeHeaders from "../utils/makeHeaders"
axios.defaults.baseURL = "http://127.0.0.1:3000"


export const addExercise = (data, token) => {
    return axios.post("/addExercise", data, {
        headers: makeHeaders(token)
    })
}

export const finishAddExercise = (data) => ({
    type: "ADD_EXERCISE",
    data
})

export const getExercises = (data) => {
    console.log(data)
    return axios.get("/getExercises", {
        headers: makeHeaders(data.token)
    })
}

export const finishGetExercises = (data) => ({
    type: "GET_EXERCISES",
    data
})

export const deleteExercise = (data, token) => {
    return axios.post("/deleteExercise", data, {
        headers: makeHeaders(token)
    })
}

export const finishDeleteExercise = (data) => ({
    type: "DELETE_EXERCISE",
    data
})