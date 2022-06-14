const CARD = "CARD"
const FAVORITE = "FAVORITE"
const IS_SENDED = 'IS_SENDED'
const initialState = {
    favorite: false,
    basket: false,
    isSended: false
}

export const boolReducer = (state = initialState, action)=>{
    const {type, payload} = action
    // const type = action.type
    // const payload = action.payload
    switch (type) {
        case CARD:
            return {...state, basket: payload}
        case FAVORITE:
            return {...state, favorite: payload}
        case IS_SENDED:
            return {...state, isSended:payload}
        default:
            return state
    }
}

export const card = (pay) => ({type:CARD, payload: pay})
export const favorite = (pay) => ({type:FAVORITE, payload: pay})
export const isSended = (pay) => ({type:IS_SENDED, payload: pay})



