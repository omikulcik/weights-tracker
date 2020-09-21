const recordsReducer = (state, action) => {
    switch (action.type) {
        case "ADD_RECORD":
            return [...state, action.data]
        case "GET_RECORDS":
            return action.data
        default:
            return state
    }
}

export default recordsReducer