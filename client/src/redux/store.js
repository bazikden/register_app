import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers/rootReducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'
import rootSaga from '../sagas/sagas'

const sagaMiddleware = createSagaMiddleware()

const composedMiddleware = composeWithDevTools(
    applyMiddleware(sagaMiddleware)
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export const store = createStore(rootReducer, composedMiddleware) 

sagaMiddleware.run(rootSaga)