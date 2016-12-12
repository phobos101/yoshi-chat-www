import React from 'react'
import { Route, Router, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { Provider } from 'react-redux'
import configureStore from './configure-store'

import App from '../containers/App'
import Profile from '../containers/Profile'

const store = configureStore({})
const history = syncHistoryWithStore(browserHistory, store)

export default (
    <Provider store={ store }>
        <Router history={ history }>
            <Route path="/" component={ App } />
            <Route path="/profile" component={ Profile } />
        </Router>
    </Provider>
)