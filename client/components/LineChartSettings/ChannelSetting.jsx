import React, { Component} from 'react';
import ReactDOM from 'react-dom';

import {FormGroup, ControlLabel, FormControl, Button} from 'react-bootstrap'

const getValue = (element) => ReactDOM.findDOMNode(element).value

class ChannelSetting extends Component {
  constructor(props) {
    super(props)
    this.onChange = this._onChange.bind(this)
  }
  render() {
    const {channel: {name, minValue, maxValue, color}} = this.props;
      return (
        <div className="col-sm-12">
    <FormGroup bsSize="sm">

        <ControlLabel>Scale Min:</ControlLabel>
        <FormControl
            type="text"
            ref={(v)=>this.minValue = v}
            value={minValue}
            onChange={this.onChange}
            placeholder="Enter text"
          />

          <ControlLabel>Scale Max:</ControlLabel>
        <FormControl
            type="text"
            ref={(v)=>this.maxValue = v}
            value={maxValue}
            onChange={this.onChange}
            placeholder="Enter text"
          />

          <ControlLabel>Color:</ControlLabel>
          <FormControl
              type="text"
              ref={(v)=>this.color = v}
              value={color}
              onChange={this.onChange}
              placeholder="Enter text"
            />
      </FormGroup>
      </div>
    )
  }
  _onChange(e) {
    const {onChange} = this.props;
    const element = ReactDOM.findDOMNode(this)

    onChange({
      minValue: getValue(this.minValue),
      maxValue: getValue(this.maxValue),
      color: getValue(this.color)
    });
  }
}

export default ChannelSetting
