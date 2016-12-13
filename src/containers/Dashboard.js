import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

function mapStateToProps(state) {
    return {
        profile: state.profile.get('baseProfile')
    }
}

class Dashboard extends Component {
    static propTypes = {
        profile: PropTypes.object,
    }

    render() {
        return (
            <div>
                { !!this.props.profile.selfie && <div className="row m-xs-b-0">

                    <div className="col s3 valign-wrapper intro-text">
                        <div className="col s12 valign center">
                            <h3>
                                Welcome {this.props.profile.givenNames} {this.props.profile.familyName}
                            </h3>
                        </div>
                    </div>

                    <div className="col s9">
                        CHAT
                    </div>

                </div> }
            </div>
        )
    }
}

export default connect(
    mapStateToProps
)(Dashboard)