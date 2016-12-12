import { SET_PROFILE } from '../constants'
import { fromJS } from 'immutable'

const INITIAL_STATE = fromJS({
    baseProfile: {}
})

export default function lobbyReducer(state = INITIAL_STATE, action = {}) {
    switch (action.type) {

        case SET_PROFILE:
            return state.update('baseProfile', () => action.payload)

        default:
            return state
    }
}