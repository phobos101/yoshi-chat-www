import React, { Component, PropTypes } from 'react'
import '../styles/RoomSelector.css'

class RoomSelector extends Component {
    static propTypes = {
        setRoom: PropTypes.func    
    }

    handleClick = (e, num) => {
        this.props.setRoom(num)
    }

    render() {
        const { handleClick } = this

        return (
            <div>
                <h2>Room selector</h2>
                
                <ul>
                    <li onClick={ () => handleClick(this, '1') }>
                        <a className="waves-effect waves-light btn">
                            Room 1
                        </a>
                    </li>
                    <li onClick={ () => handleClick(this, '2') }>
                        <a className="waves-effect waves-light btn">
                            Room 2
                        </a>
                    </li>
                </ul>
            </div>
        )
    }
}

export default RoomSelector