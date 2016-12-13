import {
    ADD_MESSAGE,
    ADD_HISTORY,
    ADD_USER,
    REMOVE_USER
} from '../constants'

import { fromJS } from 'immutable'

const INITIAL_STATE = fromJS({
    messages: [],
    lastMessageTimestamp: null,
    users: []
})

export default function roomReducer(state = INITIAL_STATE, action = {}) {
    switch (action.type) {

        case ADD_MESSAGE:
            return state
                .update('messages', (messages) => messages.concat(action.payload))

        case ADD_HISTORY:
            return state
                .update('messages', (messages) => messages.unshift(...action.payload.messages))
                .update('lastMessageTimestamp', () => action.payload.timestamp)

        case ADD_USER:
            return state
                .update('users', (users) => (
                    users.indexOf(action.payload) >= 0
                        ? users
                        : users.concat(action.payload)
                ))

        case REMOVE_USER:
            return state
                .update('users', (users) => users.delete(action.payload))

        default:
            return state
    }
}