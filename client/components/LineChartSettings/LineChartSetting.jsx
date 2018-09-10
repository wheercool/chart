import React, { Component } from 'react';
import Channels from './Channels'
import ChannelsFilter from './ChannelsFilter'
import { Accordion, Panel} from 'react-bootstrap'
import ChannelSetting from './ChannelSetting'
import CloseButton from '../Buttons/CloseButton'

class LineChartSetting extends Component {
    constructor(props) {
      super(props);
    }
    render() {
        const {availableChannels, channels, onChannelAdd,
              filters, currentFilter, onFilterChange, onChannelChange} = this.props

        return (
            <div className="">
                <div className="col-sm-4">
                    <h4>Available Channels:</h4>
                    <ChannelsFilter currentFilter={currentFilter} filters={filters} onFilterChange={onFilterChange}/>
                    <Channels channels={availableChannels} title="" onChannelAdd={onChannelAdd}/>
                </div>
                <div className="col-sm-8">
                    <Accordion>
                      {channels.map((channel, key) =>
                          <Panel key={key} eventKey={key} header={this.panelHeader.bind(this)(channel, key)}>
                                <ChannelSetting onChange={this.onChannelChange.bind(this, key)} channel={channel}/>
                          </Panel>)}
                    </Accordion>
                </div>
            </div>
        )
    }
    onChannelChange(key, channel) {
      this.props.onChannelChange(channel, key);
    }
    panelHeader(channel, key) {
      return <div>{channel.name}<CloseButton onClick={this.onClick.bind(this, key)}/></div>;
    }
    onClick(key, e) {
      e.stopPropagation();
      this.props.onChannelRemove(key);
    }
}
LineChartSetting.propTypes = {
  availableChannels: React.PropTypes.arrayOf(React.PropTypes.shape({
    name: React.PropTypes.string
    // route: React.PropTypes.string
  })),
  channels:  React.PropTypes.arrayOf(React.PropTypes.shape({
    name: React.PropTypes.string,
    route: React.PropTypes.string
  })),

  filters: React.PropTypes.arrayOf(React.PropTypes.string),
  currentFilter: React.PropTypes.string,

  onChannelAdd: React.PropTypes.func,
  onChannelRemove: React.PropTypes.func,
  onFilterChange: React.PropTypes.func,
  onChannelChange: React.PropTypes.func
}

LineChartSetting.defaultProps = {
  title: 'Availabel Channels:',
  onChannelAdd: () => {},
  onChannelChange: () => {},
  onChannelRemove: () => {}
}


export default LineChartSetting
