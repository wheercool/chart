'use strict';

// import 'styles/main.scss';

import React from 'react';
import { render } from 'react-dom';

import {Provider} from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger'

import {createStore, applyMiddleware} from 'redux';

import {dashboardReducer} from 'reducers/dashboard'

// import Index from 'components/Index/Index';
import DashboardManager from 'components/DashboardManager/DashboardManager';

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
// import '../node_modules/react-grid-layout/node_modules/react-resizable/css/styles.css';
import 'styles/styles.css';
	
const loggerMiddleware = createLogger()

const store = createStore(dashboardReducer,
	applyMiddleware(thunkMiddleware, loggerMiddleware));

store.subscribe((msg) =>  console.log(store.getState()));

render(<Provider store={store}>
			<DashboardManager/>
		</Provider>, document.getElementById('js-main'));
