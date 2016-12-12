import { GET_PROFILE } from '../constants'
import { fromJS } from 'immutable'

const INITIAL_STATE = fromJS({
    profile: {}
})

export default function lobbyReducer(state = INITIAL_STATE, action = {}) {
    switch (action.type) {

        case GET_PROFILE:
            return state.update('profile', () => action.payload)

        default:
            return state
    }
}