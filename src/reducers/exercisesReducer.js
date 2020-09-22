const exercisesReducer = (state, action) => {
    switch (action.type) {
        case "GET_EXERCISES":
            return action.data
        case "ADD_EXERCISE":
            return [
                action.data,
                ...state
            ]
        case "DELETE_EXERCISE":
            return state.filter((exercise) => exercise.id !== action.data.id)
        default:
            return state
    }
}

export default exercisesReducer