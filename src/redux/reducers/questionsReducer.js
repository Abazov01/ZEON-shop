const HELP = "HELP";
const initialState = []

export const questionsReducer = (state = initialState, action) => {
    const {type, payload} = action
    switch (type) {
        case HELP:
            return [payload]
        default:
            return state
    }
}

export const questions = (pay) => ({type:HELP, payload:pay})