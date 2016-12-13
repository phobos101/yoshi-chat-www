import React, { Component, PropTypes } from 'react'
import '../styles/ChatUsers.css'

export default class ChatUsers extends Component {
    static propTypes = {
        users: PropTypes.array
    }

    render() {
        const { users } = this.props

        return (
            <div className="online-user-list">
                <div className="online-users-number valign-wrapper">
                    <i className="mdi-social-group" />
                    <span className="valign">{ users.length } online</span>
                </div>
                <ul>{
                    users.map((userID) => {
                        const name = userID;
                        const imgURL = `//robohash.org/${userID}?set=set2&bgset=bg2&size=70x70`
                        return (
                            <li key={ userID }>
                                <img title={ name } alt={ name } src={ imgURL } className="circle" />
                            </li>
                        )
                    })
                }</ul>
            </div>
        )
    }
}