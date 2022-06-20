export const promptingReducer = (state = null, action) => {
    const {type, payload} = action
    switch (type) {
        case 'PROMPTING':
            return payload
        default:
            return state
    }
}

export const prompting = (pay) => ({type:"PROMPTING", payload:pay})