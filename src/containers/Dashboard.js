import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import Room from './Room'

function mapStateToProps(state) {
    return {
        profile: state.profile.get('baseProfile'),
        userId: state.profile.get('userId')
    }
}

class Dashboard extends Component {
    static propTypes = {
        profile: PropTypes.object,
        userId: PropTypes.number
    }

    render() {
        const { props } = this
        return (
            <div>
                { !!props.profile.selfie && <div className="row m-xs-b-0">

                    <div className="col s3 valign-wrapper intro-text">
                        <div className="col s12 valign center">
                            <h3>
                                Welcome {props.profile.givenNames} {props.profile.familyName}
                            </h3>
                        </div>
                    </div>

                    <div className="col s9">
                        <Room userId={ props.userId } roomId="1" />
                    </div>

                </div> }
            </div>
        )
    }
}

export default connect(
    mapStateToProps
)(Dashboard)