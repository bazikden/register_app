import { SET_INFO } from "./types"

const initialState = {
    info: {

    },
    errors:{
        
    }
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_INFO:
            return {
                ...state,
                info:{...state.info, ...action.payload}
            }
        default:
            return state
    }
}