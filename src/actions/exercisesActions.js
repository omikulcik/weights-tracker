import axios from "axios"
axios.defaults.baseURL = "http://127.0.0.1:3000"


export const addExercise = (data) => {

    return axios.post("/createExercise", {
        ...data
    })
}

export const getExercises = () => {
    console.log("req")
    return axios.get("/getExercises")
}