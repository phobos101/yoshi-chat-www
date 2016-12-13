import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {
    addMessage,
    addHistory,
    addUser,
    removeUser
} from '../actions'

import ChatInput from '../components/ChatInput'
import ChatHistory from '../components/ChatHistory'
import ChatUsers from '../components/ChatUsers'

import '../styles/room.css'

function mapStateToProps(state) {
    return {
        history: state.room.get('messages').toJS(),
        lastMessageTimestamp: state.room.get('lastMessageTimestamp'),
        users: state.room.get('users').toJS()
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addMessage: (message) => dispatch(addMessage(message)),
        addHistory: (messages, timestamp) => dispatch(addHistory(messages, timestamp)),
        addUser: (userID) => dispatch(addUser(userID)),
        removeUser: (userID) => dispatch(removeUser(userID))
    }
}

class Room extends Component {
    static propTypes = {
        history: PropTypes.array,
        lastMessageTimestamp: PropTypes.string,
        users: PropTypes.array,
        addMessage: PropTypes.func,
        addHistory: PropTypes.func,
        addUser: PropTypes.func,
        removeUser: PropTypes.func,
        userId: PropTypes.string,
        roomId: PropTypes.string,
        userProfile: PropTypes.object
    }

    componentDidMount() {
        this.PubNub = window.PUBNUB.init({
            publish_key: 'pub-c-033a1f9f-1a10-4a80-aa41-42e47f2dacbb',
            subscribe_key: 'sub-c-cef27eee-be48-11e6-91e2-02ee2ddab7fe',
            ssl: (window.location.protocol.toLowerCase().indexOf('https') !== -1),
            uuid: this.props.userId
        })

        this.PubNub.subscribe({
            channel: `Yoshi-${this.props.roomId}`,
            message: this.props.addMessage,
            presence: this.onPresenceChange
        })

        this.fetchHistory()

        window.addEventListener('beforeunload', this.leaveChat)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.roomId !== this.props.roomId) {
            this.forceUpdate()
        }
        
    }

    componentWillUnmount() {
        this.leaveChat()
    }

    leaveChat = () => {
        this.PubNub.unsubscribe({
            channel: `Yoshi-${this.props.roomId}`,
            presence: this.onPresenceChange
        })
    }

    sendMessage = (message) => {
        this.PubNub.publish({
            channel: `Yoshi-${this.props.roomId}`,
            message: message
        })
    }

    fetchHistory = () => {
        const { props } = this

        this.PubNub.history({
            channel: `Yoshi-${this.props.roomId}`,
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
                this.props.addUser(this.props.userId)
                break
            case 'leave':
            case 'timeout':
                this.props.removeUser(this.props.userId)
                break
            default:
                console.error(`Unknown action: ${presenceData.action}`)
        }
    }

    render() {
        const { props, sendMessage, fetchHistory } = this
        return (
            <div className="room-container">
                <ChatUsers users={ props.users } />
                <ChatHistory history={ props.history } fetchHistory={ fetchHistory } />
                <ChatInput userID={ props.userId } userProfile={ props.userProfile } sendMessage={ sendMessage } />
            </div>
        )
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Room)
