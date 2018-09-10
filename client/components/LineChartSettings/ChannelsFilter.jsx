import React, { Component } from 'react';
import {DropdownButton, MenuItem} from 'react-bootstrap'

class Channels extends Component {
    constructor(props) {
      super(props);
      this.renderListItem = this._renderListItem.bind(this)
    }
    render() {
        const {currentFilter, filters, onFilterChange} = this.props;

        return (
                <DropdownButton title={currentFilter} onSelect={onFilterChange}>
                    {filters.map(this.renderListItem)}
                </DropdownButton>
        )
    }
    _renderListItem(filter, id) {
        return (<MenuItem eventKey={id}>{filter}</MenuItem>)
    }
}

Channels.propTypes = {
  currentFilter: React.PropTypes.string,
  filters: React.PropTypes.arrayOf(React.PropTypes.string),
  onFilterChange: React.PropTypes.func
}

Channels.defaultProps = {
  title: 'Filter:',
  onFilterChange: () => {}
}

export default Channels
