import React, { Component } from 'react'
import R from 'ramda'

import DefaultWidget from './DefaultWidget'
import SizeMeter from './SizeMeter'
import Image from './Image'
import LineChart from './LineChart'

/*
	Мультикомпонент. Позволяет создавать зарегистрированные виджеты по их имени и id
*/


const registeredWidgetsMapping = {
	"Size meter": SizeMeter,
	"Empty": DefaultWidget,
	"Image": Image,
	"Line Chart": LineChart
}

export const registeredWidgets = R.keys(registeredWidgetsMapping)


export default class WidgetDispatcher extends Component {
	render() {

		const {widgetName, widgetId, width, height, isEditing} = this.props;
		const Widget = registeredWidgetsMapping[widgetName] || DefaultWidget
		return <Widget 	width={width}
					 	height={height}
					 	isEditing={isEditing}
					 	id={widgetId}/>
	}
}

WidgetDispatcher.propTypes = {
	 widgetName: React.PropTypes.string.isRequired,
	 widgetId: React.PropTypes.string.isRequired
};

 // WidgetDispatcher;
// export registeredWidgets;
