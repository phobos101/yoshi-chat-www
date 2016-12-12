import {
    ADD_MESSAGE,
    SET_CURRENT_USERID,
    ADD_HISTORY,
    ADD_USER,
    REMOVE_USER,
    GET_PROFILE
} from '../constants'

export function setCurrentUserID(userID) {
    return {
        type: SET_CURRENT_USERID,
        payload: userID
    }
}

export function addMessage(message) {
    return {
        type: ADD_MESSAGE,
        payload: message
    }
}

export function addHistory(messages, timestamp) {
    return {
        type: ADD_HISTORY,
        payload: {
            messages, timestamp
        }
    }
}

export function addUser(userID) {
    return {
        type: ADD_USER,
        payload: userID
    }
}

export function removeUser(userID) {
    return {
        type: REMOVE_USER,
        payload: userID
    }
}

export function getProfile(token) {
    console.log('Get profile called with', token)
    return {
        type: GET_PROFILE,
        payload: {name: 'Test Dude'}
    }
}