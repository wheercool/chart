import '../../styles/line-chart-axes.css'

import React, { Component } from 'react';
import Axis from './Axis'

class LineChartAxes  extends Component {
    render() {
        const {groups } = this.props;
        let groupsCount = groups.length;
        return (
            <div className="line-chart-axes">
                {groups.map(this.renderGroupAxes.bind(this))}                
            </div>
        )
    }
    renderGroupAxes(group, id) {
        
        return (<div className="group-axes" key={id}>
                {group.channels.map(this.renderAxis.bind(this))}
            </div>)
    }
    renderAxis(channel, id) {
        return (<Axis key={id} channel={channel} />)
    }
}

export default LineChartAxes;