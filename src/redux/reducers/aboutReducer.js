const initialState = {
    img1: '',
    img2: '',
    img3: '',
    text: ''
}

const ABOUT = "ABOUT"

export const aboutReducer = (state = initialState, action)=>{
    const {type, payload} = action
    switch (type) {
        case ABOUT:
            return {...state, img1: payload.img1, img2:payload.img2, img3: payload.img3, text: payload.text}
        default:
            return state;
    }
    
}

export const about = (pay) => ({type:ABOUT, payload: pay})