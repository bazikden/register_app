import { AUTH_USER, SET_ERROR, CLEAR_ERROR, CLEAR_TOKEN, SET_TOKEN, LOGOUT_USER, GET_ALL_USERS, ADD_USER, UPDATE_USER_STATUS, DELETE_USER } from "./types"

const initialState = {
    user: null,
    token: null,
    error: null,
    users:[]
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_USER:
            return {
                ...state, user: action.payload
            }
        case SET_ERROR:
            return {
                ...state, error: action.payload
            }

        case CLEAR_ERROR:
            return {
                ...state, error: null
            }

        case SET_TOKEN:
            return {
                ...state,
                token: action.payload
            }

        case CLEAR_TOKEN:
            return {
                ...state,
                token: null
            }

        case LOGOUT_USER:
            return {
                ...state,
                user:null
            }
            
        case GET_ALL_USERS:
            return{
                ...state,
                users:action.payload
            }
         
        case ADD_USER:
            return{
                ...state,
                users:[...state.users,action.payload]
            }
        case UPDATE_USER_STATUS:
            return{
                ...state,
                users:[...state.users.map(user =>{
                    if(user.email === action.payload.email){
                        user.active = action.payload.active
                          
                    }
                    return user
                })]
            }
            
        case DELETE_USER:
            return{
                ...state,
                users:[...state.users.filter(user => user.email !== action.payload.email)]
            }    

        default: return state
    }
}