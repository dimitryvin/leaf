import React from 'react'

import stem from '../api/stem.js'
import TotalsView from './TotalsView.js'
import ChartView from './ChartView.js'

class DashboardView extends React.Component {

    constructor(props) {
        super(props)

        // default state
        this.state = {
            totals: null,
            graphData: null
        }
    }

    componentDidMount() {
        // after react loads the view, make the request
        stem.getDashboardData((err, data) => {
            this.setState({
                totals: data.body.totals,
                topAssets: data.body.topAssets
            })
        })
    }

    render() {
        return (
          <div className="dashboard-view">
            <TotalsView totals={this.state.totals} />
            <ChartView topAssets={this.state.topAssets} />
          </div>
        )
    }

}

export default DashboardView
