const SEARCH = "asdff"
const init = {
    data:[],
    total:0
}

export const searchReducer = (state = init, action) => {
    const {type, payload} = action
    switch (type) {
        case SEARCH:
            return {...state, data:payload.data, total:payload.total}
        default:
            return state
    }
}

export const search = (pay) => ({type: SEARCH, payload: pay})