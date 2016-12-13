import { SET_ROOM } from '../constants'
import { fromJS } from 'immutable'

const INITIAL_STATE = fromJS({
    roomId: '1'
})

export default function lobbyReducer(state = INITIAL_STATE, action = {}) {
    switch (action.type) {

        case SET_ROOM:
            return state.update('roomId', () => action.payload)

        default:
            return state
    }
}