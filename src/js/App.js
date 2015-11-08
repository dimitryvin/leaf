import React from 'react'
import { render } from 'react-dom'

import DashboardView from './views/DashboardView.js'
import HeaderView from './views/HeaderView.js'


class App extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        // render the app root view
        return (
            <div>
                <HeaderView />
                <DashboardView />
            </div>
        )
    }
}

render(<App />, document.getElementById('App'))
