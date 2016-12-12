import React, { Component } from 'react'
import axios from 'axios'
import Lobby from './Lobby'
import '../styles/app.css'

class App extends Component {

    componentDidMount() {
        axios.get('https://yoshi-chat.herokuapp.com/api/appId')
            .then((res) => {
                this.appId = res.appId
            })
            .catch((err) => {
                console.warn('Unable to get appId', err)
            })
    }

    render() {
        return (
            <div>
                <div className="row m-xs-b-0">

                    <div className="col s5 valign-wrapper intro-text">
                        <div className="col s12 valign center">
                            <h3>Yoshi Chat</h3>
                            <h3>Demo lobby --></h3>
                            <span data-yoti-application-id={ this.appId }></span>
                        </div>

                        <script>
                            _ybg.config.service = 'https://www.yoti.com/connect/'
                            _ybg.init()
                        </script>
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