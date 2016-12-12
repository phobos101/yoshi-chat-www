import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import lobbyReducer from './lobby'
import profileReducer from './profile'

const rootReducer = combineReducers({
    routing: routerReducer,
    lobby: lobbyReducer,
    profile: profileReducer
})

export default rootReducer