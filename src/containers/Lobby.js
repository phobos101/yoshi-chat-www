import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {
    setCurrentUserID,
    addMessage,
    addHistory,
    addUser,
    removeUser
} from '../actions'

import ChatInput from '../components/ChatInput'
import ChatHistory from '../components/ChatHistory'
import ChatUsers from '../components/ChatUsers'

function mapStateToProps(state) {
    return {
        history: state.lobby.get('messages').toJS(),
        userID: state.lobby.get('userID'),
        lastMessageTimestamp: state.lobby.get('lastMessageTimestamp'),
        users: state.lobby.get('users').toJS()
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addMessage: (message) => dispatch(addMessage(message)),
        setUserId: (userID) => dispatch(setCurrentUserID(userID)),
        addHistory: (messages, timestamp) => dispatch(addHistory(messages, timestamp)),
        addUser: (userID) => dispatch(addUser(userID)),
        removeUser: (userID) => dispatch(removeUser(userID))
    }
}

class Lobby extends Component {
    static propTypes = {
        history: PropTypes.array,
        userID: PropTypes.number,
        addMessage: PropTypes.func,
        setUserId: PropTypes.func,
        addHistory: PropTypes.func,
        lastMessageTimestamp: PropTypes.string,
        users: PropTypes.array,
        addUser: PropTypes.func,
        removeUser: PropTypes.func
    }

    componentDidMount() {
        const ID = Math.round(Math.random() * 1000000)
        this.props.setUserId(ID)

        this.PubNub = window.PUBNUB.init({
            publish_key: 'pub-c-033a1f9f-1a10-4a80-aa41-42e47f2dacbb',
            subscribe_key: 'sub-c-cef27eee-be48-11e6-91e2-02ee2ddab7fe',
            ssl: (window.location.protocol.toLowerCase().indexOf('https') !== -1),
            uuid: ID
        })

        this.PubNub.subscribe({
            channel: 'Yoshi-lobby',
            message: this.props.addMessage,
            presence: this.onPresenceChange
        })

        this.fetchHistory()

        window.addEventListener('beforeunload', this.leaveChat)
    }

    componentWillUnmount() {
        this.leaveChat()
    }

    leaveChat = () => {
        this.PubNub.unsubscribe({ channel: 'Yoshi-lobby' })
    }

    sendMessage = (message) => {
        this.PubNub.publish({
            channel: 'Yoshi-lobby',
            message: message
        })
    }

    fetchHistory = () => {
        const { props } = this

        this.PubNub.history({
            channel: 'Yoshi-lobby',
            count: 15,
            start: props.lastMessageTimestamp,
            callback: (data) => {
                props.addHistory(data[0], data[1])
            }
        })
    }

    onPresenceChange = (presenceData) => {
        switch (presenceData.action) {
            case 'join':
                this.props.addUser(presenceData.uuid)
                break
            case 'leave':
            case 'timeout':
                this.props.removeUser(presenceData.uuid)
                break
            default:
                console.error(`Unknown action: ${presenceData.action}`)
        }
    }

    render() {
        const { props, sendMessage, fetchHistory } = this
        return (
            <div className="lobby-container">
                <ChatUsers users={ props.users } />
                <ChatHistory history={ props.history } fetchHistory={ fetchHistory } />
                <ChatInput userID={ props.userID } sendMessage={ sendMessage } />
            </div>
        )
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Lobby)
