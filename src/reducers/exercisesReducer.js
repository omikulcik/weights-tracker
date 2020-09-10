const exercisesReducer = (state, action) => {
    console.log(action)
    switch (action.type) {
        case "GET_EXERCISES":
            return action.data
        default:
            return state
    }
}

export default exercisesReducer