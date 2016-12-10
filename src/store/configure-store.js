import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import promiseMiddleware from '../middleware/promise-middleware'
import rootReducer from '../reducers'

function configureStore(initialState) {
    const store = compose(
        _getMiddleware(),
        ..._getEnhancers()
    )(createStore)(rootReducer, initialState)

    return store
}

function _getMiddleware() {
    let middleware = [
        promiseMiddleware,
        thunk,
    ]

    return applyMiddleware(...middleware)
}

function _getEnhancers() {
    let enhancers = []

    if (window.devToolsExtension) {
        enhancers = [...enhancers, window.devToolsExtension()]
    }
    return enhancers
}

export default configureStore