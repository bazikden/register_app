import { GET_ALL_CONFIRENCES, SET_CONF_STATUS } from "./types"

const initialState = {
    confirences:[]
}


export default (state = initialState,action) => {
    switch(action.type){
        case GET_ALL_CONFIRENCES:
            return{
                ...state,
                confirences:action.payload.confirences,
                total:action.payload.total,
                pages:action.payload.pages
            }

        case SET_CONF_STATUS:
            return{
                ...state,
                confirences:[...state.confirences.map(conf => {
                    if(conf.id === action.payload.id) {conf.status = action.payload.status}
                    return conf
                })]
            }    

        default: return state    
    }
}