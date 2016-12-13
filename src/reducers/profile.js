import { SET_PROFILE, SET_YOTI_USER } from '../constants'
import { fromJS } from 'immutable'

const INITIAL_STATE = fromJS({
    baseProfile: {},
    userId: 0
})

export default function lobbyReducer(state = INITIAL_STATE, action = {}) {
    switch (action.type) {

        case SET_PROFILE:
            return state.update('baseProfile', () => action.payload)

        case SET_YOTI_USER:
            return state.updtae('userId', () => action.payload)

        default:
            return state
    }
}