import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

export default class YotiButton extends Component {

    componentDidMount() {
        axios.get('https://yoshi-chat.herokuapp.com/api/appId')
            .then((res) => {
                let btn = ReactDOM.findDOMNode(this.refs.yotiBtn);
                btn.setAttribute('data-yoti-application-id', res.appId);
            })
            .catch((err) => {
                console.warn('Unable to get appId', err)
            })
    }

    render() {
        return (
            <div>
                <span ref="yotiBtn"></span>
                <script>
                    _ybg.config.service = 'https://www.yoti.com/connect/'
                    _ybg.init()
                </script>
            </div>
        )
    }
}