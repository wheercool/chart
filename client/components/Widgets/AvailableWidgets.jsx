import React, { Component } from 'react';
import R from 'ramda'

class AvailableWidgets extends Component {
    constructor(props) {
        super(props);
        this.state = {
            opened: false,
        }
    }
    render() {
        const openState = this.state.opened? 'show': 'hidden';
        const {widgets, selectedWidget} = this.props;
        return (
            <div {...this.props}>
                <div className="dropdown">
                  <button onClick={this.changeMenu.bind(this, !this.state.opened)} className="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                    {selectedWidget || 'Empty'} <span className="caret"></span>
                  </button>
                  <ul className={"dropdown-menu " + openState}>
                    {
                        widgets.map(this.renderWidgetItem.bind(this))
                    }               
                  </ul>
                </div>
            </div>
        )
    }

    renderWidgetItem(item, idx) {
        return (<li key={idx} onClick={this.onCurrentWidgetChanged.bind(this, idx)}><a href="#">{item}</a></li>)
    }

    onCurrentWidgetChanged(id) {
        this.props.onWidgetSelect(this.props.widgets[id], id);
        this.setState({
            opened: false
        })
    }
    changeMenu(isOpened, e) {        
        this.setState({opened: isOpened})
    }
}

AvailableWidgets.propTypes = {
    selectedWidget: React.PropTypes.string,
    widgets: React.PropTypes.arrayOf(React.PropTypes.string),
    onWidgetSelect: React.PropTypes.func
}

AvailableWidgets.defaultProps = {
    selectedWidget: 'Empty',
    widgets: [],
    onWidgetSelect: R.identity
}
export default AvailableWidgets;