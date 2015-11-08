import React from 'react'

import Number from '../utils/Number.js'

class TotalsView extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        let totals = this.props.totals

        // if totals exists, show the data, otherwise show loading
        if (totals) {
            return (
              <div className="totals-view dashboard-child">
                <div className="data-point">
                    <span className="title">Last Month Earnings</span>
                    <div className="value">{Number.parseCurrency(totals.lastMonthEarnings)}</div>
                </div>
                <div className="data-point">
                    <span className="title">Last Month Streams</span>
                    <div className="value">{Number.parseNumber(totals.lastMonthStreams, 0)}</div>
                </div>
                <div className="data-point">
                    <span className="title">Total Earnings</span>
                    <div className="value">{Number.parseCurrency(totals.totalEarnings)}</div>
                </div>
                <div className="data-point">
                    <span className="title">Total Streams</span>
                    <div className="value">{Number.parseNumber(totals.totalStreams, 0)}</div>
                </div>
              </div>
            )
        } else {
            return (
                <div className="totals-view loading dashboard-child">
                    <img className="loading" src="images/loading.gif" />
                </div>
            )
        }
    }

}

export default TotalsView
