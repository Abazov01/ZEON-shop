const PHONE = "PHONE"

export const phonsReducer = (state = [], action) => {
    const {type, payload} = action
    switch (type) {
        case PHONE:
            return payload
        default:
            return state
    }
}   
export const phone = (p) => ({type: PHONE, payload:p})