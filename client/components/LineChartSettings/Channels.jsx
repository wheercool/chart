import React, { Component } from 'react';

class Channels extends Component {
    constructor(props) {
      super(props);
      this.onChannelAdd = (channel) => props.onChannelAdd.bind(this, channel);
      this.renderListItem = this._renderListItem.bind(this)
    }
    render() {
        const {channels, title, onChannelAdd} = this.props;

        return (
            <div>
                <h4>{title}</h4>
                <ul className="list-group">
                    {channels.map(this.renderListItem)}
                </ul>
            </div>
        )
    }
    _renderListItem(channel, id) {
        return ( <li key={id} className="list-group-item">{channel.name}
                    <button className="btn btn-default pull-right" onClick={this.onChannelAdd(channel)}>
                        <span className="glyphicon glyphicon-arrow-right"></span>
                    </button>
                    <div className="clearfix" />
                </li>)
    }
}

Channels.propTypes = {
  channels: React.PropTypes.arrayOf(React.PropTypes.shape({
    name: React.PropTypes.string,
    route: React.PropTypes.string
  })),
  title: React.PropTypes.string,
  onChannelAdd: React.PropTypes.func
}

Channels.defaultProps = {
  title: 'Availabel Channels:',
  onChannelAdd: () => {}
}

export default Channels
