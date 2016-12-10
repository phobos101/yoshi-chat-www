import * as React from 'react';
import logo from './logo.svg';
import '../styles/App.css';

import ChatInput from '../components/ChatInput'
import ChatHistory from '../components/ChatHistory'

class App extends React.Component {
    static propTypes = {
        history: React.PropTypes.array,
        userID: React.PropTypes.number
    }

    state = {
        userID: Math.round(Math.random() * 1000000).toString(),
        history: []
    }

    sendMessage = (message) => {
        this.PubNub.publish({
            channel: 'Yoshi-lobby',
            message: message
        })
    }

    componentDidMount() {
        this.PubNub = window.PUBNUB.init({
            publish_key: 'pub-c-033a1f9f-1a10-4a80-aa41-42e47f2dacbb',
            subscribe_key: 'sub-c-cef27eee-be48-11e6-91e2-02ee2ddab7fe',
            ssl: (window.location.protocol.toLocaleLowerCase().indexOf('https') !== -1)
        })

        this.PubNub.subscribe({
            channel: 'Yoshi-lobby',
            message: (message) => this.setState({
                history: this.state.history.concat(message)
            })
        })
    }

    render() {
        const { sendMessage, state } = this
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h2>Welcome to Yoshi</h2>
                </header>

                <div>
                    <ChatHistory history={ state.history } />
                    <ChatInput userID={ state.userID } sendMessage={ sendMessage } />
                </div>
            </div>
        );
    }
}

export default App;
