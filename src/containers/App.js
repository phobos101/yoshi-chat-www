import React, { Component } from 'react'
import Lobby from './Lobby'
import '../styles/app.css'

class App extends Component {
    render() {
        return (
            <div>
                <div className="row m-xs-b-0">

                    <div className="col s5 valign-wrapper intro-text">
                        <div className="col s12 valign center">
                            <h3>Yoshi Chat</h3>
                            <h3>Demo lobby --></h3>
                        </div>
                    </div>

                    <div className="col s7">
                        <Lobby />
                    </div>

                </div>
            </div>
        )
    }
}

export default App