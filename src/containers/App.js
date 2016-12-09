import React, { Component } from 'react';
import logo from './logo.svg';
import '../styles/App.css';

import ChatInput from '../components/ChatInput'
import ChatHistory from '../components/ChatHistory'

class App extends Component {

    state = {
        userID: Math.round(Math.random() * 1000000).toString(),
        history: []
    }

    sendMessage = (message) => {
        console.log('sendMessage', message)
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
