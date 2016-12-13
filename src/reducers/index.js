import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import roomReducer from './room'
import profileReducer from './profile'
import dashboardReducer from './dashboard'

const rootReducer = combineReducers({
    routing: routerReducer,
    room: roomReducer,
    profile: profileReducer,
    dashboard: dashboardReducer
})

export default rootReducer