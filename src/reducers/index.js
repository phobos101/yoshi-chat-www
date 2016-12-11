import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import lobbyReducer from './lobby'

const rootReducer = combineReducers({
    routing: routerReducer,
    lobby: lobbyReducer
})

export default rootReducer