import {
    ADD_MESSAGE,
    ADD_HISTORY,
    ADD_USER,
    REMOVE_USER,
    SET_PROFILE,
    SET_YOTI_USER,
    SET_ROOM
} from '../constants'

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

export function setProfile(profile) {
    return {
        type: SET_PROFILE,
        payload: profile
    }
}

export function setYotiUser(yotiID) {
    return {
        type: SET_YOTI_USER,
        payload: yotiID
    }
}

export function setRoom(roomID) {
    return {
        type: SET_ROOM,
        payload: roomID
    }
}