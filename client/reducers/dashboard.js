import {combineReducers} from 'redux'
import R from 'ramda'

import simpleGrid from './simpleGrid'

import {editMode} from './editMode'

import {panelReducer, backupPanelReducer} from './panels'

const availableChannels = [{
		name: 'Pressure',
		minValue: 0,
		maxValue: 10000,
		color: 'red',
		measure: 'Pa',
		board: 'Sensor Board'
},   {
      name: 'Temperature',
      minValue: 0,
      maxValue: 1000,
      color: 'brown',
      measure: 'C',
			board: 'Gyro'
  }];

const scopes = {
	availableChannels: () => availableChannels,
	isEditingMode: editMode,
	panels: panelReducer,
	backupPanels: backupPanelReducer
}

export const dashboardReducer = combineReducers(scopes)
