import React from 'react'
import { Line } from 'react-chartjs'

import Number from '../utils/Number.js'

class ChartView extends React.Component {

    constructor(props) {
        super(props)

        // default state
        this.state = {
            range: "monthly",
            graphType: "earnings",
            ignoredAssetItems: []
        }

        // some colors, WARNING: does not handle issue where you may have more than 3 datasets
        this.colors = [
            {
                transparent: "rgba(0, 236, 177, 0.2)",
                opaque: "rgba(0, 236, 177, 1)"
            },
            {
                transparent: "rgba(65, 64, 66, 0.2)",
                opaque: "rgba(65, 64, 66, 1)"
            },
            {
                transparent: "rgba(220,220,220,0.2)",
                opaque: "rgba(220,220,220,1)"
            }
        ]
    }

    getAssetData(type, range) {
        let datasets = []
        this.props.topAssets.forEach((asset, index) => {
            // if we have the asset ignored, skip it
            if (this.state.ignoredAssetItems.indexOf(index) !== -1) {
                return
            }

            let stats = type == "yearly" ? asset.yearlyStats : asset.monthlyStats

            // create the values array for the data object
            let values = []
            stats.forEach(stat => {
                if (type == "earnings") {
                    values.push(stat.earnings.toFixed(2))
                } else {
                    values.push(stat.streams)
                }
            })

            // chart data format for chart.js line chart - http://www.chartjs.org/docs/
            // add chart to data set
            datasets.push({
                label: asset.metadata.title,
                fillColor: this.colors[index % this.colors.length].transparent,
                strokeColor: this.colors[index % this.colors.length].opaque,
                pointColor: this.colors[index % this.colors.length].opaque,
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: values
            })
        })

        return datasets;
    }

    onRangeChange(e) {
        // if the state didn't change, ignore
        if (e.currentTarget.value === this.state.graphType) {
            return
        }

        this.setState({
            range: e.currentTarget.value
        });
    }


    onGraphTypeChange(e) {
        // if the state didn't change, ignore
        if (e.currentTarget.value === this.state.graphType) {
            return
        }

        this.setState({
            graphType: e.currentTarget.value
        })
    }

    onAssetItemsChange(e) {
        let ignoredItems = this.state.ignoredAssetItems

        // if the item went from checked => unchecked
        if (!e.target.checked) {
            // add it to the ignore list
            ignoredItems.push(parseInt(e.target.value))
        } else {
            // else remove it from the ignore list
            let index = ignoredItems.indexOf(parseInt(e.target.value))
            ignoredItems.splice(index, 1)
        }

        this.setState({
            ignoredAssetItems: ignoredItems
        })
    }

    getLabels(type) {
        if (type == "monthly") {
            return ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        } else {
            var years = []
            this.props.topAssets[0].yearlyStats.forEach((asset, index) => {
                years.push(asset.year)
            });
            // prevent having undefined in the tooltip
            if (years.length == 1) {
                years.push(years[0])
            }
            return years
        }
    }

    render() {
        // if we have top assets, we can render them
        if (this.props.topAssets) {

            // chart data
            var data = {
                labels: this.getLabels(this.state.range),
                datasets: this.getAssetData(this.state.graphType, this.state.range)
            }

            // chart options for chart.js line chart - http://www.chartjs.org/docs/
            let chartOptions = {
                scaleBeginAtZero : true,
                scaleShowGridLines : true,
                scaleGridLineColor : "rgba(0,0,0,.05)",
                scaleGridLineWidth : 1,
                scaleLabel: valuePayload => {
                    return Number.parseNumber(valuePayload.value, 0);
                }.bind(this),
                scaleShowHorizontalLines: true,
                scaleShowVerticalLines: true,
                barShowStroke : true,
                barStrokeWidth : 2,
                barValueSpacing : 5,
                barDatasetSpacing : 1,
                multiTooltipTemplate: "<%= datasetLabel %> : <%= value %>"
            }

            // create the list of assets we have
            let assetViews = []
            this.props.topAssets.forEach((asset, index) => {
                assetViews.push((
                    <li key={asset._id + index.toString()} className="asset-item">
                        <input checked={this.state.ignoredAssetItems.indexOf(index) === -1} type="checkbox" id={asset._id + index.toString()} name="asset-item" value={index} onChange={this.onAssetItemsChange.bind(this)} />
                        <label htmlFor={asset._id + index.toString()} className="asset-item-title">{asset.metadata.title}</label>
                    </li>
                ))
            })

            // determine state of the buttons determining if to show earnings or streams
            let streamsBtnClass = "btn"
            let earningsBtnClass = "btn"
            if (this.state.graphType === "streams") {
                streamsBtnClass += " selected"
            }
            if (this.state.graphType === "earnings") {
                earningsBtnClass += " selected"
            }

            // determine state of the buttons determining if to show yearly or monthly
            let yearBtnClass = "btn"
            let monthBtnClass = "btn"
            if (this.state.range === "yearly") {
                yearBtnClass += " selected"
            }
            if (this.state.range === "monthly") {
                monthBtnClass += " selected"
            }

            return (
              <div className="chart-view dashboard-child">
                <Line className="chart" data={data} options={chartOptions} redraw />
                <div className="graph-options">
                    <div className="btn-group graph-range-selector">
                        <button className={yearBtnClass} onClick={this.onRangeChange.bind(this)} name="graph-range" value="yearly">Yearly</button>
                        <button className={monthBtnClass} onClick={this.onRangeChange.bind(this)} name="graph-range" value="monthly">Monthly</button>
                    </div>
                    <div className="btn-group graph-type-selector">
                        <button className={streamsBtnClass} onClick={this.onGraphTypeChange.bind(this)} name="graph-type" value="streams">Streams</button>
                        <button className={earningsBtnClass} onClick={this.onGraphTypeChange.bind(this)} name="graph-type" value="earnings">Earnings</button>
                    </div>
                </div>
                <h3 className="sub-title">Top Assets</h3>
                <ul className="asset-items">
                    {assetViews}
                </ul>
              </div>
            )
        } else {
            // don't render unless we have data
            return false
        }
    }

}

export default ChartView
