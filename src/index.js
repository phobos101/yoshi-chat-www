import 'es5-shim'
import 'es6-shim'
import 'es6-promise'

import React from 'react'
import ReactDOM from 'react-dom'

import routes from './store/routes'

import './styles/index.css'

ReactDOM.render(
    <div>
        { routes }
    </div>,
    document.getElementById('root')
)
