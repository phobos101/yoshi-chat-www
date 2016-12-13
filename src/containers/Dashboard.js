import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { setRoom } from '../actions'

import RoomSelector from '../components/RoomSelector'
import Room from './Room'

function mapStateToProps(state) {
    return {
        profile: state.profile.get('baseProfile'),
        userId: state.profile.get('userId'),
        roomId: state.dashboard.get('roomId')
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setRoom: (roomId) => dispatch(setRoom(roomId))
    }
}

class Dashboard extends Component {
    static propTypes = {
        profile: PropTypes.object,
        userId: PropTypes.string,
        roomId: PropTypes.string,
        setRoom: PropTypes.func
    }

    setRoom = (roomId) => {
        this.props.setRoom(roomId)
    }

    render() {
        const { props, setRoom } = this
        return (
            <div>
                { !!props.profile.selfie && <div className="row m-xs-b-0">

                    <div className="col s3">
                        <RoomSelector setRoom={ setRoom } />
                    </div>

                    <div className="col s9">
                        <Room userId={ props.userId } userProfile={ props.profile } roomId={ props.roomId } />
                    </div>

                </div> }
            </div>
        )
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard)