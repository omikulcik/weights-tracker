import axios from "axios"
axios.defaults.baseURL = "http://127.0.0.1:3000"


export const addExercise = (data) => {
    return axios.post("/addExercise", {
        ...data
    })
}

export const finishAddExercise = (data) => ({
    type: "ADD_EXERCISE",
    data
})

export const getExercises = (data) => {
    console.log(data)
    return axios.get("/getExercises", {
        params: {
            ...data
        }
    })
}

export const finishGetExercises = (data) => ({
    type: "GET_EXERCISES",
    data
})

export const deleteExercise = (data) => {
    return axios.post("/deleteExercise", {
        ...data
    })
}

export const finishDeleteExercise = (data) => ({
    type: "DELETE_EXERCISE",
    data
})