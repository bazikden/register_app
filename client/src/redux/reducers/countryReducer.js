import { GET_ALL_COUNTRIES } from "./types"

const initialState = {
    countries: []
}


export default (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_COUNTRIES:
            return {
                ...state,
                countries: [...action.payload]
            }

        default: 
            return state
        
    }
} 