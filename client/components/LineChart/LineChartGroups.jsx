import '../../styles/line-chart-groups.css'

import React, { Component } from 'react';
import LineChart from './LineChart'

class LineChartGroups extends Component {
    render() {
        const {groups } = this.props;
        let groupsCount = groups.length;
        return (
            <div className="line-chart-group">
                {groups.map(this.renderGroupChart)}
            </div>
        )
    }
    renderGroupChart(group, id) {
        var data = group.data || [[0, 1], [1, 3]]
        return (<LineChart key={id} data={data} channels={group.channels}/>)
    }
}

export default LineChartGroups;
