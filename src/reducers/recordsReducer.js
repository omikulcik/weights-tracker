const recordsReducer = (state, action) => {
    switch (action.type) {
        case "ADD_RECORD":
            return [...state, action.data]
        case "GET_RECORDS":
            return action.data
        case "DELETE_RECORD":
            return state.filter((record) => record.id !== action.data.recordId)
        default:
            return state
    }
}

export default recordsReducer