import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import axios from 'axios'
import { setProfile } from '../actions'

function mapStateToProps(state) {
    return {
        profile: state.profile.get('baseProfile')
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setProfile: (profile) => dispatch(setProfile(profile))
    }
}

class Profile extends Component {
    static propTypes = {
        profile: PropTypes.object,
        setProfile: PropTypes.func,
    }

    componentDidMount() {
        this.isLoggedIn = false
        if (!window.sessionStorage.profile) {
            if (this.props.location.query.token) {
                const token = this.props.location.query.token
                const urlRoot = 'https://yoshi-chat.herokuapp.com/api/profile'

                axios.get(`${urlRoot}?token=${token}`)
                    .then((res) => {
                        const profile = res.data.userProfile
                        const encodedProfile = btoa(JSON.stringify(profile))

                        this.props.setProfile(profile)
                        window.sessionStorage.setItem('profile', encodedProfile)

                        this.isLoggedIn = true

                    })
                    .catch((err) => {
                        console.warn('ERROR', err)
                    })
            }
        } else {
            this.isLoggedIn = true
        }
    }

    render() {
        return (
            <div>
                { this.isLoggedIn &&
                    <div>
                        <h3>You have logged in</h3>
                        <Link to="/dashboard">Continue...</Link>
                    </div>
                }

                { !this.isLoggedIn &&
                    <div>
                        <h3>Unable to login!</h3>
                        <Link to="/">Go Home</Link>
                    </div>
                }
            </div>
        )
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Profile)