import { combineReducers } from 'redux'
import countryReducer from './countryReducer'
import infoReducer from './infoReducer'
import { authReducer } from './authReducer'
import confirencesReducer from './confirencesReducer'

export default combineReducers({
    countries: countryReducer,
    info: infoReducer,
    auth: authReducer,
    confirences: confirencesReducer 
})