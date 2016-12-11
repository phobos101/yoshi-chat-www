import React from 'react'
import { Route, Router, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { Provider } from 'react-redux'
import configureStore from './configure-store'

import Lobby from '../containers/Lobby'
import Profile from '../containers/Profile'

const store = configureStore({})
const history = syncHistoryWithStore(browserHistory, store)

export default (
    <Provider store={ store }>
        <Router history={ history }>
            <Route path="/" component={ Lobby } />
            <Route path="/profile" component={ Profile } />
        </Router>
    </Provider>
)