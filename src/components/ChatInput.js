import React, { Component, PropTypes } from 'react'
import '../styles/ChatInput.css'

export default class ChatInput extends Component {
    static propTypes = {
        userID: PropTypes.string,
        userProfile: PropTypes.object,
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
            Who: {
                id: this.props.userID,
                name: `${this.props.userProfile.givenNames} ${this.props.userProfile.familyName}`,
                image: this.props.userProfile.selfie
            },
            What: message,
            When: new Date().valueOf()
        }

        this.props.sendMessage(messageObj)

        this.refs.txtMessage.value = ''
        this.refs.txtMessage.focus()
    }

    render() {
        const { props, onSubmit } = this
        return (
            <footer className="message-form">
                <form className="container" onSubmit={ onSubmit }>
                    <div className="row">
                        <div className="input-field col s10">
                            <i className="prefix mdi-communication-chat" />
                            <input ref="txtMessage" type="text" placeholder="Type your message" />
                            <span className="chip left">
                                <img src={ this.props.userProfile.selfie } role="presentation"/>
                                <span>{ `${props.userProfile.givenNames} ${props.userProfile.familyName}` }</span>
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