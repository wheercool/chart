import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import '../../styles/scroller.css'
import {trace, log}  from '../../utils'

class Scroller extends Component {
    constructor(props) {
      super(props);
      this.state = {
        fireEvent: true
      }
    }
    render() {

        const {width, height, orientation, factor} = this.props;
        let innerStyle;
        if (orientation == 'horizontal') {
            innerStyle = {
                width: Math.max(factor * width, width)
            }
        } else {
            innerStyle = {
                height: Math.max(factor * height, height)
            }
        }
        return (
            <div className="outer-scroll-wrapper" scrollLeft={100}>
                <div className="inner-scroll-wrapper" style={innerStyle}>&nbsp;</div>
            </div>);
    }
    fireEvent: true
    componentDidMount() {
        var element = ReactDOM.findDOMNode(this)

        const {offset, orientation} = this.props;

        this.silence = true;

        if (orientation == 'horizontal')
          element.scrollLeft = offset;
        else element.scrollTop = offset;

        this.silence = false;

        // this.handleScroll = this._handleScroll.bind(this);
        this.handleScroll = $.throttle(100, this._handleScroll.bind(this));
        // this.handleScroll = $.debounce(1000, this._handleScroll.bind(this));
        window.addEventListener('scroll', this.handleScroll, true);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll, true);
    }
    componentDidUpdate() {
      const element = ReactDOM.findDOMNode(this)
      const {offset, orientation} = this.props;

      this.silence = true;
      if (orientation == 'horizontal')
        element.scrollLeft = offset;
      else element.scrollTop = offset;
      this.silence = false;
    }
    _handleScroll(e) {
        let target = e.srcElement;
        const {factor, width, offset} = this.props;

        if (ReactDOM.findDOMNode(this) == target) {
            let innerOffset = $(target.children[0]).offset(),
                outerOffset = $(target).offset();
            var offsetValue = {
                left: outerOffset.left - innerOffset.left,
                top: outerOffset.top - innerOffset.top
            };
            if (this.props.onScroll && !this.silence) {

              if (this.props.orientation == 'horizontal') {
                var value = offsetValue.left,
                    max = Math.max(factor * width, width),
                    percent = value / max,
                    oldPercent = offset / max;

                this.props.onScroll(offset, offsetValue.left)
              } else {
                this.props.onScroll(offsetValue.top, )
              }
            }
        }
    }

}
Scroller.propTypes = {
  factor: React.PropTypes.number, //коэфициент масштабирования
  width: React.PropTypes.number,
  height: React.PropTypes.number,
  offset: React.PropTypes.number,
  orientation: React.PropTypes.oneOf(['horizontal', 'vertical']),
  onScroll: React.PropTypes.func,
}

Scroller.defaultProps = {
  orientation: 'horizontal',
  onScroll: () => {}
}
export default Scroller;
