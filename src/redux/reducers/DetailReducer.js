const COLLECT_DET = 'COLLECT_DET'
const DET = 'DET'

const initial = {
    collectDet: [] ,
    total: null,
    detail: {}
}

export const DetailReducer = (state = initial, action) =>{
    const {type, payload} = action
    switch (type) {
        case COLLECT_DET:
            return {...state, collectDet:payload.data, total: payload.total}
        case DET:
            return {...state, detail:payload}
        default:
            return state;
    }
}


export const detail = (pay) => ({type: DET, payload:pay})
export const collectDet = (pay) => ({type: COLLECT_DET, payload: pay})
