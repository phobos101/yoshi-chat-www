import React, { Component, PropTypes } from 'react'
import '../styles/ChatInput.css'

export default class ChatInput extends Component {
    static propTypes = {
        userID: PropTypes.number,
        sendMessage: PropTypes.func
    }

    componentDidMount() {
        this.refs.txtMessage.focus()
    }

    onSubmit = (e) => {
        e.preventDefault()

        const message = this.refs.txtMessage.value
        if (message.length === 0) return

        const messageObj = {
            Who: this.props.userID,
            What: message,
            When: new Date().valueOf()
        }

        this.props.sendMessage(messageObj)

        this.refs.txtMessage.value = ''
        this.refs.txtMessage.focus()
    }

    render() {
        const { props, onSubmit } = this
        const imgURL = `//robohash.org/${props.userID}?set=set2&bgset=bg2&size=70x70`
        return (
            <footer className="teal">
                <form className="container" onSubmit={ onSubmit }>
                    <div className="row">
                        <div className="input-field col s10">
                            <i className="prefix mdi-communication-chat" />
                            <input ref="txtMessage" type="text" placeholder="Type your message" />
                            <span className="chip left">
                                <img src={ imgURL } role="presentation"/>
                                <span>Anonymous robot #{ props.userID }</span>
                            </span>
                        </div>
                        <div className="input-field col s2">
                            <button type="submit" className="waves-effect waves-light btn-floating btn-large">
                                <i className="mdi-content-send" />
                            </button>
                        </div>
                    </div>
                </form>
            </footer>
        )
    }
}