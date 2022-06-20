
export const breadReducer = (state = null,action) => {
    const {type, payload} = action
    switch (type) {
        case "BREAD":
            return payload
        default:
            return state
    }
}