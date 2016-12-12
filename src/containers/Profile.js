import React, { Component, PropTypes } from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { getProfile } from '../actions'

function mapStateToProps(state) {
    return {
        profile: state.profile.get('profile')
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getProfile: (token) => dispatch(getProfile(token))
    }
}

class Profile extends Component {
    static propTypes = {
        profile: PropTypes.object,
        getProfile: PropTypes.func,
    }

    // 1. Does it have a token?
    //     yes: Call API and return Profile
    //     no: go to step 2

    // 2. Are they already logged in?
    //     yes: Show the Profile
    //     no: Teeeeeell thm off

    componentDidMount() {
        if (this.props.location.query.token) {
            const token = this.props.location.query.token
            this.props.getProfile(token)
                .then(() => console.log('done'))
        } else {
            console.log('No Token')
        }
    }

    render() {
        return (
            <h2>Loggin you in</h2>
        )
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Profile)