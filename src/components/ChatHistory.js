import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import '../styles/ChatHistory.css'

export default class ChatHistory extends Component {
    static propTypes = {
        history: PropTypes.array,
        fetchHistory: PropTypes.func
    }

    static scrollAtBottom = true

    componentWillUpdate(nextProps) {
        this.historyChanged = nextProps.history.length !== this.props.history.length
        if (this.historyChanged) {
            const { messageList } = this.refs
            const scrollPos = messageList.scrollTop
            const scrollBottom = (messageList.scrollHeight - messageList.clientHeight)
            this.scrollAtBottom = (scrollBottom <= 0) || (scrollPos === scrollBottom)

            if (!this.scrollAtBottom) {
                const numMessages = messageList.childNodes.length
                this.topMessage = numMessages === 0 ? null : messageList.childNodes[0]
            }
        }
    }

    componentDidUpdate() {
        if (this.historyChanged) {
            if (this.scrollAtBottom) {
                this.scrollToBottom()
            }
            if (this.topMessage) {
                ReactDOM.findDOMNode(this.topMessage).scrollIntoView()
            }
        }
    }

    onScroll = () => {
        const { refs, props } = this
        const scrollTop = refs.messageList.scrollTop

        if (scrollTop === 0) {
            props.fetchHistory()
        }
    }

    scrollToBottom = () => {
        const { messageList } = this.refs
        const scrollHeight = messageList.scrollHeight
        const height = messageList.clientHeight
        const maxScrollTop = scrollHeight - height

        ReactDOM.findDOMNode(messageList).scrollTop = maxScrollTop > 0 ? maxScrollTop : 0
    }

    render() {
        const { props, onScroll } = this

        return (

            <ul className="collection message-list text-left" ref="messageList" onScroll={ onScroll }>
                { props.history.map((messageObj) => {
                    const imgURL = `//robohash.org/${messageObj.Who}?set=set2&bgset=bg2&size=70x70`
                    const messageDate = new Date(messageObj.When)
                    const messageDateTime = messageDate.toLocaleDateString() + ' at ' + messageDate.toLocaleTimeString()

                    return (
                        <li className="collection-item message-item avatar" key={ messageObj.When }>
                            <img src={ imgURL } alt="{ messageObj.Who }" className="circle" />
                            <span className="title">Anonymous robot #{ messageObj.Who }</span>
                            <p>
                                <i className="prefix mdi-action-alarm" />
                                <span className="message-date">{ messageDateTime }</span>
                                <br />
                                <span>{ messageObj.What }</span>
                            </p>
                        </li>
                    )
                }) }
            </ul>
        )
    }
}