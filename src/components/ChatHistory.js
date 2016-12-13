import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import '../styles/ChatHistory.css'

export default class ChatHistory extends Component {
    static propTypes = {
        history: PropTypes.array,
        fetchHistory: PropTypes.func
    }

    constructor() {
        super()
        this.state = { scrollAtBottom: true }
    }

    componentWillUpdate(nextProps) {
        this.historyChanged = nextProps.history.length !== this.props.history.length
    }

    componentDidUpdate() {
        if (this.historyChanged && this.state.scrollAtBottom) {
            this.scrollToBottom()
        }
    }

    onScroll = () => {
        const { refs, props } = this
        const scrollTop = refs.messageList.scrollTop
        const scrollBase = scrollTop - (refs.messageList.scrollHeight - refs.messageList.clientHeight)

        if (scrollBase === 0) {
            this.setState({ scrollAtBottom: true })
        } else {
            this.setState({ scrollAtBottom: false })
        }

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
                    const imgURL = `//robohash.org/${messageObj.Who.id}?set=set2&bgset=bg2&size=70x70`
                    const messageDate = new Date(messageObj.When)
                    const messageDateTime = messageDate.toLocaleDateString() + ' at ' + messageDate.toLocaleTimeString()

                    return (
                        <li className="collection-item message-item avatar" key={ messageObj.When }>
                            <img src={ imgURL } alt="{ messageObj.Who.id }" className="circle" />
                            <span className="title">{ messageObj.Who.name }</span>
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