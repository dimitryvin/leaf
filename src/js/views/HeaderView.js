import React from 'react'
import { render } from 'react-dom'
import { Link } from 'react-router'

class HeaderView extends React.Component {

    render() {
        return (
            <div id="HeaderView">
                <img className="logo" src="images/logo.png" />
                <span className="logo-title">stem</span>
            </div>
        )
    }

}

export default HeaderView
