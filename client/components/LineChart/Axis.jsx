import React, { Component } from 'react';
import '../../styles/axis.css'

class Axis extends Component {
    render() {
        const {color, name, measure, minValue, maxValue} = this.props.channel;
        return (
            <div className="axis">
                <div className="axis-value axis-min-value">
                    <input type="text" defaultValue={minValue} />
                </div>
                <div className="axis-name">
                    {name}
                    <div className="axis-line" style={{borderColor: color}}></div>
                    {measure}
                </div>
                <div className="axis-value axis-max-value">
                    <input type="text" defaultValue={maxValue} />
                </div>
            </div>);
    }
}

export default Axis;
