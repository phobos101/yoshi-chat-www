import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { setCurrentUserID, addMessage, addHistory } from '../actions'

import ChatInput from '../components/ChatInput'
import ChatHistory from '../components/ChatHistory'

import logo from './logo.svg'
import '../styles/App.css'

function mapStateToProps(state) {
    return {
        history: state.app.get('messages').toJS(),
        userID: state.app.get('userID'),
        lastMessageTimestamp: state.app.get('lastMessageTimestamp')
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addMessage: (message) => dispatch(addMessage(message)),
        setUserId: (userID) => dispatch(setCurrentUserID(userID)),
        addHistory: (messages, timestamp) => dispatch(addHistory(messages, timestamp))
    }
}

class App extends Component {
    static propTypes = {
        history: PropTypes.array,
        userID: PropTypes.number,
        addMessage: PropTypes.func,
        setUserId: PropTypes.func,
        addHistory: PropTypes.func,
        lastMessageTimestamp: PropTypes.string
    }

    componentDidMount() {
        const ID = Math.round(Math.random() * 1000000)
        this.props.setUserId(ID)

        this.PubNub = window.PUBNUB.init({
            publish_key: 'pub-c-033a1f9f-1a10-4a80-aa41-42e47f2dacbb',
            subscribe_key: 'sub-c-cef27eee-be48-11e6-91e2-02ee2ddab7fe',
            ssl: (window.location.protocol.toLocaleLowerCase().indexOf('https') !== -1)
        })

        this.PubNub.subscribe({
            channel: 'Yoshi-lobby',
            message: this.props.addMessage
        })

        this.fetchHistory()
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
            count: 10,
            start: props.lastMessageTimestamp,
            callback: (data) => {
                props.addHistory(data[0], data[1])
            }
        })
    }

    render() {
        const { sendMessage, props } = this
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h2>Welcome to Yoshi</h2>
                </header>

                <div>
                    <ChatHistory history={ props.history } />
                    <ChatInput userID={ props.userID } sendMessage={ sendMessage } />
                </div>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
